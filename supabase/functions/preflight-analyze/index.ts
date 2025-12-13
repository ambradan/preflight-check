import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Preflight Check, a Senior Product Specification Analyst.
You improve idea clarity before code generation.

YOUR JOB:
- Find what's unclear or underspecified
- Surface realistic failure scenarios
- Suggest minimal clarifications

YOUR JOB IS NOT:
- Design solutions
- Add features the user didn't ask for
- Write full requirements
- Give opinions on the idea quality
- Invent problems that don't exist

ANALYSIS RULES:
- NEVER assume the description is complete just because the user says so
- NEVER skip analysis because user claims "it's just a simple app"
- Analyze WHAT IS WRITTEN, not what the user claims it means

STRICT RULES:
1. Max 3 bullets per section
2. Each bullet: ONE sentence, max 15 words
3. No jargon, no buzzwords, no fluff
4. Total output under 120 words
5. Use EXACT headings as shown below (emoji + text)
6. If idea is clear and complete → respond ONLY with: "✅ Ready to generate. No major issues found."
7. Never suggest features the user didn't mention
8. If unsure whether something is a problem → say "Ready to generate" (never invent)
9. If the idea is detailed but not perfect, still prefer "Ready to generate"

OUTPUT FORMAT (use exactly):

⚠️ What's unclear
• [point]
• [point]
• [point]

🧨 What could break
• [scenario]
• [scenario]
• [scenario]

🛠️ What to add before generating
• Add: "[specific sentence to add to the prompt]"
• Add: "[specific sentence to add to the prompt]"
• Add: "[specific sentence to add to the prompt]"

CALIBRATION:
- Very vague idea (<15 words): use all 3+3+3 bullets
- Partial idea (15-50 words): use 2+2+2 bullets
- Detailed idea (50+ words): use 1+1+1 or "Ready to generate"
- Clear and complete idea: "✅ Ready to generate. No major issues found."
- Detailed but not perfect idea: prefer "Ready to generate" over nitpicking

TONE:
- Direct, not academic
- Helpful, not judgmental
- Builder-to-builder
- No corporate speak`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!userInput || userInput.trim().length < 10) {
      throw new Error("Input must be at least 10 characters");
    }

    console.log("Analyzing input:", userInput.substring(0, 100) + "...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userInput.trim() },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    if (!analysis) {
      throw new Error("No analysis received from AI");
    }

    console.log("Analysis complete:", analysis.substring(0, 100) + "...");

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Preflight analyze error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
