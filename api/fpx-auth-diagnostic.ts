type Req = any; type Res = any;

function snippets(text: string, needle: string, radius = 260) {
  const out: string[] = [];
  const lower = text.toLowerCase();
  const target = needle.toLowerCase();
  let at = 0;
  while (out.length < 12) {
    const i = lower.indexOf(target, at);
    if (i < 0) break;
    out.push(text.slice(Math.max(0, i - radius), Math.min(text.length, i + target.length + radius)));
    at = i + target.length;
  }
  return out;
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const home = await fetch('https://app.fpx.nz/', { redirect: 'follow' });
    const html = await home.text();
    const rendererUrl = html.match(/<script[^>]+src=["']([^"']*softr-page-renderer[^"']+)["']/i)?.[1];
    let js = '';
    if (rendererUrl) js = await (await fetch(rendererUrl)).text();
    const urlMatches = [...new Set([
      ...html.matchAll(/https?:\\?\/\\?\/[^"'<>\\\s]+/g),
      ...js.matchAll(/https?:\\?\/\\?\/[^"'<>\\\s]+/g),
    ].map(m => m[0].replace(/\\\//g, '/')).filter(u => /softr|auth|api/i.test(u)).slice(0, 120))];
    res.status(200).json({
      pageStatus: home.status,
      finalUrl: home.url,
      rendererUrl,
      rendererBytes: js.length,
      urls: urlMatches,
      authSnippets: snippets(js, 'auth'),
      passwordSnippets: snippets(js, 'password'),
      signInSnippets: snippets(js, 'sign-in'),
      loginSnippets: snippets(js, 'login'),
      fetchSnippets: snippets(js, 'fetch('),
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}
