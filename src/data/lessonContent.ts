export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info' | 'success'; title: string; text: string }
  | { type: 'divider' }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface LessonContent {
  readTime: string;
  blocks: Block[];
}

export const lessonContent: Record<string, LessonContent> = {

  // ─── TECHNICAL SEO FOR FOUNDERS ───────────────────────────────────────────

  'technical-seo-founders__0__0': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Before you can fix anything, you need to understand how Google actually discovers your website. Most founders think Google just "finds" their site - the reality is more deliberate, and understanding it changes how you think about every technical decision.' },
      { type: 'heading', text: 'The Crawl-Index-Rank Pipeline' },
      { type: 'paragraph', text: 'Google operates in three distinct phases: crawling, indexing, and ranking. Problems at any stage block you from the next one. Most technical SEO issues are crawl or index problems masquerading as ranking problems.' },
      { type: 'numbered', items: [
        'Crawling - Googlebot visits your pages by following links and reading your sitemap',
        'Indexing - Google decides whether a crawled page is worth storing in its database',
        'Ranking - Indexed pages compete for positions based on relevance and authority',
      ]},
      { type: 'callout', variant: 'info', title: 'Key insight', text: 'If a page isn\'t indexed, it cannot rank. No amount of content quality or backlinks fixes an indexing problem.' },
      { type: 'heading', text: 'How Googlebot Navigates Your Site' },
      { type: 'paragraph', text: 'Googlebot is essentially a browser that follows links. It starts from pages it already knows about - your homepage, your sitemap, pages linking to you from other sites - and crawls outward. Every internal link you add is a path Googlebot can follow.' },
      { type: 'bullets', items: [
        'Googlebot respects your robots.txt file - pages blocked there won\'t be crawled',
        'Pages with no internal links pointing to them are called "orphan pages" and often get missed',
        'JavaScript-heavy sites require a second rendering pass, which can delay indexing by days or weeks',
        'Googlebot has a crawl budget - large sites with many low-quality pages waste it',
      ]},
      { type: 'heading', text: 'What This Means for Your Site' },
      { type: 'paragraph', text: 'Every structural decision you make - how you link between pages, what you include in your sitemap, how fast your pages load - affects how efficiently Google can crawl you. A well-structured 20-page site can outrank a poorly structured 2,000-page site simply because Google can understand it better.' },
      { type: 'callout', variant: 'tip', title: 'Action item', text: 'Open Google Search Console and navigate to Coverage → Indexed. Note the number of indexed pages. Compare it to the number of pages you actually have. A big gap signals a crawl or indexing problem.' },
    ],
  },

  'technical-seo-founders__0__1': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'Google Search Console is the single most important free tool for technical SEO. Most people open it, get overwhelmed, and close it. This lesson cuts through that - here are the 5 reports that actually matter and exactly what to look for in each.' },
      { type: 'callout', variant: 'info', title: 'Before you start', text: 'Make sure your site is verified in Search Console. Go to search.google.com/search-console and add your property. Choose "Domain" property type for complete coverage.' },
      { type: 'heading', text: 'Report 1: Performance' },
      { type: 'paragraph', text: 'This shows which queries are bringing people to your site, which pages are ranking, and your click-through rates. It\'s your traffic diagnostic.' },
      { type: 'bullets', items: [
        'Clicks - actual visits from Google',
        'Impressions - how often your pages appeared in search results',
        'CTR - percentage of impressions that became clicks (industry average is 2–5%)',
        'Average position - your average ranking across all queries',
      ]},
      { type: 'callout', variant: 'tip', title: 'What to look for', text: 'Filter by page, then sort by Impressions descending. Pages with high impressions but low CTR have a title/meta description problem. Pages with high position but no clicks have a keyword targeting problem.' },
      { type: 'heading', text: 'Report 2: Coverage (Index)' },
      { type: 'paragraph', text: 'This tells you which pages Google has indexed and which it hasn\'t - and why. Errors here are your highest-priority fixes.' },
      { type: 'table', headers: ['Status', 'Meaning', 'Action'], rows: [
        ['Valid', 'Indexed and eligible to rank', 'Monitor for drops'],
        ['Error', 'Not indexed due to a problem', 'Fix immediately'],
        ['Valid with warnings', 'Indexed but with issues', 'Review and fix'],
        ['Excluded', 'Not indexed, usually intentional', 'Verify it\'s intentional'],
      ]},
      { type: 'heading', text: 'Report 3: Core Web Vitals' },
      { type: 'paragraph', text: 'Google uses page experience signals as a ranking factor. This report flags pages that fail the speed and interactivity thresholds. "Poor" URLs are dragging your rankings down.' },
      { type: 'heading', text: 'Report 4: Sitemaps' },
      { type: 'paragraph', text: 'Submit your sitemap here and monitor for errors. A sitemap tells Google exactly which pages you want indexed. Without one, Google relies entirely on link-following - slower and less reliable.' },
      { type: 'heading', text: 'Report 5: Manual Actions' },
      { type: 'paragraph', text: 'If Google has penalised your site for spam or policy violations, it shows here. Most sites will never see a manual action. But if you do, this is where you find out - and it explains why your rankings may have dropped overnight.' },
      { type: 'callout', variant: 'success', title: 'Your task', text: 'Check each of these 5 reports right now. Screenshot any errors. The next lessons will show you exactly how to fix them.' },
    ],
  },

  'technical-seo-founders__0__2': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Core Web Vitals are Google\'s user experience metrics. Since 2021 they\'ve been a confirmed ranking factor. Here\'s what they actually measure and - more importantly - what causes them to fail.' },
      { type: 'heading', text: 'The Three Metrics' },
      { type: 'table', headers: ['Metric', 'What It Measures', 'Good Threshold'], rows: [
        ['LCP (Largest Contentful Paint)', 'How fast the main content loads', 'Under 2.5 seconds'],
        ['FID / INP (Interaction to Next Paint)', 'How fast the page responds to clicks', 'Under 200ms'],
        ['CLS (Cumulative Layout Shift)', 'How much the page jumps while loading', 'Under 0.1'],
      ]},
      { type: 'heading', text: 'LCP - Why It Fails' },
      { type: 'paragraph', text: 'LCP is almost always caused by a large image or hero section loading slowly. The most common culprits:' },
      { type: 'bullets', items: [
        'Hero images that aren\'t compressed or converted to WebP/AVIF format',
        'Images without width/height attributes - browser can\'t reserve space',
        'Images loaded via CSS background instead of <img> tags - browser finds them later',
        'No preload hint for the hero image',
        'Slow server response time (TTFB over 600ms)',
      ]},
      { type: 'heading', text: 'CLS - Why It Fails' },
      { type: 'paragraph', text: 'Layout shift happens when elements load in and push other content down. This is almost always caused by:' },
      { type: 'bullets', items: [
        'Images without set dimensions - browser doesn\'t know how much space to reserve',
        'Ads or embeds that expand after loading',
        'Web fonts swapping in and changing text size',
        'Dynamic content inserted above existing content',
      ]},
      { type: 'callout', variant: 'tip', title: 'Quick win', text: 'Add width and height attributes to every <img> tag on your site. This single change often dramatically improves CLS scores with zero design impact.' },
      { type: 'heading', text: 'How to Check Your Scores' },
      { type: 'numbered', items: [
        'Google Search Console → Core Web Vitals → see which URLs are "Poor"',
        'PageSpeed Insights (pagespeed.web.dev) → paste any URL → see field data',
        'Chrome DevTools → Lighthouse tab → run an audit for lab data',
      ]},
    ],
  },

  'technical-seo-founders__0__3': {
    readTime: '22 min',
    blocks: [
      { type: 'paragraph', text: 'Screaming Frog is a desktop crawler that mimics Googlebot - it visits every page on your site and reports what it finds. The paid version is £249/year. The free version crawls up to 500 URLs and is enough for most small sites.' },
      { type: 'callout', variant: 'info', title: 'Download', text: 'Get Screaming Frog at screamingfrog.co.uk/seo-spider. Install it, then paste your homepage URL into the search bar and hit Start.' },
      { type: 'heading', text: 'The 6 Columns That Matter Most' },
      { type: 'table', headers: ['Column', 'What to Look For'], rows: [
        ['Status Code', 'Any 404 or 3XX redirect chains'],
        ['Title 1', 'Missing, duplicate, or over-60-character titles'],
        ['Meta Description 1', 'Missing or duplicate descriptions'],
        ['H1', 'Missing, multiple, or mismatched H1s'],
        ['Indexability', 'Pages marked "Non-Indexable" that should be indexed'],
        ['Canonical Link Element 1', 'Canonical pointing to wrong page'],
      ]},
      { type: 'heading', text: 'Finding Your Biggest Issues Fast' },
      { type: 'paragraph', text: 'Use the filters at the top of each column. Here\'s a fast workflow:' },
      { type: 'numbered', items: [
        'Click the "Response Codes" tab → filter for 4XX → these are broken pages',
        'Click the "Page Titles" tab → filter for "Missing" → these pages have no title tag',
        'Click the "Page Titles" tab → filter for "Duplicate" → multiple pages with the same title',
        'Click the "H1" tab → filter for "Missing" or "Multiple" → heading structure problems',
        'Click the "Directives" tab → look for "noindex" on pages that should be indexed',
      ]},
      { type: 'heading', text: 'Exporting Your Audit' },
      { type: 'paragraph', text: 'File → Export → Full Export gives you a spreadsheet of every URL with all data. This is what you bring to your developer. In the next module, we\'ll show you exactly how to format the developer brief.' },
      { type: 'callout', variant: 'warning', title: 'Common mistake', text: 'Don\'t try to fix everything at once. Export the list, sort by impact, and fix the top 10 issues first. Trying to address 200 issues simultaneously means none get done properly.' },
    ],
  },

  'technical-seo-founders__1__0': {
    readTime: '10 min',
    blocks: [
      { type: 'paragraph', text: 'Canonical tags tell Google which version of a page is the "official" one. Get them wrong and you split your ranking power across multiple URLs - none of them rank as well as one clean page would.' },
      { type: 'heading', text: 'What a Canonical Tag Looks Like' },
      { type: 'paragraph', text: 'A canonical tag sits in the <head> of your HTML: <link rel="canonical" href="https://yoursite.com/your-page/" />' },
      { type: 'heading', text: 'The Most Common Canonical Mistakes' },
      { type: 'bullets', items: [
        'Self-referencing canonical missing entirely - many CMS platforms don\'t add these by default',
        'Canonical pointing to the wrong domain - http:// instead of https://, or www vs non-www',
        'Paginated pages all canonicalising to page 1 - Google stops indexing pages 2, 3, 4+',
        'Canonical on a redirect - pointing to a URL that itself redirects',
        'Inconsistent trailing slashes - /page/ and /page are treated as different URLs',
      ]},
      { type: 'callout', variant: 'tip', title: 'How to check', text: 'In Chrome, right-click → View Page Source → Ctrl+F → search for "canonical". Check that it matches the URL you\'re on, uses https, and uses your preferred www/non-www format.' },
      { type: 'callout', variant: 'warning', title: 'WordPress note', text: 'Yoast SEO and Rank Math both add canonical tags automatically. Check that one of these plugins is active and that the canonical shown matches your expected URL format.' },
    ],
  },

  'technical-seo-founders__1__1': {
    readTime: '15 min',
    blocks: [
      { type: 'paragraph', text: 'JavaScript rendering is the most misunderstood technical SEO issue. If your site relies heavily on JavaScript to display content, Google may not see that content at all - or see it days after crawling.' },
      { type: 'heading', text: 'How Google Handles JavaScript' },
      { type: 'paragraph', text: 'Google crawls pages in two waves. Wave 1 downloads the raw HTML. Wave 2 executes the JavaScript and renders the page. The gap between waves can be days or weeks. Content only visible after JavaScript executes may be invisible to Google during that window.' },
      { type: 'table', headers: ['Rendering Type', 'SEO Impact'], rows: [
        ['Static HTML', 'Best - Google sees everything immediately'],
        ['Server-Side Rendering (SSR)', 'Good - HTML delivered pre-rendered'],
        ['Client-Side Rendering (CSR)', 'Risky - content depends on JS execution'],
        ['Lazy-loaded content', 'Risky - only indexed if Google scrolls'],
      ]},
      { type: 'heading', text: 'How to Diagnose a JS Rendering Problem' },
      { type: 'numbered', items: [
        'Go to Google Search Console → URL Inspection → paste your URL',
        'Click "Test Live URL" → then "View Tested Page" → "Screenshot"',
        'If the screenshot looks blank or broken, Google can\'t render your page',
        'Also check: "More Info" → "Page Resources" - blocked resources mean blocked rendering',
      ]},
      { type: 'callout', variant: 'tip', title: 'Quick fix', text: 'Use Google\'s Rich Results Test (search.google.com/test/rich-results) to see what Google actually reads from your page. If your main content is missing from the text view, you have a rendering problem.' },
    ],
  },

  'technical-seo-founders__1__2': {
    readTime: '13 min',
    blocks: [
      { type: 'paragraph', text: 'LCP (Largest Contentful Paint) is the single most impactful Core Web Vital. Fixing it alone can move your site from "Poor" to "Good" and directly improve rankings on mobile.' },
      { type: 'heading', text: 'Diagnosing Your LCP Element' },
      { type: 'paragraph', text: 'Open Chrome DevTools → Performance tab → record a page load. Look for the "LCP" marker in the timeline. Click it to see which element Google is measuring. It\'s almost always:' },
      { type: 'bullets', items: [
        'A hero image (<img> or CSS background)',
        'A large text block (H1 or paragraph)',
        'A video thumbnail',
      ]},
      { type: 'heading', text: 'The Fix Checklist' },
      { type: 'numbered', items: [
        'Convert hero images to WebP format - typically 30–50% smaller than JPG',
        'Add loading="eager" and fetchpriority="high" to the hero image',
        'Add a <link rel="preload"> in the <head> for the hero image',
        'Set explicit width and height on the image element',
        'Move hero image to a CDN if server response is slow',
        'Remove any render-blocking CSS or JS above the fold',
      ]},
      { type: 'callout', variant: 'success', title: 'Expected result', text: 'Implementing all 6 steps on a typical site moves LCP from 4–6 seconds down to under 2.5 seconds. That\'s the difference between "Poor" and "Good" - and a measurable ranking improvement.' },
    ],
  },

  'technical-seo-founders__1__3': {
    readTime: '8 min',
    blocks: [
      { type: 'paragraph', text: 'Broken internal links are a crawl efficiency problem. When Googlebot follows a link to a 404 page, it wastes crawl budget and finds nothing. On large sites this compounds significantly.' },
      { type: 'heading', text: 'Finding Broken Links' },
      { type: 'paragraph', text: 'In Screaming Frog: Response Codes tab → filter for 4XX → click "Inlinks" tab at the bottom to see which pages link to each broken URL.' },
      { type: 'heading', text: 'Fixing Broken Links' },
      { type: 'bullets', items: [
        'If the page was moved: update the internal link to the new URL',
        'If the page was deleted permanently: redirect the broken URL to the most relevant live page',
        'If it was a typo: fix the link',
        'Never leave a 404 linked from your main navigation or important pages',
      ]},
      { type: 'callout', variant: 'tip', title: 'Priority order', text: 'Fix broken links in your navigation first, then footer, then body content. Navigation links appear on every page - one broken navigation link multiplies across your entire site.' },
    ],
  },

  'technical-seo-founders__1__4': {
    readTime: '11 min',
    blocks: [
      { type: 'paragraph', text: 'Title tags and meta descriptions are your first impression in search results. They also directly influence whether Google indexes your page for the right keywords.' },
      { type: 'heading', text: 'Title Tag Rules' },
      { type: 'bullets', items: [
        'Max 60 characters - Google truncates longer titles in results',
        'Primary keyword near the front',
        'Every page needs a unique title - duplicate titles confuse Google about which page to rank',
        'Don\'t keyword-stuff - "Best SEO Agency | SEO Services | SEO Company" is a red flag',
        'Format: Primary Keyword - Brand Name works well for most pages',
      ]},
      { type: 'heading', text: 'Meta Description Rules' },
      { type: 'bullets', items: [
        'Max 155 characters',
        'Google rewrites them when it wants to - but a good one gets used more often',
        'Include a clear value proposition and call to action',
        'Duplicate meta descriptions across pages is a quality signal problem',
      ]},
      { type: 'callout', variant: 'warning', title: 'Common mistake', text: 'Not having a meta description is better than having a generic one. "Welcome to our website. We offer great services." tells Google nothing and wastes the space.' },
    ],
  },

  'technical-seo-founders__1__5': {
    readTime: '9 min',
    blocks: [
      { type: 'paragraph', text: 'H1 tags define the topic of each page for both users and Google. Getting this wrong is one of the most common technical SEO mistakes - and one of the easiest to fix.' },
      { type: 'heading', text: 'H1 Rules' },
      { type: 'bullets', items: [
        'One H1 per page - not zero, not two',
        'H1 should contain (or match closely) your primary target keyword',
        'H1 should be visible above the fold - not buried below images or banners',
        'H1 and Title tag should be similar but don\'t have to be identical',
      ]},
      { type: 'heading', text: 'Heading Hierarchy' },
      { type: 'paragraph', text: 'Think of headings like a document outline. H1 is the chapter title. H2s are section headings. H3s are sub-sections. Skipping from H1 to H4 or having multiple H1s disrupts the logical structure Google uses to understand your content.' },
      { type: 'callout', variant: 'tip', title: 'Quick audit', text: 'In Chrome, install the "Detailed SEO Extension" (free). It shows you the heading structure of any page in one click. Run it on your 5 most important pages and look for missing or duplicate H1s.' },
    ],
  },

  'technical-seo-founders__1__6': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Images are the most common cause of slow page load times. They\'re also one of the easiest things to fix - and the impact on LCP and Core Web Vitals is immediate.' },
      { type: 'heading', text: 'The Four Image Problems' },
      { type: 'table', headers: ['Problem', 'Fix'], rows: [
        ['Wrong format (PNG/JPG)', 'Convert to WebP or AVIF'],
        ['Not compressed', 'Run through Squoosh or TinyPNG'],
        ['Wrong size (4000px wide on a 800px container)', 'Resize to display size + 2x for retina'],
        ['No alt text', 'Add descriptive alt text with keyword where natural'],
      ]},
      { type: 'heading', text: 'Modern Image Formats' },
      { type: 'bullets', items: [
        'WebP: 25–35% smaller than JPG at same quality, supported by all modern browsers',
        'AVIF: 40–50% smaller than JPG, slightly less browser support',
        'Use <picture> element to serve AVIF to supported browsers, WebP as fallback',
      ]},
      { type: 'callout', variant: 'tip', title: 'Free tool', text: 'Squoosh.app lets you compress and convert images in the browser for free. Convert your hero image to WebP and compare file sizes. You\'ll typically see 40–60% size reduction.' },
    ],
  },

  'technical-seo-founders__1__7': {
    readTime: '10 min',
    blocks: [
      { type: 'paragraph', text: 'Crawl budget is the number of pages Googlebot will crawl on your site within a given timeframe. For small sites (under 1,000 pages), crawl budget is rarely a problem. For larger sites, wasting it on low-value pages means important pages get crawled less frequently.' },
      { type: 'heading', text: 'What Wastes Crawl Budget' },
      { type: 'bullets', items: [
        'Infinite scroll or faceted navigation creating millions of URL combinations',
        'Duplicate pages (www vs non-www, http vs https, trailing slash vs no slash)',
        'URL parameters creating the same page with different URLs (?sort=price vs ?sort=name)',
        'Thin or empty pages that should be noindexed',
        'Redirect chains - A redirects to B which redirects to C',
      ]},
      { type: 'heading', text: 'Fixing Crawl Budget Waste' },
      { type: 'numbered', items: [
        'Block parameter URLs via Google Search Console → Legacy Tools → URL Parameters',
        'Consolidate www/non-www with a 301 redirect at server level',
        'Add noindex to thin pages (tag archives, empty category pages)',
        'Fix redirect chains - each link should redirect directly to its final destination',
      ]},
    ],
  },

  'technical-seo-founders__1__8': {
    readTime: '8 min',
    blocks: [
      { type: 'paragraph', text: 'HTTPS is a baseline requirement for ranking in 2025. Mixed content - where your HTTPS page loads HTTP resources - can trigger browser warnings and hurt trust signals.' },
      { type: 'heading', text: 'Checking HTTPS Status' },
      { type: 'bullets', items: [
        'Your URL should start with https:// - if it shows http://, get an SSL certificate immediately (free via Let\'s Encrypt)',
        'The padlock icon in Chrome means the page is secure',
        'A "Not Secure" warning means either no SSL or mixed content',
      ]},
      { type: 'heading', text: 'Finding Mixed Content' },
      { type: 'paragraph', text: 'Open Chrome DevTools → Console tab. Any warnings about "Mixed Content" show you exactly which HTTP resources are being loaded. Common causes: images, scripts, or iframes hardcoded with http:// URLs.' },
      { type: 'callout', variant: 'tip', title: 'Quick fix', text: 'In WordPress: install the "Better Search Replace" plugin and replace all http://yourdomain.com with https://yourdomain.com in your database. This fixes the most common cause of mixed content in one step.' },
    ],
  },

  'technical-seo-founders__1__9': {
    readTime: '11 min',
    blocks: [
      { type: 'paragraph', text: 'Your sitemap.xml and robots.txt files are the two documents that most directly control what Google can and cannot crawl. Errors here affect your entire site.' },
      { type: 'heading', text: 'Sitemap Errors' },
      { type: 'bullets', items: [
        'Including redirected or 404 URLs in the sitemap - only include canonical, indexable pages',
        'Not submitting the sitemap in Search Console - Google may find it, but don\'t rely on it',
        'Sitemap not updating when new pages are added - most CMS platforms update automatically, check yours',
        'Sitemap over 50MB or 50,000 URLs - split into multiple sitemaps with a sitemap index',
      ]},
      { type: 'heading', text: 'Robots.txt Errors' },
      { type: 'bullets', items: [
        'Blocking CSS or JS files - Google needs to crawl these to render your pages',
        'Accidentally blocking your entire site: "Disallow: /" blocks everything',
        'Blocking pages you actually want indexed',
        'Not listing your sitemap URL at the bottom of robots.txt',
      ]},
      { type: 'callout', variant: 'warning', title: 'Critical check', text: 'Go to yoursite.com/robots.txt right now. If you see "Disallow: /" and it\'s not followed by an Allow rule, you\'ve blocked all of Googlebot. This is one of the most common technical SEO disasters.' },
    ],
  },

  'technical-seo-founders__2__0': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'After running your Screaming Frog audit, you\'ll have a list of issues. The first decision is which ones you fix yourself and which ones you hand to a developer.' },
      { type: 'heading', text: 'Fix Yourself (No Developer Needed)' },
      { type: 'bullets', items: [
        'Title tags and meta descriptions - directly in your CMS',
        'H1 tags - directly in your CMS page editor',
        'Alt text on images - directly in your CMS media library',
        'Internal links - edit page content',
        'Submitting sitemap to Search Console - 2-minute task',
        'Compressing and replacing images - Squoosh + re-upload',
      ]},
      { type: 'heading', text: 'Requires a Developer' },
      { type: 'bullets', items: [
        'Server-side redirects (301s)',
        'Canonical tag implementation if your CMS doesn\'t support it',
        'robots.txt changes',
        'Core Web Vitals fixes (code-level changes)',
        'JavaScript rendering issues',
        'HTTPS migration if not already done',
        'Structured data / schema markup',
      ]},
      { type: 'callout', variant: 'info', title: 'Rule of thumb', text: 'If it requires accessing the CMS content editor, you can probably do it. If it requires accessing the server, theme files, or writing code - brief a developer.' },
    ],
  },

  'technical-seo-founders__2__1': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'A vague brief wastes your developer\'s time and your money. A specific brief gets fixes done right the first time. Here\'s the template used across 40+ client projects.' },
      { type: 'heading', text: 'The Developer Brief Template' },
      { type: 'paragraph', text: 'Structure each issue as: Problem → Evidence → Required Fix → How to Verify.' },
      { type: 'callout', variant: 'info', title: 'Example brief entry', text: 'Problem: Hero image on homepage is 2.4MB JPG causing LCP of 5.8 seconds.\nEvidence: PageSpeed Insights report (attached screenshot).\nRequired fix: Convert /images/hero.jpg to WebP format, add width="1440" height="800" attributes, add fetchpriority="high" to the img tag.\nVerify: PageSpeed Insights LCP should drop below 2.5 seconds after fix.' },
      { type: 'heading', text: 'What Makes a Good Brief' },
      { type: 'bullets', items: [
        'One issue per row - don\'t bundle multiple problems together',
        'Include a screenshot of the Screaming Frog or Search Console error',
        'Specify the exact page URL or template affected',
        'State the expected outcome so both parties know when it\'s done',
        'Prioritize by impact - not every issue needs fixing this sprint',
      ]},
    ],
  },

  'technical-seo-founders__2__2': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'After fixes are deployed, you need to verify they worked. Google Search Console is your primary verification tool.' },
      { type: 'heading', text: 'Verifying Coverage Fixes' },
      { type: 'numbered', items: [
        'Search Console → URL Inspection → paste the fixed URL',
        'Click "Request Indexing" - this prompts Google to re-crawl the page',
        'Wait 24–48 hours → check back → the error should no longer appear',
        'In Coverage report, click "Validate Fix" on resolved error types',
      ]},
      { type: 'heading', text: 'Verifying Core Web Vitals Fixes' },
      { type: 'bullets', items: [
        'PageSpeed Insights: immediate feedback on lab data',
        'Search Console CWV report: field data from real users, updates every 28 days',
        'Chrome User Experience Report (CrUX): detailed field data by URL',
      ]},
      { type: 'callout', variant: 'warning', title: 'Important', text: 'Search Console field data (real user data) lags behind lab data by 28 days. Don\'t panic if PageSpeed shows "Good" but Search Console still shows "Poor" - wait the 28-day cycle before re-auditing.' },
    ],
  },

  'technical-seo-founders__2__3': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'Technical SEO is not a one-time project. Sites degrade - new pages get added, plugins update, developers make changes. A 30-day action plan gives you the structure to go from audit to fixed without losing momentum.' },
      { type: 'heading', text: 'Week 1: Triage and Quick Wins' },
      { type: 'bullets', items: [
        'Fix all title tags and meta descriptions (do it yourself in CMS)',
        'Fix H1 issues across top 20 pages',
        'Add alt text to all images missing it',
        'Submit sitemap to Search Console if not done',
        'Request indexing for your top 10 pages via URL Inspection',
      ]},
      { type: 'heading', text: 'Week 2: Developer Brief' },
      { type: 'bullets', items: [
        'Package your developer brief with all code-level fixes',
        'Prioritize: HTTPS issues → redirect fixes → Core Web Vitals → schema markup',
        'Set clear deadlines for each fix',
      ]},
      { type: 'heading', text: 'Week 3: Verify and Monitor' },
      { type: 'bullets', items: [
        'Verify quick wins in Search Console',
        'Check PageSpeed Insights on key pages after developer fixes',
        'Set up monitoring (next module)',
      ]},
      { type: 'heading', text: 'Week 4: Content and Structure' },
      { type: 'bullets', items: [
        'Fix internal linking - ensure every important page has at least 3 internal links pointing to it',
        'Add or improve schema markup on service pages and homepage',
        'Re-crawl with Screaming Frog to confirm fixes',
      ]},
    ],
  },

  'technical-seo-founders__3__0': {
    readTime: '13 min',
    blocks: [
      { type: 'paragraph', text: 'The goal of monitoring is to catch problems before they compound. A 404 error that goes unfixed for 6 months is worse than one caught in week 1. Monthly monitoring takes 30 minutes once the system is in place.' },
      { type: 'heading', text: 'Monthly Monitoring Checklist' },
      { type: 'table', headers: ['Task', 'Where', 'Time'], rows: [
        ['Check Coverage for new errors', 'Search Console → Coverage', '5 min'],
        ['Review Performance for traffic drops', 'Search Console → Performance', '5 min'],
        ['Check Core Web Vitals status', 'Search Console → CWV', '5 min'],
        ['Run Screaming Frog on key pages', 'Screaming Frog', '10 min'],
        ['Check PageSpeed on homepage + key pages', 'PageSpeed Insights', '5 min'],
      ]},
      { type: 'callout', variant: 'tip', title: 'Calendar reminder', text: 'Set a recurring reminder for the first Monday of every month. Call it "SEO Monitoring Check". Doing it consistently matters more than doing it perfectly.' },
    ],
  },

  'technical-seo-founders__3__1': {
    readTime: '10 min',
    blocks: [
      { type: 'paragraph', text: 'Google Search Console can send you email alerts automatically for critical issues. Set these up once and you\'ll know within 24 hours if something breaks.' },
      { type: 'heading', text: 'Setting Up Alerts' },
      { type: 'numbered', items: [
        'Search Console → Settings (gear icon) → Email Preferences',
        'Enable: Coverage issues, Manual actions, Security issues',
        'These trigger automatically when Google detects a problem',
      ]},
      { type: 'heading', text: 'Third-Party Monitoring' },
      { type: 'bullets', items: [
        'Google Analytics 4 → set up anomaly detection alerts for traffic drops',
        'UptimeRobot (free) → alerts when your site goes down',
        'Ahrefs Alerts or SEMrush Position Tracking → keyword ranking changes',
      ]},
      { type: 'callout', variant: 'info', title: 'Free option', text: 'Search Console\'s built-in email alerts cover the most critical issues at zero cost. This is the minimum every site should have set up.' },
    ],
  },

  'technical-seo-founders__3__2': {
    readTime: '10 min',
    blocks: [
      { type: 'paragraph', text: 'This is the 10-minute check you run every week. It keeps small problems from becoming big ones and takes less time than a coffee break.' },
      { type: 'heading', text: 'The Weekly Routine' },
      { type: 'numbered', items: [
        'Open Search Console → Performance → compare last 7 days vs previous 7 days. Any big drops in clicks or impressions?',
        'Open Coverage → filter by "Error" - any new errors this week?',
        'Check your email for any Search Console alert notifications',
        'If a new page was published this week: URL Inspection → Request Indexing',
        'If traffic dropped on a specific page: check for recent content changes or broken links',
      ]},
      { type: 'callout', variant: 'success', title: 'You\'re done', text: 'That\'s the entire course. You now have everything you need to audit, fix, and maintain your technical SEO without paying for another audit. The $400 audit Organic Theory offers goes deeper - but for most founders, this framework covers 80% of what matters.' },
    ],
  },

  // ─── THE AUTOMATION STACK ─────────────────────────────────────────────────

  'automation-stack__0__0': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Automation platforms are middleware - software that sits between your apps and moves data between them based on rules you define. You don\'t write code. You build visual workflows called "scenarios" that trigger on events and take actions.' },
      { type: 'heading', text: 'The Core Concept' },
      { type: 'paragraph', text: 'Every automation has the same structure: a trigger (something happens) causes one or more actions (something is done). The platform watches for the trigger 24/7 and executes the actions automatically.' },
      { type: 'callout', variant: 'info', title: 'Example', text: 'Trigger: A form is submitted on your website.\nAction 1: Add the contact to HubSpot CRM.\nAction 2: Send a Slack notification to your team.\nAction 3: Send a welcome email to the contact.\n\nAll three happen instantly, automatically, every time.' },
      { type: 'heading', text: 'What Automation Platforms Can Connect' },
      { type: 'bullets', items: ['CRMs: HubSpot, ActiveCampaign, Salesforce', 'Forms: Typeform, Jotform, Gravity Forms', 'Email: Gmail, Outlook, Mailchimp', 'Messaging: Slack, Teams, Discord', 'Spreadsheets: Google Sheets, Airtable, Notion', 'E-commerce: Shopify, WooCommerce, Stripe'] },
    ],
  },

  'automation-stack__0__1': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'Three platforms dominate the no-code automation space. Choosing the right one upfront saves you from migrating later.' },
      { type: 'table', headers: ['Platform', 'Best For', 'Free Tier', 'Paid Starts At'], rows: [['Make', 'Complex logic, best value', '1,000 ops/month', '$9/month'], ['n8n', 'Self-hosted, unlimited ops', 'Self-hosted free', '$20/month cloud'], ['Zapier', 'Simplest setup, most integrations', '100 tasks/month', '$19.99/month']] },
      { type: 'heading', text: 'Make (Recommended for This Course)' },
      { type: 'paragraph', text: 'Make has the best visual interface, cheapest paid tier, and handles complex branching logic better than Zapier. The free tier is enough to build and test all 4 workflows in this course.' },
      { type: 'heading', text: 'n8n - When to Choose It' },
      { type: 'paragraph', text: 'n8n is open-source and can be self-hosted on a $5/month server. If you want zero per-operation costs at scale and are comfortable with basic server management, n8n is the long-term winner.' },
      { type: 'heading', text: 'Zapier - When to Choose It' },
      { type: 'paragraph', text: 'Zapier has the largest app library (6,000+ integrations) and the simplest setup. If you need to connect a niche app that Make doesn\'t support, Zapier may be your only option - but it\'s expensive at scale.' },
      { type: 'callout', variant: 'tip', title: 'For this course', text: 'Sign up for Make at make.com. The free tier is sufficient for all exercises.' },
    ],
  },

  'automation-stack__0__2': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'Every automation scenario is built from three components: triggers, actions, and conditions. Understanding these deeply lets you build any workflow.' },
      { type: 'heading', text: 'Triggers' },
      { type: 'table', headers: ['Trigger Type', 'Example', 'Delay'], rows: [['Instant (webhook)', 'Form submitted, payment received', 'Seconds'], ['Scheduled (polling)', 'New row in Google Sheets, new email', '1–15 minutes']] },
      { type: 'callout', variant: 'tip', title: 'Always prefer instant triggers', text: 'If the app supports webhooks, use them. Polling triggers add delay and consume operations checking for data that may not exist.' },
      { type: 'heading', text: 'Actions' },
      { type: 'paragraph', text: 'Actions are what the automation does after the trigger fires. Common actions: Create record, Update record, Send email, Send Slack message, Add row to spreadsheet, Make HTTP request.' },
      { type: 'heading', text: 'Conditions (Filters)' },
      { type: 'paragraph', text: 'Conditions let you run actions only when certain criteria are met. In Make, these are called Filters. Example: only create a HubSpot contact if the form submission includes a company name.' },
      { type: 'heading', text: 'Routers' },
      { type: 'paragraph', text: 'Routers split your workflow into multiple branches based on conditions. Path A runs if the contact is a new lead. Path B runs if they\'re an existing customer. Routers are what make automation powerful.' },
    ],
  },

  'automation-stack__0__3': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Before you build anything, you should be able to read an automation diagram. This is how you communicate with other operators, document your own work, and debug problems.' },
      { type: 'heading', text: 'Diagram Symbols' },
      { type: 'bullets', items: ['Circle/oval: Trigger (starting point)', 'Rectangle: Action (something is done)', 'Diamond: Condition/Filter (decision point)', 'Arrow: Data flow direction', 'Parallel arrows: Router (branching path)'] },
      { type: 'heading', text: 'Reading Left to Right' },
      { type: 'paragraph', text: 'In Make, scenarios read left to right. The leftmost module is always the trigger. Data flows right through each subsequent module. Branches extend downward from router modules.' },
    ],
  },

  'automation-stack__1__0': {
    readTime: '28 min',
    blocks: [
      { type: 'paragraph', text: 'This is the most common automation in business: a web form submission automatically creates a contact in your CRM. You\'ll build this in Make.' },
      { type: 'heading', text: 'What You\'re Building' },
      { type: 'paragraph', text: 'Trigger: Contact form submitted → Action: Create contact in HubSpot → Action: Tag contact with source "Website Form"' },
      { type: 'heading', text: 'Step 1: Set Up the Webhook in Make' },
      { type: 'numbered', items: ['In Make, create a new scenario', 'Add first module: Webhooks → Custom Webhook', 'Click "Add" → copy the webhook URL', 'Make will wait for a test submission'] },
      { type: 'heading', text: 'Step 2: Connect Your Form' },
      { type: 'paragraph', text: 'In your form tool, find "Webhooks" or "Integrations". Paste the Make webhook URL. Submit a test form entry. Make receives the data and shows you its structure.' },
      { type: 'heading', text: 'Step 3: Add the HubSpot Module' },
      { type: 'numbered', items: ['Click + after your webhook module', 'Search for HubSpot → Create/Update Contact', 'Connect your HubSpot account (OAuth)', 'Map form fields to HubSpot fields: form "email" → HubSpot "Email"', 'Add a property: "Lead Source" = "Website Form"'] },
      { type: 'heading', text: 'Step 4: Test and Activate' },
      { type: 'bullets', items: ['Click "Run Once" in Make to test with your sample submission', 'Check HubSpot - the contact should appear within seconds', 'If it works, click the On/Off toggle to activate the scenario'] },
      { type: 'callout', variant: 'success', title: 'Workflow 1 complete', text: 'Every form submission now automatically creates a CRM contact. Zero manual entry.' },
    ],
  },

  'automation-stack__1__1': {
    readTime: '22 min',
    blocks: [
      { type: 'paragraph', text: 'Companies that respond within 5 minutes are 9x more likely to close a lead. This workflow ensures your team is notified instantly about every new contact.' },
      { type: 'heading', text: 'What You\'re Building' },
      { type: 'paragraph', text: 'Trigger: New HubSpot contact → Action: Post Slack message with contact details → Action: Send welcome email to the lead' },
      { type: 'heading', text: 'Slack Notification Module' },
      { type: 'numbered', items: ['Add module: Slack → Create a Message', 'Connect your Slack workspace', 'Channel: #leads', 'Message: include contact name, email, company from HubSpot data'] },
      { type: 'callout', variant: 'info', title: 'Slack message template', text: '🔔 New lead: {{firstname}} {{lastname}}\n📧 {{email}}\n🏢 {{company}}\nSource: Website Form' },
      { type: 'heading', text: 'Welcome Email Module' },
      { type: 'numbered', items: ['Add module: Gmail → Send Email', 'To: the lead\'s email from the form', 'Subject: "Thanks for reaching out, {{name}}"', 'Body: your standard intro email personalised with their name'] },
    ],
  },

  'automation-stack__1__2': {
    readTime: '30 min',
    blocks: [
      { type: 'paragraph', text: 'Most CRMs let you change a contact\'s status (New Lead → Qualified → Proposal Sent → Closed). This workflow watches for status changes and triggers the right follow-up automatically.' },
      { type: 'heading', text: 'What You\'re Building' },
      { type: 'paragraph', text: 'Trigger: HubSpot lifecycle stage changes → Router: Branch by new stage → Action A (Qualified): Send discovery call link → Action B (Proposal): Start follow-up sequence → Action C (Closed): Send onboarding email' },
      { type: 'heading', text: 'Building the Router' },
      { type: 'numbered', items: ['After trigger, add a Router module', 'Path 1 filter: Lifecycle Stage = "qualifiedlead"', 'Path 2 filter: Lifecycle Stage = "opportunity"', 'Path 3 filter: Lifecycle Stage = "customer"'] },
      { type: 'heading', text: 'Path Actions' },
      { type: 'bullets', items: ['Qualified: send email with Calendly booking link', 'Proposal Sent: 3 follow-up emails over 7 days using Make\'s Sleep module', 'Closed Won: onboarding welcome email + add to Notion database'] },
      { type: 'callout', variant: 'warning', title: 'Test each path separately', text: 'Create test contacts in HubSpot with each status. Don\'t activate until all 3 paths are verified - misconfigured paths can send emails to wrong contacts.' },
    ],
  },

  'automation-stack__1__3': {
    readTime: '20 min',
    blocks: [
      { type: 'paragraph', text: 'Google Sheets is often used as a simple database for tracking leads or contacts. Keeping it synced with your CRM automatically eliminates manual copy-paste forever.' },
      { type: 'heading', text: 'One-Way Sync (CRM → Sheet)' },
      { type: 'numbered', items: ['Trigger: HubSpot → Watch Contacts (new contacts only)', 'Action: Google Sheets → Add a Row', 'Map columns: A = First Name, B = Last Name, C = Email, D = Company, E = Created Date', 'Add "Status" column with hardcoded value "New"'] },
      { type: 'heading', text: 'Bidirectional Sync Considerations' },
      { type: 'paragraph', text: 'True bidirectional sync risks infinite loops. For most use cases, one-way sync (CRM is the source of truth, Sheet is a view) is enough and much simpler to maintain.' },
      { type: 'callout', variant: 'tip', title: 'Avoiding loops', text: 'If you need bidirectional sync, filter: only sync if the record was updated in the last 5 minutes. This prevents a sync from triggering another sync.' },
    ],
  },

  'automation-stack__2__0': {
    readTime: '20 min',
    blocks: [
      { type: 'paragraph', text: 'Branching logic is what separates basic automations from intelligent ones. Instead of doing the same thing every time, your workflow makes decisions based on the data.' },
      { type: 'heading', text: 'If/Else in Make: Filters and Routers' },
      { type: 'paragraph', text: 'Make has two ways to branch: Filter (simple yes/no gate - if condition is true, continue; if false, stop) and Router (multiple paths - different actions based on which condition is met).' },
      { type: 'heading', text: 'Common Filter Conditions' },
      { type: 'table', headers: ['Condition Type', 'Example'], rows: [['Text equals', 'Country = "Australia"'], ['Text contains', 'Email contains "@gmail.com"'], ['Number greater than', 'Deal value > 5000'], ['Exists / Does not exist', 'Phone number exists']] },
      { type: 'callout', variant: 'tip', title: 'Build simple first', text: 'Start with one condition and verify it works before adding more. Add conditions incrementally.' },
    ],
  },

  'automation-stack__2__1': {
    readTime: '15 min',
    blocks: [
      { type: 'paragraph', text: 'Your CRM will have both new and existing contacts. Running the same "new lead" automation on an existing customer is a fast way to annoy them.' },
      { type: 'heading', text: 'Solution: Check Before Creating' },
      { type: 'numbered', items: ['After form webhook fires, add HubSpot "Search Contacts" module', 'Search by email from the form', 'Add a Router after the search result', 'Path 1 (no match): Create new contact → run new lead workflow', 'Path 2 (match found): Update existing contact → run returning customer workflow'] },
      { type: 'callout', variant: 'tip', title: 'Always use Create/Update, not Create', text: 'In HubSpot module, always choose "Create or Update a Contact" - this handles deduplication automatically and prevents duplicate records.' },
    ],
  },

  'automation-stack__2__2': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'Automations fail. APIs go down, data comes in unexpected formats, rate limits get hit. Without error handling, a failed step silently stops your workflow.' },
      { type: 'heading', text: 'Types of Errors' },
      { type: 'bullets', items: ['Connection errors: app API temporarily unavailable', 'Data errors: required field empty, wrong format', 'Rate limit errors: too many API calls', 'Authentication errors: expired token'] },
      { type: 'heading', text: 'Error Handlers in Make' },
      { type: 'table', headers: ['Handler', 'What It Does'], rows: [['Ignore', 'Skip the error, continue'], ['Commit', 'Save successful operations, stop at error'], ['Resume', 'Set a fallback value and continue']] },
      { type: 'heading', text: 'The Notify Pattern' },
      { type: 'paragraph', text: 'Best practice: on error, send yourself a Slack or email notification with the error details. You\'ll know immediately when something breaks and have the information to fix it.' },
      { type: 'callout', variant: 'info', title: 'Make\'s error notifications', text: 'Make → Scenario Settings → Enable "Email notifications on error". Alerts you whenever a scenario fails with the error message and which module caused it.' },
    ],
  },

  'automation-stack__2__3': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'Never activate a scenario without testing every possible path. A scenario that works in testing can behave differently with real data.' },
      { type: 'heading', text: 'The Testing Protocol' },
      { type: 'numbered', items: ['Use Make\'s "Run Once" mode - runs with test data, doesn\'t activate live', 'Submit real test data through your trigger source', 'Check every module\'s output in the scenario inspector', 'Verify data arrived correctly in the destination (CRM, Sheet, email)', 'Test each router branch separately', 'Test the error path - temporarily break a connection and verify the handler fires'] },
      { type: 'callout', variant: 'warning', title: 'Production is different', text: 'Real users submit forms differently than you do in testing. Check Make\'s History tab after the first 10 real runs. Look for failed executions and fix them early.' },
    ],
  },

  'automation-stack__3__0': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Once your workflows are live, you need to know when they fail. Silent failures are the worst kind - your automation appears to be running but nothing is actually happening.' },
      { type: 'heading', text: 'Make\'s Built-In Monitoring' },
      { type: 'bullets', items: ['Scenario History: every execution logged with status and data processed', 'Operations counter: track how close you are to your monthly limit', 'Email alerts: enabled in Scenario Settings', 'Incomplete executions: Make stores failed executions so you can retry them after fixing'] },
      { type: 'callout', variant: 'tip', title: 'Retry failed executions', text: 'Make stores incomplete executions for 30 days. After fixing the root cause, go to History → filter "Incomplete" → Retry All. Data gets reprocessed through the fixed scenario.' },
    ],
  },

  'automation-stack__3__1': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Automations you build without documentation become mysteries six months later - even to you. A one-page doc per scenario saves hours of reverse-engineering.' },
      { type: 'heading', text: 'What to Document' },
      { type: 'bullets', items: ['Purpose: what does this automation do and why', 'Trigger: what starts it, which app, what event', 'Actions: list each step in plain English', 'Conditions: every filter/router and what each path does', 'Dependencies: which apps and accounts needed', 'Error handling: what happens when it fails', 'Last updated: date and reason'] },
      { type: 'callout', variant: 'info', title: 'Make\'s notes feature', text: 'Right-click any module in Make → Add Note. Use this for complex logic - it appears inline in your scenario diagram.' },
    ],
  },

  'automation-stack__3__2': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'There\'s a point where building yourself costs more than hiring. Knowing where that line is saves you from both over-investing in DIY and over-spending on consultants.' },
      { type: 'heading', text: 'Build It Yourself When:' },
      { type: 'bullets', items: ['Logic is simple: 1 trigger, 1–3 actions, no complex conditions', 'Apps have native Make/n8n integrations', 'You have time to maintain it if something breaks', 'Tool cost < 2 hours of your time per month'] },
      { type: 'heading', text: 'Hire When:' },
      { type: 'bullets', items: ['Requires custom code or unusual API connections', 'Failure consequence is high (payments, customer-facing)', 'You spend more than 4 hours/month maintaining it'] },
    ],
  },

  'automation-stack__3__3': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'The four workflows you\'ve built are a foundation. As your business grows, so does your automation stack. Here\'s how to scale without creating an unmaintainable mess.' },
      { type: 'heading', text: 'The Scaling Principles' },
      { type: 'bullets', items: ['One scenario per use case - don\'t build one giant scenario that does everything', 'Use webhooks between scenarios for modular design', 'Data Store for shared state between scenarios', 'Duplicate a scenario before major changes - keep old version 30 days'] },
      { type: 'heading', text: 'When to Upgrade Your Plan' },
      { type: 'table', headers: ['Signal', 'Action'], rows: [['Approaching operation limit monthly', 'Upgrade plan or optimize scenarios'], ['Scenarios failing due to rate limits', 'Add delays between operations'], ['More than 20 active scenarios', 'Hire a part-time automation specialist']] },
      { type: 'callout', variant: 'success', title: 'Course complete', text: 'You\'ve built 4 real production automations and understand the principles to build any workflow. The Organic Theory automation service builds on exactly these foundations.' },
    ],
  },

  // ─── AEO MASTERCLASS ──────────────────────────────────────────────────────

  'aeo-masterclass__0__0': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'To optimize for AI answer engines, you need to understand how they work. ChatGPT, Perplexity, and Google\'s AI Overviews are different products built on different architectures - but they all share the same fundamental process.' },
      { type: 'heading', text: 'How Large Language Models Are Trained' },
      { type: 'paragraph', text: 'LLMs like GPT-4 and Gemini are trained on enormous text datasets crawled from the web. During training, they learn patterns in language and encode knowledge into billions of parameters. This is "baked-in" knowledge - information the model memorised from training data.' },
      { type: 'heading', text: 'Retrieval-Augmented Generation (RAG)' },
      { type: 'paragraph', text: 'Perplexity and Google AI Overviews go further: they retrieve live web content at query time and feed it into the model as context. The model generates its answer by synthesising that retrieved content. This is why your pages can appear in AI Overviews even if the model wasn\'t trained on them.' },
      { type: 'table', headers: ['Product', 'Architecture', 'Content Source'], rows: [['ChatGPT (default)', 'Pure LLM', 'Training data (cutoff date)'], ['ChatGPT + Browse', 'LLM + RAG', 'Live web + training'], ['Perplexity', 'LLM + RAG', 'Live web search'], ['Google AI Overviews', 'LLM + RAG', 'Google index']] },
      { type: 'callout', variant: 'info', title: 'AEO focus', text: 'This course focuses on RAG-based systems since you can directly influence what they cite. LLM training data influence is a longer-term play covered in Module 4.' },
    ],
  },

  'aeo-masterclass__0__1': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Traditional SEO optimizes your content to rank in the 10 blue links. AEO optimizes it to be cited in the answer itself - above the links, in the AI-generated summary.' },
      { type: 'heading', text: 'Why Traditional SEO Isn\'t Enough' },
      { type: 'bullets', items: ['AI Overviews appear above ranked results - position 1 doesn\'t guarantee inclusion', 'The model selects content based on clarity and structure, not just authority', 'Long-form content that ranks well often isn\'t extracted well by AI', 'AI prefers direct answers; SEO content often buries the answer in introductory paragraphs'] },
      { type: 'callout', variant: 'warning', title: 'Zero-click searches', text: 'When AI Overviews answer the question directly, users don\'t click through. Brands cited in the AI answer maintain visibility even without the click.' },
      { type: 'heading', text: 'The Opportunity' },
      { type: 'paragraph', text: 'Most websites are not optimized for AI citation. The brands that restructure their content now will lock in citation positions before their competitors figure it out.' },
    ],
  },

  'aeo-masterclass__0__2': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'When a RAG system retrieves your page, it doesn\'t read it like a human. It scans for passages that directly answer the query. Understanding what signals it uses to select content is the core of AEO.' },
      { type: 'heading', text: 'The Four Citation Signals' },
      { type: 'numbered', items: ['Direct answer proximity - does the page directly answer the query within the first 100 words?', 'Structural clarity - are key points in lists, tables, or labelled sections?', 'Authoritative signals - is content attributed to a named expert or organization?', 'Conciseness - is the answer self-contained in a short passage, or buried in 2,000 words?'] },
      { type: 'heading', text: 'How RAG Chunks Your Content' },
      { type: 'paragraph', text: 'In RAG systems, the retriever breaks your page into chunks - passages of roughly 200–500 words. Each chunk is evaluated independently. This means any passage on your page can be cited, not just the overall page.' },
      { type: 'callout', variant: 'tip', title: 'Practical implication', text: 'Write every section as if it could be extracted and read in isolation. Each H2 section should pose the question, give the direct answer, and support it briefly.' },
    ],
  },

  'aeo-masterclass__0__3': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'AEO and SEO are not competing strategies. The structural changes that make content better for AI citation also make it more readable for humans and more parseable for Google\'s traditional algorithm.' },
      { type: 'heading', text: 'Where They Align' },
      { type: 'bullets', items: ['Clear headings: good for readers, SEO crawlers, and AI extractors', 'Direct answers: reduces bounce rate (SEO signal) and gets cited by AI', 'Schema markup: helps Google featured snippets and structured data parsing', 'Author authority: E-E-A-T for SEO and authoritative signals for AI citation'] },
      { type: 'heading', text: 'Where They Diverge' },
      { type: 'bullets', items: ['SEO rewards length; AEO rewards conciseness', 'SEO values keyword density; AEO values semantic clarity', 'SEO needs backlinks for authority; AEO values in-content attribution'] },
      { type: 'callout', variant: 'success', title: 'The approach', text: 'Write comprehensively but structure in self-contained sections. Each section gives a direct answer first, then supporting detail.' },
    ],
  },

  'aeo-masterclass__1__0': {
    readTime: '20 min',
    blocks: [
      { type: 'paragraph', text: 'AI extractors don\'t read your page - they parse it. The structural patterns you choose determine whether the model can extract a clean, citable answer or has to piece it together from unstructured prose.' },
      { type: 'heading', text: 'Pattern 1: Direct Answer Opening' },
      { type: 'paragraph', text: 'The first sentence of any section should directly answer the implied question of that heading. No preamble. The AI extractor looks for the answer immediately after the relevant heading.' },
      { type: 'callout', variant: 'warning', title: 'What not to do', text: 'BAD: "When it comes to technical SEO, there are many things to consider..."\n\nGOOD: "Technical SEO fixes the issues that prevent Google from crawling and indexing your site correctly."' },
      { type: 'heading', text: 'Pattern 2: Question-Answer Pairs' },
      { type: 'paragraph', text: 'Structure FAQ sections as literal Q&A: the question as an H3, the answer as the first paragraph. AI systems are trained to extract Q&A pairs because they directly match the query-answer structure of a conversation.' },
      { type: 'heading', text: 'Pattern 3: Numbered Processes' },
      { type: 'paragraph', text: 'For process content, numbered lists are the strongest signal. The AI can extract the list cleanly and present it as step-by-step instructions.' },
      { type: 'heading', text: 'Pattern 4: Definition Sentences' },
      { type: 'paragraph', text: 'For definitional queries, lead with: "[Term] is [definition]." This matches the exact extraction pattern AI uses for knowledge queries.' },
    ],
  },

  'aeo-masterclass__1__1': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'The most valuable content structure for AEO is the Q&A pair. Every FAQ section on your site is an opportunity to capture AI citations for question-based queries.' },
      { type: 'heading', text: 'What Makes a Good Q&A Pair' },
      { type: 'bullets', items: ['Question matches how a real person asks it - use natural language', 'Answer is self-contained - can be read without context', 'Answer is 40–120 words - long enough to be useful, short enough to extract cleanly', 'Answer includes the key term from the question'] },
      { type: 'heading', text: 'Where to Place Q&A Content' },
      { type: 'numbered', items: ['FAQ section at the bottom of service pages', 'Standalone FAQ pages for high-volume question keywords', 'Blog post sections structured as Q&A', 'About/process pages answering common objections'] },
      { type: 'callout', variant: 'tip', title: 'Question research', text: 'Google "People Also Ask" for your primary keywords. Each PAA question is a query the AI will look for an answer to. Answering these directly is one of the highest-impact AEO moves.' },
    ],
  },

  'aeo-masterclass__1__2': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Definition sentences are the most commonly cited content type in AI answers. Any time a user asks "what is X", the AI looks for a clean definition sentence.' },
      { type: 'heading', text: 'The Formula' },
      { type: 'paragraph', text: '[Term] is [category] that [function/purpose]. It [distinguishing characteristic] and is commonly used for [use case].' },
      { type: 'callout', variant: 'info', title: 'Example', text: 'Technical SEO is the practice of optimising a website\'s infrastructure to help search engines crawl, index, and rank its pages. It covers site speed, crawlability, URL structure, and structured data - the foundations content quality alone cannot fix.' },
      { type: 'heading', text: 'Applying This to Your Content' },
      { type: 'bullets', items: ['Every service page should define the service in the opening sentence', 'Every blog post covering a concept should define it early', 'Glossary pages built around definition sentences are high-value AEO assets', 'Product pages should define the problem they solve, not just describe features'] },
    ],
  },

  'aeo-masterclass__1__3': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Lists and tables are the most extractable content formats. AI models parse them cleanly and can reproduce them without reformatting.' },
      { type: 'table', headers: ['Format', 'Use For', 'AI Extraction'], rows: [['Bullet list', 'Unordered items, features', 'High'], ['Numbered list', 'Sequential steps, processes', 'Very high'], ['Table', 'Comparisons, specifications', 'High'], ['Paragraph prose', 'Narrative, context', 'Lower']] },
      { type: 'heading', text: 'Table Best Practices for AEO' },
      { type: 'bullets', items: ['Keep tables narrow - 2–4 columns. Wide tables break in AI output.', 'Use descriptive headers', 'First column should be the key term or concept', 'Don\'t use merged cells - AI parsers handle simple tables much better'] },
      { type: 'callout', variant: 'tip', title: 'Convert prose comparisons to tables', text: 'If you have a paragraph comparing two tools or options, convert it to a table. Improves AI extractability and is usually more readable for humans too.' },
    ],
  },

  'aeo-masterclass__1__4': {
    readTime: '10 min',
    blocks: [
      { type: 'paragraph', text: 'Sentence structure affects AI extractability more than most content creators realize. Dense, complex sentences are harder for models to parse cleanly.' },
      { type: 'heading', text: 'Sentence Length Guidelines' },
      { type: 'bullets', items: ['Aim for 15–25 words per sentence on average', 'Lead with the subject and verb', 'One idea per sentence - don\'t chain multiple concepts with commas', 'Active voice outperforms passive for AI extraction'] },
      { type: 'heading', text: 'Paragraph Density' },
      { type: 'paragraph', text: 'Keep paragraphs to 3–4 sentences maximum. Short paragraphs create natural chunk boundaries - each paragraph becomes a self-contained unit the AI can extract cleanly.' },
    ],
  },

  'aeo-masterclass__2__0': {
    readTime: '15 min',
    blocks: [
      { type: 'paragraph', text: 'Structured data (schema markup) is machine-readable code that tells AI systems exactly what your content represents. For AEO, it\'s the clearest possible signal about your content\'s structure.' },
      { type: 'heading', text: 'What Schema Markup Does' },
      { type: 'paragraph', text: 'A page with FAQPage schema tells the AI: "these are question-and-answer pairs, extract them as such." Without schema, the AI has to infer this from structure alone.' },
      { type: 'heading', text: 'The Most Impactful Schema Types for AEO' },
      { type: 'table', headers: ['Schema Type', 'AEO Use Case'], rows: [['FAQPage', 'Q&A sections - highest direct AEO impact'], ['HowTo', 'Step-by-step process content'], ['Article', 'Blog posts - signals author and date'], ['Person', 'Author pages - builds authority signals'], ['Organization', 'Company - foundational trust signal']] },
      { type: 'callout', variant: 'info', title: 'Format', text: 'Schema is written in JSON-LD format inside a <script type="application/ld+json"> tag in your page\'s <head>. It doesn\'t appear visually on the page.' },
    ],
  },

  'aeo-masterclass__2__1': {
    readTime: '20 min',
    blocks: [
      { type: 'paragraph', text: 'FAQPage schema is the single highest-impact schema type for AEO. It directly labels your Q&A content for AI extraction and can trigger rich results in Google Search.' },
      { type: 'callout', variant: 'info', title: 'JSON-LD Template', text: '{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [{\n    "@type": "Question",\n    "name": "What is technical SEO?",\n    "acceptedAnswer": {\n      "@type": "Answer",\n      "text": "Technical SEO is the practice of optimising a website\'s infrastructure..."\n    }\n  }]\n}' },
      { type: 'heading', text: 'Implementation Rules' },
      { type: 'bullets', items: ['Only mark up Q&A pairs visible on the page', 'The "text" value should match the visible answer exactly', 'Add FAQPage schema to every page with an FAQ section', 'Minimum 2 questions for rich results eligibility', 'Maximum 10 questions for Google rich results display'] },
      { type: 'heading', text: 'WordPress Implementation' },
      { type: 'paragraph', text: 'Rank Math and Yoast SEO both support FAQPage schema through their FAQ block. Add an FAQ block in Gutenberg, enter your Q&As, and the plugin generates schema automatically.' },
    ],
  },

  'aeo-masterclass__2__2': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'HowTo schema labels step-by-step process content for AI systems. Ideal for service pages describing your process or blog posts teaching a technique.' },
      { type: 'heading', text: 'When to Use HowTo Schema' },
      { type: 'bullets', items: ['Blog posts that teach a process: "How to run a technical SEO audit"', 'Service pages describing delivery: "How we build your automation system"', 'Any content structured as numbered steps with a clear outcome'] },
      { type: 'callout', variant: 'info', title: 'JSON-LD Template', text: '{\n  "@context": "https://schema.org",\n  "@type": "HowTo",\n  "name": "How to audit your technical SEO",\n  "step": [{\n    "@type": "HowToStep",\n    "name": "Check Coverage in Search Console",\n    "text": "Go to Search Console → Coverage. Note any errors."\n  }]\n}' },
    ],
  },

  'aeo-masterclass__2__3': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Article and Person schema build the authority signals that AI systems use to evaluate whether content is trustworthy enough to cite.' },
      { type: 'heading', text: 'Article Schema Key Fields' },
      { type: 'bullets', items: ['headline: the post title', 'author: links to Person schema', 'datePublished and dateModified: keeps signals fresh', 'publisher: links to Organization schema', 'image: a featured image URL'] },
      { type: 'heading', text: 'Person Schema for Authors' },
      { type: 'paragraph', text: 'Create an author page at /about. Add Person schema with: name, jobTitle, description, url, and sameAs (LinkedIn, Twitter, other profiles). This creates a machine-readable identity that AI systems can attribute content to.' },
      { type: 'callout', variant: 'tip', title: 'SameAs is critical', text: 'The sameAs property links your schema to your LinkedIn, Twitter/X, and professional profiles. This helps AI verify the author is a real, authoritative person.' },
    ],
  },

  'aeo-masterclass__2__4': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'Always verify schema is implemented correctly. Broken schema does nothing; valid schema provides a clear signal.' },
      { type: 'heading', text: 'Google\'s Rich Results Test' },
      { type: 'numbered', items: ['Go to search.google.com/test/rich-results', 'Enter your page URL or paste your HTML', 'Tool shows which schema types were detected and whether they\'re valid', 'Fix any errors - common issues: missing required fields, text doesn\'t match visible content'] },
      { type: 'callout', variant: 'warning', title: 'Common mistake', text: 'Don\'t add schema for content not visible on the page. Google can detect and penalise "hidden" schema - markup describing content users can\'t see.' },
    ],
  },

  'aeo-masterclass__3__0': {
    readTime: '18 min',
    blocks: [
      { type: 'paragraph', text: 'Before rewriting any content for AEO, audit what you already have. Some pages need minor restructuring; others need a full rewrite. The audit tells you where to spend your time.' },
      { type: 'heading', text: 'The AEO Audit Scorecard' },
      { type: 'table', headers: ['Check', 'Good', 'Needs Work'], rows: [['Direct answer in first 100 words?', 'Yes', 'Buried in intro'], ['H2/H3 headings as questions?', 'At least some', 'All prose headings'], ['FAQ section with schema?', 'Yes', 'No or missing schema'], ['Lists/tables for key points?', 'Most points listed', 'All prose'], ['Author schema present?', 'Yes', 'No'], ['Definition sentence for key term?', 'Yes', 'No clear definition']] },
      { type: 'heading', text: 'Scoring Your Pages' },
      { type: 'paragraph', text: 'Score each page out of 6. Pages scoring 0–2: full rewrite. Pages 3–4: targeted restructuring. Pages 5–6: add schema only.' },
      { type: 'callout', variant: 'tip', title: 'Prioritize by traffic', text: 'Start with your highest-traffic pages. Pull from Search Console → Performance → Pages sorted by Impressions.' },
    ],
  },

  'aeo-masterclass__3__1': {
    readTime: '22 min',
    blocks: [
      { type: 'paragraph', text: 'Service pages are your highest-value AEO target. They answer exactly the queries your ideal clients are asking.' },
      { type: 'heading', text: 'The AEO Service Page Structure' },
      { type: 'numbered', items: ['H1: Service name in plain terms', 'Opening paragraph: definition sentence', 'H2: How [Service] Works - numbered steps', 'H2: What\'s Included - bullet list', 'H2: Who This Is For - 3–4 specific client types', 'H2: Results and Outcomes - specific metrics', 'H2: FAQ - 5–8 Q&A pairs with FAQPage schema', 'H2: Pricing - direct answer'] },
      { type: 'heading', text: 'The Rewrite Rule' },
      { type: 'paragraph', text: 'For every paragraph on your current page, ask: does this directly answer a question a potential client would ask? If not, reframe it. "We use a proven methodology" → "How does the process work? We follow four phases: [numbered list]."' },
    ],
  },

  'aeo-masterclass__3__2': {
    readTime: '16 min',
    blocks: [
      { type: 'paragraph', text: 'A well-built FAQ section captures long-tail question queries in SEO and gets cited in AI answers. Building them strategically - not as afterthoughts - is what makes the difference.' },
      { type: 'heading', text: 'Finding the Right Questions' },
      { type: 'bullets', items: ['Google "People Also Ask" for your primary keyword', 'Answer the Public (answerthepublic.com) - all question variants for any keyword', 'Your own sales calls - what do clients ask before signing?', 'Search Console → queries containing "how", "what", "why", "when"'] },
      { type: 'heading', text: 'Answer Format for Maximum Citation' },
      { type: 'paragraph', text: 'Each answer: Direct answer (1 sentence) → Supporting detail (2–3 sentences) → Specific example or data point. Total: 60–120 words per answer.' },
      { type: 'callout', variant: 'success', title: 'Target: 8 questions per service page', text: 'Eight Q&A pairs covers objections, process questions, pricing, and comparisons. Enough for FAQPage schema rich results and primary AEO targets.' },
    ],
  },

  'aeo-masterclass__3__3': {
    readTime: '14 min',
    blocks: [
      { type: 'paragraph', text: 'Unlike traditional SEO rankings, AI Overview appearances are harder to track. Here\'s what\'s available.' },
      { type: 'heading', text: 'Google Search Console - AI Overviews' },
      { type: 'paragraph', text: 'Search Console\'s Performance report includes an "AI Overviews" section for some accounts. Filter by Search Type → "AI Overviews" to see which queries your content appears in.' },
      { type: 'heading', text: 'Manual Checking' },
      { type: 'bullets', items: ['Search your target queries in Google in incognito mode', 'Note which sources are cited in the "Sources" panel', 'Check weekly for your top 10 target queries'] },
      { type: 'heading', text: 'Perplexity Tracking' },
      { type: 'paragraph', text: 'Search your brand name and key service queries on Perplexity.ai. Perplexity shows sources explicitly, making tracking straightforward.' },
    ],
  },

  'aeo-masterclass__3__4': {
    readTime: '12 min',
    blocks: [
      { type: 'paragraph', text: 'AEO results compound over 6–12 weeks as AI systems re-index and update citation sources. This checklist keeps you consistent.' },
      { type: 'heading', text: 'Weeks 1–2: Audit and Prioritize' },
      { type: 'bullets', items: ['Run AEO audit on top 5 pages by impressions', 'Score each page using the 6-point framework', 'Research FAQ questions using PAA + Answer the Public'] },
      { type: 'heading', text: 'Weeks 3–4: Rewrite and Schema' },
      { type: 'bullets', items: ['Rewrite top 2 pages using AEO structure', 'Add FAQPage schema to all FAQ sections', 'Add Article + Author schema to all blog posts', 'Validate all schema with Rich Results Test'] },
      { type: 'heading', text: 'Weeks 5–6: Monitor and Expand' },
      { type: 'bullets', items: ['Check AI Overview appearances weekly', 'Rewrite 2 more pages', 'Add HowTo schema to process content', 'Begin tracking Perplexity citations manually'] },
      { type: 'callout', variant: 'success', title: 'Course complete', text: 'You now have the full AEO framework: how AI reads the web, structural patterns that get cited, schema implementation, and a 6-week monitoring plan. Apply this to every page you publish going forward.' },
    ],
  },
};
