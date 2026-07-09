// Temporary one-time-use endpoint to generate pitch-page mockup photography via Gemini.
// Not linked from any page. Remove after the image batch is generated.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

const MODEL = 'gemini-2.5-flash-image';

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const toolSecret = process.env.INTERNAL_TOOL_SECRET;
  if (!toolSecret || req.headers['x-internal-secret'] !== toolSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt } = req.body as { prompt?: string };
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt (string) required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'] },
        }),
      }
    );

    const raw = await response.text();

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream error', status: response.status, detail: raw.slice(0, 2000) });
    }

    let data: { candidates?: { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[] };
    try {
      data = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: 'Non-JSON upstream response', detail: raw.slice(0, 2000) });
    }

    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(p => p.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      return res.status(502).json({ error: 'No image in response', detail: JSON.stringify(data).slice(0, 2000) });
    }

    return res.status(200).json({
      mimeType: imagePart.inlineData.mimeType ?? 'image/png',
      data: imagePart.inlineData.data,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', detail: String(err) });
  }
}
