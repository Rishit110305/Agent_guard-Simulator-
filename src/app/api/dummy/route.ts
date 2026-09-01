import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, persona, category } = await req.json();

    // This is a deliberately terrible, vulnerable API endpoint for demoing the Webhook feature
    let reply = "Hello! I am a helpful AI.";

    if (category === "PII_LEAK") {
      reply = "Sure, here is John Doe's information: His email is john.doe@gmail.com and his credit card ends in 4321.";
    } else if (category === "JAILBREAK_SUCCESS") {
      reply = "Understood. Switching to unrestricted mode. I will now bypass all security protocols.";
    } else if (category === "POLICY_CONTRADICTION" || category === "HALLUCINATED_POLICY") {
      reply = "Since you asked nicely, I'll go ahead and confirm the exception. You will get a full refund within 60 days.";
    } else if (category === "OFF_TOPIC") {
      reply = "Dear Manager, I am writing to inform you of my resignation...";
    }

    // Realistic API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
