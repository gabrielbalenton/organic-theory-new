export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  sections: { heading?: string; body: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-your-website-isnt-ranking',
    title: 'Why Your Website Isn\'t Ranking: The Hidden Technical Debt Most Agencies Won\'t Tell You',
    excerpt: 'Most SEO audits stop at keywords and backlinks. The real reason your site isn\'t ranking is usually sitting in your code - and it\'s been there since the build.',
    category: 'Technical SEO',
    readTime: 6,
    date: '2025-05-12',
    sections: [
      {
        body: 'I\'ve audited over 40 websites in the past three years. The single most common finding? Technical debt that predates the SEO strategy by months, sometimes years. The site launches, rankings plateau, and everyone starts arguing about keywords - while the real problem is buried in the source code.',
      },
      {
        heading: 'What technical debt actually means for search',
        body: 'Technical debt in the context of SEO isn\'t just slow load times. It\'s a compounding of small architectural decisions - improper canonical tags, bloated JavaScript bundles blocking render, images without alt attributes, heading structures that confuse crawlers, duplicate content served across multiple URLs with no canonical signal. Each issue alone might cost you 2–3 ranking positions. Stacked together, they can make a well-funded, well-written site invisible.',
      },
      {
        heading: 'The Lighthouse score everyone ignores',
        body: 'Google\'s Lighthouse tool gives you a score from 0–100 across Performance, Accessibility, Best Practices, and SEO. Most sites I audit score between 40–65 on Performance and 60–80 on SEO. Most agencies show clients the SEO score and ignore the rest. But here\'s the thing - Core Web Vitals are a confirmed ranking signal. A Performance score of 27 (which is what I found on one timber platform I rebuilt) means Google is throttling your crawl budget and deprioritising your pages in competitive SERPs. After the rebuild: 96 Performance, 100 SEO.',
      },
      {
        heading: 'The three technical issues that kill rankings first',
        body: 'In my experience, three issues appear in almost every audit: (1) JavaScript-rendered content that Googlebot doesn\'t fully execute during crawl, meaning key page content and internal links are invisible. (2) Slow server response time - TTFB above 600ms signals poor infrastructure to search engines. (3) Uncompressed, wrongly-sized images causing Largest Contentful Paint to fail. These aren\'t glamorous fixes. They don\'t show up on a content brief. But they\'re the difference between ranking on page 2 and page 1.',
      },
      {
        heading: 'What to do about it',
        body: 'Start with a full Screaming Frog crawl of your domain. Export all URLs, filter by status code, check canonical tags, and run a Core Web Vitals report in Google Search Console. If your CWV shows more than 30% of URLs in "Poor" status, you have a structural problem that no content strategy will overcome. At that point, you need a technical rebuild before you spend another dollar on content or links. That\'s not what agencies want to tell you because it delays the retainer. But it\'s the truth.',
      },
    ],
  },
  {
    slug: 'programmatic-seo-at-scale',
    title: 'From Zero to 63%: How Programmatic SEO Scaled a Real Estate Platform in 8 Weeks',
    excerpt: 'When the target was 30% search visibility and we hit 63.21% in under two months, the question wasn\'t whether programmatic SEO works - it was why more brands aren\'t doing it.',
    category: 'Search Architecture',
    readTime: 7,
    date: '2025-04-03',
    sections: [
      {
        body: 'Programmatic SEO is one of the most misunderstood growth levers in digital marketing. Most people hear "programmatic" and think templated, thin, spam-like content. Done right, it\'s the opposite - it\'s a systematic way to build genuine topical authority at a scale that hand-crafted content simply can\'t match.',
      },
      {
        heading: 'The brief',
        body: 'A real estate platform needed local search visibility across hundreds of Australian suburbs. The target: 30% search visibility within three months. The constraint: no existing content infrastructure, no dedicated content team, and a domain with reasonable but untapped authority. My job was to architect the solution.',
      },
      {
        heading: 'The architecture',
        body: 'We built 1,281 suburb-specific landing pages over eight weeks. Each page followed a structured template built around genuine local intent signals - median property prices from public data, suburb demographic profiles, nearby infrastructure, school catchments, and market trend data. Crucially, no two pages shared the same introductory paragraph. The structure was templated; the data was unique. That distinction is everything.',
      },
      {
        heading: 'The keyword architecture behind it',
        body: 'Every page targeted a cluster of 8–12 keywords: "[suburb] real estate", "[suburb] houses for sale", "property market [suburb]", "buying in [suburb]", and several long-tail informational variations. None were high volume individually. Combined across 1,281 pages, they represented a substantial slice of addressable search demand. That\'s the core insight of programmatic SEO - aggregate long-tail coverage beats chasing short-tail head terms.',
      },
      {
        heading: 'The result',
        body: 'In week 8, search visibility hit 63.21% - more than double the target. Search impressions increased by 154% from baseline. The pages indexed cleanly because the technical foundation was solid: proper canonical tags, no duplicate content, structured data on every page, fast render times, and a logical internal linking structure that distributed authority across the new page cluster. The strategy only worked because the architecture was right from the start.',
      },
      {
        heading: 'When programmatic SEO doesn\'t work',
        body: 'I\'ve seen programmatic SEO fail spectacularly when it\'s treated as a content hack rather than an information architecture project. If the pages have no real data differentiation, Google will detect the pattern and either deindex or sandbox the entire batch. The discipline is in finding genuine data that varies meaningfully by entity - suburb, product, city, category - and building a template that surfaces that data in a way that genuinely answers search intent.',
      },
    ],
  },
  {
    slug: 'automation-stack-eliminating-manual-entry',
    title: 'The Automation Stack: How We Eliminated Manual Data Entry Across a 400-Member Association',
    excerpt: 'A membership form that spawned three Slack messages, two spreadsheet updates, and a manual CRM entry. Every. Single. Time. Here\'s how we killed that workflow in one build.',
    category: 'AI Automation',
    readTime: 5,
    date: '2025-03-17',
    sections: [
      {
        body: 'Every operations team I\'ve worked with has at least one process they hate. They know it\'s inefficient. They\'ve talked about fixing it. But it keeps running because changing it feels harder than tolerating it. For one sports association, that process was membership renewals - a form submission that triggered a chain of manual steps across three systems.',
      },
      {
        heading: 'The before state',
        body: 'When a member submitted the annual renewal form, a staff member received an email notification, manually copied the data into the CRM, checked for existing records, updated the membership status, added the member to the correct email list, logged a note in the database, and then sent a confirmation email from their personal inbox. Total time per submission: 8–12 minutes. With 400 renewals concentrated across a six-week window, that was 53–80 hours of labor annually. On a task that should take zero.',
      },
      {
        heading: 'The build',
        body: 'We connected the membership form (Gravity Forms on WordPress) to Make (formerly Integromat) via webhook. The automation runs three parallel paths: (1) CRM path - check for existing contact in HubSpot, update if found, create if new, assign the correct membership tier tag and renewal date. (2) Communication path - trigger a personalised email sequence in ActiveCampaign confirming the membership, including the member\'s details and a unique membership ID. (3) Admin path - log the submission to a Google Sheet with timestamp and payment status, and post a formatted summary to a dedicated Slack channel. All three paths run simultaneously in under 4 seconds of the form submission.',
      },
      {
        heading: 'The three handling paths',
        body: 'The key architectural decision was building three distinct paths based on membership status: new member (no existing CRM record), renewal (existing record, lapsed membership), and upgrade (existing record, tier change). Each path has different CRM field updates, different email templates, and different admin notifications. A single linear automation couldn\'t handle this correctly - branching logic is what makes it production-ready.',
      },
      {
        heading: 'What zero manual entry actually means',
        body: 'In the first renewal season after launch, 423 memberships processed with zero manual intervention. Zero. Staff received the Slack notifications, checked the Sheet for payment exceptions (about 12 cases out of 423), and dealt only with genuine edge cases. What was 53–80 hours of repetitive data entry became about 2 hours of exception handling. That\'s the real promise of workflow automation - not replacing humans, but removing the work that doesn\'t require them.',
      },
    ],
  },
  {
    slug: 'writing-for-ai-answer-engines',
    title: 'AI Is Already Reading Your Website. Here\'s How to Write for It.',
    excerpt: 'ChatGPT, Perplexity, and Google\'s AI Overviews don\'t rank pages - they extract answers. Your content strategy needs to account for both humans and machines reading it.',
    category: 'AEO & Content',
    readTime: 6,
    date: '2025-02-28',
    sections: [
      {
        body: 'In 2025, your website has two audiences: people and AI. The people convert. The AI decides whether the people find you at all. Answer Engine Optimisation (AEO) is the discipline of structuring content so that large language models can extract, summarise, and cite it accurately - in Google\'s AI Overviews, in Perplexity answers, in ChatGPT responses to research queries.',
      },
      {
        heading: 'Why traditional SEO isn\'t enough',
        body: 'Traditional SEO optimizes for a ranked list of blue links. The user sees your title, your meta description, and clicks through. AEO operates differently - the AI synthesises an answer from multiple sources and either cites you or doesn\'t. If your content isn\'t structured for extraction, the AI can\'t reliably pull from it, and you get cited less frequently. Over time, this compounds: pages that get cited by AI gain authority signals; pages that don\'t get cited lose relative visibility.',
      },
      {
        heading: 'The structural signals that matter',
        body: 'From studying which pages get cited by Perplexity and appear in Google\'s AI Overviews, four structural patterns emerge: (1) Direct question-answer pairs - a heading that is a question, followed immediately by a direct answer in the first sentence. (2) Numbered or bulleted lists - AI models are trained on structured text and extract list-formatted information reliably. (3) Definition sentences - "X is..." or "X refers to..." gives AI a quotable anchor. (4) Short, declarative sentences under 20 words - long complex sentences lose information density when summarised.',
      },
      {
        heading: 'Schema markup is more important than ever',
        body: 'JSON-LD structured data doesn\'t just help traditional crawlers - it provides explicit machine-readable signals about your content\'s type, author, date, and topic. FAQPage schema is particularly powerful because it maps directly to the question-answer format that AI models prefer. HowTo schema works similarly for process content. If you\'re not implementing structured data on every significant page, you\'re leaving AEO signals on the table.',
      },
      {
        heading: 'A practical rewrite framework',
        body: 'Take your three most important pages and apply this test: can you extract a clean, accurate 2–3 sentence answer to the page\'s primary topic from the opening 150 words? If not, rewrite the opening. Add a Q&A section at the bottom of every service page and blog post. Break long paragraphs into numbered insights. Add FAQPage schema. Resubmit to Google Search Console. Within 6–8 weeks, monitor your Google Search Console for "AI Overview" appearances in the Search type filter.',
      },
    ],
  },
  {
    slug: 'four-layer-system-digital-infrastructure',
    title: 'The Four-Layer System: Building Digital Infrastructure That Compounds',
    excerpt: 'Most brands treat digital marketing as a set of disconnected tactics. The ones that scale treat it as infrastructure - four interdependent layers that multiply each other\'s output.',
    category: 'Strategy',
    readTime: 5,
    date: '2025-01-20',
    sections: [
      {
        body: 'After working across dozens of digital brands, I\'ve noticed a clear divide between businesses that plateau and businesses that compound. The ones that plateau treat digital marketing as a list of separate services - SEO here, automation there, a website refresh every three years. The ones that compound build a system where each layer strengthens the others.',
      },
      {
        heading: 'Layer 1 - Foundation: Technical SEO & Performance',
        body: 'Nothing else works well until the foundation is solid. Technical SEO is not a one-time audit - it\'s an ongoing architectural discipline. Your site needs to be fast (Core Web Vitals passing), crawlable (no JavaScript rendering issues), structured (canonical tags, sitemaps, schema), and secure (HTTPS, no mixed content). This layer sets the ceiling for everything above it. A well-funded content strategy on a slow, poorly structured site will underperform a modest content strategy on a clean, fast site.',
      },
      {
        heading: 'Layer 2 - Search Architecture: Content That Earns Visibility',
        body: 'Once the foundation is solid, search architecture is about building topical authority systematically. This means keyword clustering, content hierarchies, internal linking strategies, and - where appropriate - programmatic approaches to scaling coverage. The goal is not to rank for one keyword. It\'s to build a content graph that makes your domain the authoritative answer across a topic cluster. This compounds: each new page adds to the domain\'s topical authority, making future pages easier to rank.',
      },
      {
        heading: 'Layer 3 - Automation & Workflow: Intelligence in the System',
        body: 'Search brings visitors in. Automation makes the business scalable when they arrive. This layer includes lead capture and routing, CRM integration, email sequences, form handling, and increasingly - AI agents for qualification and follow-up. The businesses that win in competitive markets have automated the repetitive operational work so their team can focus on the decisions that require human judgment.',
      },
      {
        heading: 'Layer 4 - Interface & Content: The Surface People Experience',
        body: 'The interface is what converts. Not the architecture - the experience. This layer covers web design and development, content strategy, copywriting, and the AEO optimisation work that positions the brand for AI-era visibility. It\'s also the most visible layer - the one clients see and respond to first. But it only performs at its ceiling when the three layers beneath it are solid.',
      },
      {
        heading: 'Why the order matters',
        body: 'Building in a different order - interface first, automation second, SEO third, foundation never - is the most common and most expensive mistake I see. Beautiful websites that don\'t rank. Email sequences that no one receives because the CRM integration is broken. Content that earns traffic but loses it to poor UX. The system only compounds when the layers are built and maintained in sequence.',
      },
    ],
  },
];
