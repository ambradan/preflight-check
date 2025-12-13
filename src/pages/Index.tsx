import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, RotateCcw } from "lucide-react";

const PRESETS = [
  {
    label: "Document chat",
    content: "An app where users can upload documents and chat with them",
  },
  {
    label: "Task manager",
    content: "App for managing tasks",
  },
  {
    label: "BMI calculator",
    content:
      "A BMI calculator. Two fields: weight (kg), height (cm). One button: Calculate. Shows result with category (underweight/normal/overweight/obese). Color-coded result. No login. No data saved. Mobile responsive.",
  },
];

const MAX_CHARS = 2000;
const MIN_CHARS = 10;
const COOLDOWN_SECONDS = 4;
const TIMEOUT_MS = 15000;

interface ParsedSection {
  emoji: string;
  title: string;
  items: string[];
}

function parseAnalysis(raw: string): { sections: ParsedSection[]; isReady: boolean } {
  const trimmed = raw.trim();
  
  if (trimmed.includes("✅ Ready to generate")) {
    return { sections: [], isReady: true };
  }

  const sections: ParsedSection[] = [];
  const sectionPatterns = [
    { emoji: "⚠️", title: "What's unclear" },
    { emoji: "🧨", title: "What could break" },
    { emoji: "🛠️", title: "What to add before generating" },
  ];

  for (const pattern of sectionPatterns) {
    const regex = new RegExp(`${pattern.emoji}\\s*${pattern.title}[\\s\\S]*?(?=(?:⚠️|🧨|🛠️)|$)`, "i");
    const match = raw.match(regex);
    
    if (match) {
      const sectionText = match[0];
      const items = sectionText
        .split("\n")
        .filter((line) => line.trim().startsWith("•"))
        .map((line) => line.replace(/^•\s*/, "").trim())
        .filter((item) => item.length > 0)
        .slice(0, 3);
      
      if (items.length > 0) {
        sections.push({ emoji: pattern.emoji, title: pattern.title, items });
      }
    }
  }

  return { sections, isReady: false };
}

function extractAddSentences(raw: string): string[] {
  const lines = raw.split("\n");
  const addLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim().replace(/^•\s*/, "");
    if (trimmed.startsWith("Add:")) {
      const sentence = trimmed
        .replace(/^Add:\s*/, "")
        .replace(/^["']|["']$/g, "")
        .trim();
      if (sentence) {
        addLines.push(sentence);
      }
    }
  }
  
  return addLines;
}

export default function Index() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleReset();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (canRun) {
          handleRun();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, cooldown, isLoading]);

  const trimmedInput = input.trim();
  const charCount = trimmedInput.length;
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS;
  const canRun = isValidLength && !isLoading && cooldown === 0;

  const handlePreset = (content: string) => {
    setInput(content);
    setAnalysis(null);
  };

  const handleRun = useCallback(async () => {
    if (!canRun) return;

    setIsLoading(true);
    setAnalysis(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const { data, error } = await supabase.functions.invoke("preflight-analyze", {
        body: { userInput: trimmedInput },
      });

      clearTimeout(timeoutId);

      if (error) {
        throw new Error(error.message || "Analysis failed");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
    } catch (err) {
      console.error("Preflight error:", err);
      toast({
        title: "Preflight couldn't run this time",
        description: "Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCooldown(COOLDOWN_SECONDS);
    }
  }, [canRun, trimmedInput, toast]);

  const handleReset = () => {
    setInput("");
    setAnalysis(null);
  };

  const handleCopyRefined = () => {
    if (!analysis) return;

    const addSentences = extractAddSentences(analysis);
    const refined = addSentences.length > 0
      ? `${trimmedInput}\n\n${addSentences.join("\n")}`
      : trimmedInput;

    navigator.clipboard.writeText(refined);
    toast({
      title: "Copied to clipboard",
      description: "Refined prompt copied successfully.",
    });
  };

  const parsed = analysis ? parseAnalysis(analysis) : null;
  const addSentences = analysis ? extractAddSentences(analysis) : [];
  const refinedPrompt = addSentences.length > 0
    ? `${trimmedInput}\n\n${addSentences.join("\n")}`
    : trimmedInput;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4">
      <div className="max-w-[640px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <span>✈️</span>
            <span>Preflight Check</span>
          </h1>
          <p className="text-muted-foreground mt-1">Catch issues before generating</p>
        </div>

        {/* Main Card */}
        <div className="bg-background rounded-xl shadow-sm border p-6">
          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset.content)}
                className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors text-foreground"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to build..."
              className="min-h-[120px] resize-none"
              maxLength={MAX_CHARS}
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span className={charCount > MAX_CHARS ? "text-destructive" : ""}>
                {charCount} / {MAX_CHARS}
              </span>
              {charCount > 0 && charCount < MIN_CHARS && (
                <span className="text-destructive">Min {MIN_CHARS} characters</span>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="mt-4">
            <Button
              onClick={handleRun}
              disabled={!canRun}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : cooldown > 0 ? (
                `Wait ${cooldown}s...`
              ) : (
                "Run Preflight"
              )}
            </Button>
          </div>

          {/* Output */}
          {analysis && parsed && (
            <div className="mt-6 space-y-4">
              {parsed.isReady ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✅ Ready to generate. No major issues found.
                  </p>
                </div>
              ) : (
                <>
                  {parsed.sections.map((section) => (
                    <div
                      key={section.title}
                      className="p-4 bg-muted/50 rounded-lg border"
                    >
                      <h3 className="font-medium text-foreground mb-2">
                        {section.emoji} {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Before/After Preview */}
                  {addSentences.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-muted/30 rounded-lg border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Before
                        </h4>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {trimmedInput}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="text-sm font-medium text-green-700 mb-2">
                          After
                        </h4>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {refinedPrompt}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                {addSentences.length > 0 && (
                  <Button
                    onClick={handleCopyRefined}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy refined prompt
                  </Button>
                )}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className={addSentences.length > 0 ? "" : "flex-1"}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Check Another
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Clearer input → better output
        </p>
      </div>
    </div>
  );
}
