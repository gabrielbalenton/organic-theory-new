/**
 * One-time local setup: exchanges your downloaded Google OAuth "Desktop app"
 * client for a Gmail refresh token and saves everything needed for automated
 * sending straight to .env. Run once, never commit .env, never paste its
 * contents anywhere.
 *
 * Usage: npx tsx scripts/gmail-oauth-setup.ts /path/to/client_secret_....json
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import { resolve } from 'path';

const SCOPE = 'https://www.googleapis.com/auth/gmail.send';

async function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath) {
    console.error('Usage: npx tsx scripts/gmail-oauth-setup.ts /path/to/client_secret_....json');
    process.exit(1);
  }

  const raw = JSON.parse(readFileSync(resolve(jsonPath), 'utf8'));
  const creds = raw.installed ?? raw.web;
  if (!creds) throw new Error('Could not find "installed" or "web" credentials in that JSON file.');
  const { client_id, client_secret } = creds;

  const server = createServer();
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  const port = (server.address() as { port: number }).port;
  const redirectUri = `http://127.0.0.1:${port}`;

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', client_id);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPE);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  console.log('\nOpen this URL in your browser and sign in with the Gmail account you want to send from:\n');
  console.log(authUrl.toString());
  console.log('\nWaiting for you to approve access...\n');

  const code = await new Promise<string>((resolveCode, reject) => {
    server.on('request', (req, res) => {
      const url = new URL(req.url ?? '/', redirectUri);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      if (error) {
        res.end('Authorization failed — you can close this tab. Check your terminal.');
        reject(new Error(error));
        return;
      }
      if (code) {
        res.end('Success — you can close this tab and go back to your terminal.');
        resolveCode(code);
      }
    });
  });

  server.close();

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id,
      client_secret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    console.error('Token exchange failed:', tokenRes.status, await tokenRes.text());
    process.exit(1);
  }

  const tokens = await tokenRes.json();
  if (!tokens.refresh_token) {
    console.error(
      "No refresh_token came back. This usually means you've authorized this app before. " +
      'Go to https://myaccount.google.com/permissions, remove access for this app, and re-run this script.'
    );
    process.exit(1);
  }

  const envPath = resolve(process.cwd(), '.env');
  const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';

  // Strip any prior Gmail keys so re-running this script doesn't duplicate them.
  const withoutGmailKeys = existing
    .split('\n')
    .filter((l) => !/^GMAIL_(CLIENT_ID|CLIENT_SECRET|REFRESH_TOKEN)=/.test(l))
    .join('\n')
    .trimEnd();

  const finalContent = [
    withoutGmailKeys,
    `GMAIL_CLIENT_ID=${client_id}`,
    `GMAIL_CLIENT_SECRET=${client_secret}`,
    `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`,
  ].filter(Boolean).join('\n') + '\n';

  writeFileSync(envPath, finalContent);

  console.log('Saved GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN to .env.');
  console.log('Done. This terminal never printed the actual secret values.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
