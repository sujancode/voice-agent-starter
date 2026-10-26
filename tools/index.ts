import { defineTools } from "@voice-agent/sdk";

// What the agent can do during a call: your own code, run by the platform in an isolate of its own.
// `env` is the environment's variables (`voiceagent vars set NAME value`): test's in test, production's in production.
export default defineTools({
  opening_hours: {
    description: "Today's opening hours. Call it when the user asks when we are open.",
    run: (_args, { env }) => `We are open ${env.OPENING_HOURS ?? "9am to 5pm"} today.`,
  },
  request_callback: {
    description: "Ask for someone to call the user back. Call it once you have their name and phone number.",
    args: { name: "Their name.", phone: "Their phone number." },
    // screens/callback.html is on their display while this runs, then shows what it returns as `show`.
    screen: "callback",
    async run({ name, phone }) {
      // Put it in your own system here (a fetch to your API, with a key from env).
      const ref = `CB-${Date.now().toString(36).slice(-5).toUpperCase()}`;
      return { result: `A call back is booked for ${name} on ${phone}, reference ${ref}.`, show: { ref } };
    },
  },
});
