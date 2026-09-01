import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. 'messages' array is required." },
        { status: 400 }
      );
    }
    
    // Fallback Mock Mode if no API key is provided
    if (!apiKey || apiKey === "") {
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      let reply = "Hello! I am the AgentGuard AI Assistant. How can I help you certify your AI agents today?";
      
      if (lastMessage.includes("demo") || lastMessage.includes("run")) {
        reply = "To run a demo, navigate to the **Agents** page in the sidebar and click **Run Demo**. This will unleash 1,000 synthetic adversarial users against the agent in real-time!";
      } else if (lastMessage.includes("cost") || lastMessage.includes("price") || lastMessage.includes("roi")) {
        reply = "AgentGuard costs just **$0.50 per simulation run** and yields a massive 120x ROI compared to a $60,000 production failure. You can view our detailed unit economics on the **Finance Dashboard**.";
      } else if (lastMessage.includes("how") || lastMessage.includes("learning loop") || lastMessage.includes("patch")) {
        reply = "Our **Module 06 Learning Loop** is fully autonomous! When failures cluster around a root cause, AgentGuard rewrites the agent's system prompt to create a defense patch. This patch persists as a new secure baseline (e.g., v1 → v2), and failed cases are instantly re-run to verify the fix.";
      } else if (lastMessage.includes("what is agentguard")) {
        reply = "AgentGuard is the Ultimate Agent Flight Simulator & AI Control Center. We help prevent AI agents from failing in production by testing them against synthetic adversarial users, finding weaknesses, and automatically patching them before real users encounter those failures.";
      } else if (messages.length > 1) {
        reply = "(Mock Mode): I understand. To get dynamic AI responses, please add your `GROQ_API_KEY` to the server environment variables. In the meantime, I'm happy to answer questions about the demo, pricing, or how the Learning Loop works!";
      }

      // Add slight delay to simulate network
      await new Promise(r => setTimeout(r, 600));
      return NextResponse.json({ reply });
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = `You are the official AI Assistant for AgentGuard.
ROLE & PERSONA
You represent AgentGuard, an AI-agent testing and certification platform.
Your tone is professional, technical, confident, concise, and slightly futuristic.
Use clean structured formatting. Do not use messy or excessive emojis.

PRODUCT
Name: AgentGuard
Tagline: The Ultimate Agent Flight Simulator & AI Control Center.
Mission: AgentGuard helps prevent AI agents from failing in production by testing them against synthetic adversarial users, finding weaknesses, and automatically patching agent instructions before real users encounter those failures.

FAQ
Q: Do I need to connect a database or bring my own API key to test the demo?
A: No. The Live Demo runs out of the box using a deterministic mock agent and an in-memory data store.

Q: How does auto-patching / the Learning Loop work?
A: When multiple synthetic personas fail due to the same root cause, the evaluator identifies the failure category. AgentGuard generates a defense patch, upgrades the agent to a new baseline version such as v2, and re-runs the failed cases to verify that the vulnerability is closed.

CHATBOT GUARDRAILS
1. Never claim that AgentGuard has a feature unless it is described here.
2. If asked to run the demo, tell the user to click the "Run Demo" button on the /dashboard/agents page.
3. Keep answers concise, punchy, technical, and accessible.
`;

    const formattedMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.1-8b-instant", // valid groq model
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    return NextResponse.json({ reply });
    
  } catch (error: any) {
    console.error("Chat API error details:", error?.response?.data || error);
    const safeMessage = "Sorry, I couldn't connect to the AI assistant. Please try again.";
    return NextResponse.json({ error: safeMessage }, { status: error?.status || 500 });
  }
}
