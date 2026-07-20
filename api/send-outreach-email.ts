// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

interface GoogleLead {
  business_name: string;
  contact_email?: string;
  funnel_html: string;
  email_subject: string;
  email_body: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Widened 2026-07-20 from 2 days to 30 to clear a backlog that piled up
// while Gmail auth was broken (2026-07-15 to 2026-07-20). Still bounds the
// replay window for this deliberately-unauthenticated endpoint — authorization
// instead comes from requiring the lead to already exist in the live public
// JSON, which only happens after a successful git push to this repo.
const MAX_LOOKBACK_DAYS = 30;

function isRecentDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const now = new Date();
  const cutoff = new Date(now.getTime() - MAX_LOOKBACK_DAYS * 86400000).toISOString().slice(0, 10);
  const today = now.toISOString().slice(0, 10);
  return date >= cutoff && date <= today;
}

function buildRawMessage(to: string, subject: string, body: string): string {
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
  ].join('\r\n');
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, funnel_html } = req.body as { date?: string; funnel_html?: string };

  if (!date || !funnel_html) {
    return res.status(400).json({ error: 'date and funnel_html are required' });
  }
  if (!isRecentDate(date)) {
    return res.status(400).json({ error: 'date must be today or yesterday (UTC)' });
  }

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: 'Gmail credentials not configured' });
  }

  try {
    // Re-fetch our own already-deployed public lead data rather than trusting
    // any content in the request body — the caller can only ever trigger a
    // send for a lead that already exists in this repo's public JSON.
    const dataRes = await fetch(`https://organic-theory.vercel.app/leads/${date}.json`);
    if (!dataRes.ok) {
      return res.status(404).json({ error: `No lead file found for ${date}` });
    }
    const dayLog = await dataRes.json() as { leads: GoogleLead[] };
    const lead = dayLog.leads?.find((l) => l.funnel_html === funnel_html);
    if (!lead) {
      return res.status(404).json({ error: 'No matching lead found for that date/funnel_html' });
    }
    if (!lead.contact_email || !isValidEmail(lead.contact_email)) {
      return res.status(400).json({ error: 'Lead has no valid contact_email on file' });
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    if (!tokenRes.ok) {
      console.error('Gmail token refresh failed:', await tokenRes.text());
      return res.status(502).json({ error: 'Gmail authentication failed' });
    }
    const { access_token } = await tokenRes.json() as { access_token: string };

    const raw = buildRawMessage(lead.contact_email, lead.email_subject, lead.email_body);
    const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!sendRes.ok) {
      const err = await sendRes.text();
      console.error('Gmail send failed:', err);
      return res.status(502).json({ error: 'Gmail send failed' });
    }

    const result = await sendRes.json() as { id?: string };
    return res.status(200).json({ ok: true, business_name: lead.business_name, message_id: result.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
