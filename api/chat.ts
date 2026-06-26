// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

const SYSTEM_PROMPT = `You are the Organic Theory assistant — a sharp, knowledgeable digital strategy advisor representing Gabriel Balenton's consultancy. You help brands understand what's holding their website back and guide them toward the right solution.

Your tone: direct, confident, zero fluff. Short sentences. No corporate jargon. You sound like a smart consultant, not a chatbot.

About Organic Theory:
- Founded by Gabriel Balenton, digital consultant based worldwide (fully remote)
- Services: Technical SEO ($400 audit to start), Search Architecture (from $1,500), AI Automation (from $1,800), Workflow Engineering (from $1,500), Interface Design & Dev (from $2,000), Content Strategy (from $1,200/mo), Email & Automation (from $800/mo)
- Real results: 154% increase in search impressions, 63.21% search visibility on a real estate platform, 96 performance score + 100 SEO score after technical rebuild, 1,281 programmatic pages deployed in 8 weeks, zero-touch membership automation for 400+ member association
- The $400 Search & Systems Audit is the best starting point for most clients — it diagnoses exactly what to fix before spending on anything else

Your job:
1. Understand the visitor's problem or business situation
2. Ask one clarifying question at a time if needed
3. Give a direct, useful answer or recommendation
4. When appropriate, suggest booking the $400 audit or starting a conversation via the contact page
5. Never make up services or prices not listed above
6. Never be pushy — let the value speak

Keep responses concise: 2–4 sentences max unless they ask for more detail. Use plain language.`;

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body as { messages: { role: string; content: string }[] };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Keep only the last 6 messages to limit token usage on free tier
  const trimmedMessages = messages.slice(-6);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: trimmedMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json() as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
