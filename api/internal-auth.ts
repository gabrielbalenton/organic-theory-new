import { clearSessionCookie, createSessionCookie, isInternalAuthorized, verifyPin } from '../server/internal-session.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    return res.status(200).json({ authenticated: isInternalAuthorized(req) });
  }

  if (req.method === 'POST') {
    if (!verifyPin(req.body?.pin)) {
      return res.status(401).json({ ok: false, error: 'Invalid PIN' });
    }

    res.setHeader('Set-Cookie', createSessionCookie());
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
