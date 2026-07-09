/**
 * Lead collector — OnlineJobs.ph public job search.
 *
 * Reads public /jobseekers/jobsearch results for a set of keywords, follows each
 * job's public detail page for the full description, then filters down to the
 * best matches for Organic Theory's services. No login, no account automation —
 * every URL hit here is reachable by an anonymous visitor.
 *
 * Usage: npx tsx scripts/collect-leads.ts
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const FROM_RAW = process.argv.includes('--from-raw');

const DELAY_MS = 5000;
const PER_KEYWORD_CAP = 12;
const FINAL_COUNT = 15;
const USER_AGENT = 'Mozilla/5.0 (compatible; OrganicTheoryLeadCollector/1.0; +https://organic-theory.vercel.app)';

const KEYWORDS: { keyword: string; url: string }[] = [
  { keyword: 'seo', url: 'https://www.onlinejobs.ph/jobseekers/jobsearch?jobkeyword=seo' },
  { keyword: 'wordpress', url: 'https://www.onlinejobs.ph/jobseekers/jobsearch?jobkeyword=wordpress' },
  { keyword: 'web design', url: 'https://www.onlinejobs.ph/jobseekers/jobsearch?jobkeyword=web+design' },
  { keyword: 'email marketing', url: 'https://www.onlinejobs.ph/jobseekers/jobsearch?jobkeyword=email+marketing' },
  { keyword: 'automation', url: 'https://www.onlinejobs.ph/jobseekers/jobsearch?jobkeyword=automation' },
];

interface ListingEntry {
  url: string;
  keyword: string;
  listTitle: string;
}

interface CollectedPost {
  title: string;
  url: string;
  keyword: string;
  description: string;
}

interface FilteredLead extends CollectedPost {
  matched_services: string[];
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#8230;/g, '…')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/\r/g, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

function parseSearchResults(html: string, keyword: string): ListingEntry[] {
  const entries: ListingEntry[] = [];
  const blocks = html.split('<!-- Start -->').slice(1);
  for (const raw of blocks) {
    const block = raw.split('<!-- End -->')[0];
    const urlMatch = block.match(/href="(\/jobseekers\/job\/[^"]+)"/);
    const titleMatch = block.match(/<h4[^>]*>([\s\S]*?)<\/h4>/);
    if (!urlMatch || !titleMatch) continue;
    const title = stripTags(titleMatch[1].replace(/<span[\s\S]*?<\/span>/, '')).trim();
    entries.push({
      url: `https://www.onlinejobs.ph${urlMatch[1]}`,
      keyword,
      listTitle: title,
    });
  }
  return entries;
}

function parseJobDetail(html: string): { title: string; description: string } | null {
  const titleMatch = html.match(/<h1[^>]*class="[^"]*job__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  const descMatch = html.match(/<p id="job-description"[^>]*>([\s\S]*?)<\/p>/);
  if (!titleMatch || !descMatch) return null;
  return {
    title: stripTags(titleMatch[1]),
    description: stripTags(descMatch[1]),
  };
}

// Positive service-fit signals, grouped by the service they indicate.
// Kept tightly scoped to Gabriel's actual competencies: SEO/AEO, AI automations,
// CRM creation, email marketing, social media marketing, website dev & design.
const SERVICE_SIGNALS: Record<string, string[]> = {
  'SEO/AEO': ['seo', 'aeo', 'geo', 'search engine optim', 'local seo', 'google business profile', 'backlink', 'keyword research', 'generative engine optim', 'answer engine optim'],
  'Website design & build': ['wordpress', 'web design', 'website design', 'web developer', 'elementor', 'webflow', 'landing page design', 'site redesign', 'ui/ux', 'figma'],
  'CRM & workflow automation': ['gohighlevel', 'go high level', 'crm', 'zapier', 'make.com', 'automation', 'workflow', 'hubspot', 'n8n', 'api integration', 'ai implementation', 'ai automation'],
  'Email marketing': ['email marketing', 'klaviyo', 'mailchimp', 'email campaign', 'email flows', 'newsletter', 'email automation'],
  'Social media marketing': ['social media marketing', 'social media manager', 'social media strategy', 'meta business suite', 'instagram marketing', 'facebook ads', 'social media content'],
};

// Roles that are a near-certain mismatch even if a keyword happens to match in passing.
const EXCLUDE_SIGNALS = [
  'appointment setter',
  'cold caller',
  'telemarketer',
  'bookkeeper',
  'bookkeeping',
  'virtual assistant needed for calendar',
  'data entry',
  'customer support',
  'customer service representative',
  'recruiter',
  'sales representative',
  'video editor only',
  // Gabriel doesn't do Shopify/ecommerce-platform work — skip store builds,
  // marketplace SEO (Etsy/Amazon/Temu/TikTok Shop), and ecommerce ops roles.
  'shopify',
  'ecommerce store',
  'e-commerce store',
  'online store',
  'dropshipping',
  'etsy',
  'woocommerce',
  'amazon listing',
  'product listing',
  'ecommerce brand',
  'e-commerce brand',
];

// Pay-structure phrases that signal an hourly-rate role — Gabriel only takes
// weekly/bi-weekly/monthly or project-based pay, never hourly.
const HOURLY_PAY_SIGNALS = [
  'per hour',
  '/hr',
  '/ hr',
  'hourly rate',
  'hourly pay',
  'usd/hour',
  'usd per hour',
];

// Businesses that self-describe as already selling the service we'd pitch —
// they're a competitor or supplier, not a prospect. Checked against the first
// ~600 chars, which is where posts almost always state what the company is.
const AGENCY_SELF_DESCRIPTION = [
  'digital marketing agency',
  'marketing agency',
  'seo agency',
  'web design agency',
  'web development agency',
  'creative agency',
  'ecommerce agency',
  'e-commerce agency',
  'digital agency',
  'marketing company',
  'digital marketing company',
  'marketing firm',
  'design studio serving',
  'agency serving',
  'agency that helps',
  'our agency',
  'launch a full-scale marketing agency',
  'digital services business',
  'marketing platform',
  'email marketing platform',
  'runs multiple ecommerce brands',
  'we run ads and email marketing for',
  'for our clients',
  'for clients',
  'client sites',
  'helps small service businesses',
  'helps businesses grow',
  'we partner with',
  'business support to companies',
  'we design, build, and support',
  'we don\'t simply set up software',
];

// Known digital agencies that post heavily on OnlineJobs.ph but don't self-describe
// with the AGENCY_SELF_DESCRIPTION phrasing above — they're a competitor, not a prospect.
const KNOWN_AGENCY_NAMES = ['coalition technologies'];

function scoreAndTag(post: CollectedPost): { score: number; services: string[] } {
  const haystack = `${post.title} ${post.description}`.toLowerCase();
  const intro = post.description.slice(0, 600).toLowerCase();
  const services: string[] = [];
  let score = 0;

  for (const [service, signals] of Object.entries(SERVICE_SIGNALS)) {
    const hit = signals.some((s) => haystack.includes(s));
    if (hit) {
      services.push(service);
      score += 2;
      if (signals.some((s) => post.title.toLowerCase().includes(s))) score += 2;
    }
  }

  if (EXCLUDE_SIGNALS.some((s) => haystack.includes(s))) {
    score -= 10;
  }

  if (AGENCY_SELF_DESCRIPTION.some((s) => intro.includes(s))) {
    score -= 10;
  }

  if (KNOWN_AGENCY_NAMES.some((s) => haystack.includes(s))) {
    score -= 10;
  }

  if (HOURLY_PAY_SIGNALS.some((s) => haystack.includes(s))) {
    score -= 10;
  }

  if (post.description.length < 200) score -= 3;

  return { score, services };
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

async function collectFromNetwork(): Promise<CollectedPost[]> {
  console.log(`Collecting from ${KEYWORDS.length} keyword searches (polite mode: ${DELAY_MS}ms between requests)...\n`);

  const seen = new Map<string, ListingEntry>();

  for (const { keyword, url } of KEYWORDS) {
    console.log(`Fetching search results for "${keyword}"...`);
    const html = await fetchPage(url);
    const entries = parseSearchResults(html, keyword).slice(0, PER_KEYWORD_CAP);
    let added = 0;
    for (const entry of entries) {
      if (!seen.has(entry.url)) {
        seen.set(entry.url, entry);
        added++;
      }
    }
    console.log(`  -> ${entries.length} listed, ${added} new unique posts (running total: ${seen.size})`);
    await sleep(DELAY_MS);
  }

  const listings = Array.from(seen.values());
  console.log(`\nCollected ${listings.length} unique job listings. Fetching full descriptions...\n`);

  const collected: CollectedPost[] = [];
  for (const entry of listings) {
    console.log(`Fetching detail: ${entry.listTitle}`);
    try {
      const html = await fetchPage(entry.url);
      const detail = parseJobDetail(html);
      if (detail && detail.description.length > 0) {
        collected.push({
          title: detail.title || entry.listTitle,
          url: entry.url,
          keyword: entry.keyword,
          description: detail.description,
        });
      } else {
        console.log('  -> could not parse description, skipping');
      }
    } catch (err) {
      console.log(`  -> failed: ${(err as Error).message}`);
    }
    await sleep(DELAY_MS);
  }

  return collected;
}

async function main() {
  const rawOutPath = resolve(process.cwd(), 'data/leads-raw.json');
  const outPath = resolve(process.cwd(), 'data/leads.json');

  let collected: CollectedPost[];
  if (FROM_RAW) {
    if (!existsSync(rawOutPath)) throw new Error(`--from-raw given but ${rawOutPath} does not exist`);
    console.log('Re-filtering from cached data/leads-raw.json (no network requests)...\n');
    collected = JSON.parse(readFileSync(rawOutPath, 'utf8')).posts;
  } else {
    collected = await collectFromNetwork();
  }

  console.log(`\nGathered full descriptions for ${collected.length} posts. Filtering to best ${FINAL_COUNT}...\n`);

  // Drop near-duplicate titles (same role reposted), keep first occurrence.
  const dedupedByTitle: CollectedPost[] = [];
  const seenTitles = new Set<string>();
  for (const post of collected) {
    const norm = normalizeTitle(post.title);
    if (seenTitles.has(norm)) continue;
    seenTitles.add(norm);
    dedupedByTitle.push(post);
  }

  const scored = dedupedByTitle
    .map((post) => {
      const { score, services } = scoreAndTag(post);
      return { post, score, services };
    })
    .filter(({ score, services }) => score > 0 && services.length > 0)
    .sort((a, b) => b.score - a.score);

  const final: FilteredLead[] = scored.slice(0, FINAL_COUNT).map(({ post, services }) => ({
    ...post,
    matched_services: services,
  }));

  if (!FROM_RAW) {
    writeFileSync(rawOutPath, JSON.stringify({ collected_at: new Date().toISOString(), count: dedupedByTitle.length, posts: dedupedByTitle }, null, 2));
    console.log(`Saved ${dedupedByTitle.length} raw posts -> data/leads-raw.json`);
  }
  writeFileSync(outPath, JSON.stringify({ collected_at: new Date().toISOString(), count: final.length, leads: final }, null, 2));
  console.log(`Saved ${final.length} filtered leads -> data/leads.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
