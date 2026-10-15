import crypto from 'node:crypto';

const COOKIE_NAME = 'ot_internal_session';
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  const value = process.env.INTERNAL_SESSION_SECRET;
  if (!value) throw new Error('INTERNAL_SESSION_SECRET is not configured');
  return value;
}

function sign(expiresAt: string) {
  return crypto.createHmac('sha256', secret()).update(expiresAt).digest('hex');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function verifyPin(pin: unknown) {
  const expected = process.env.INTERNAL_DASHBOARD_PIN || '';
  const received = typeof pin === 'string' ? pin.trim() : '';
  return Boolean(expected && received && safeEqual(received, expected));
}

export function createSessionCookie() {
  const expiresAt = String(Date.now() + SESSION_MS);
  const token = `${expiresAt}.${sign(expiresAt)}`;
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${Math.floor(SESSION_MS / 1000)}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export function isInternalAuthorized(req: any) {
  try {
    const rawCookie = String(req?.headers?.cookie || '');
    const cookie = rawCookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${COOKIE_NAME}=`));
    if (!cookie) return false;

    const value = cookie.slice(COOKIE_NAME.length + 1);
    const [expiresAt, signature] = value.split('.');
    if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) return false;

    return safeEqual(signature, sign(expiresAt));
  } catch {
    return false;
  }
}
