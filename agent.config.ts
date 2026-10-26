import { defineAgent } from "@voice-agent/sdk";

// Your voice agent. `voiceagent deploy` builds it into a deployment; a push does the same in CI.
export default defineAgent({
  name: "Starter",
  params: {
    persona: { name: "Ava", stance: "warm and to the point" },
    instructions: "You answer questions about our product from what you know. Keep every reply short: this is a phone call. When the user asks to be called back, take their name and number and use request_callback.",
    open: true,
    guardrails: { refusal: "I can't help with that, but I'm happy to help with anything about our product." },
    style: { length: "brief" },
    tools: { names: ["end_conversation", "search_knowledge"] },
  },
  // Every document in ./knowledge (.md, .txt) is what it knows.
  knowledge: "knowledge",
  // Production's calls, judged against what should be true of every one (a "score" record each).
  scoring: { criteria: ["The agent answers from what it knows and never makes up a fact."], sample: 1 },
  // Where its events go is per environment, not here:
  //   voiceagent vars set WEBHOOK_URL https://staging.your.app/voice-events
  //   openssl rand -hex 32 | voiceagent vars set WEBHOOK_SECRET
  // and the same with --env production (a live key) for your production server.
});
