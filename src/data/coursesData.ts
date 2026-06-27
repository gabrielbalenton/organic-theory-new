export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice: string;
  priceNumber: number;
  duration: string;
  level: string;
  tag: string;
  checkoutUrl: string;
  accessKey: string;
  pdfPath: string;
  modules: { title: string; lessons: { title: string; videoUrl?: string; duration?: string }[] }[];
  outcomes: string[];
  forWho: string[];
}

export const courses: Course[] = [
  {
    id: 'technical-seo-founders',
    title: 'Technical SEO for Founders',
    subtitle: 'Fix the 10 issues killing your rankings - without hiring an agency.',
    description: 'Most founders know their site isn\'t ranking. Most don\'t know why. This course teaches you exactly how to read your own technical data, identify the issues that matter, and either fix them yourself or brief a developer without wasting money. Built from 40+ real audits.',
    price: '$49',
    originalPrice: '$149',
    priceNumber: 49,
    duration: '4 hours',
    level: 'Beginner - Intermediate',
    tag: 'SEO',
    checkoutUrl: 'https://organictheory.lemonsqueezy.com/checkout/buy/25beaf73-6835-4b44-8b8c-4bd31c86bee6',
    accessKey: 'ot-seo-2025',
    pdfPath: '/course-pdfs/technical-seo-founders.pdf',
    modules: [
      {
        title: 'Reading the Data',
        lessons: [
          { title: 'How Google crawls your site', duration: '12 min' },
          { title: 'Google Search Console: the 5 reports that matter', duration: '18 min' },
          { title: 'Core Web Vitals explained simply', duration: '14 min' },
          { title: 'Screaming Frog: a non-technical walkthrough', duration: '22 min' },
        ],
      },
      {
        title: 'The 10 Critical Issues',
        lessons: [
          { title: 'Canonical tag errors', duration: '10 min' },
          { title: 'JavaScript rendering problems', duration: '15 min' },
          { title: 'Slow LCP - what\'s causing it', duration: '13 min' },
          { title: 'Broken internal links', duration: '8 min' },
          { title: 'Missing or duplicate meta tags', duration: '11 min' },
          { title: 'H1 structure mistakes', duration: '9 min' },
          { title: 'Image issues killing performance', duration: '12 min' },
          { title: 'Crawl budget waste', duration: '10 min' },
          { title: 'HTTPS and mixed content', duration: '8 min' },
          { title: 'Sitemap and robots.txt errors', duration: '11 min' },
        ],
      },
      {
        title: 'Fixing It',
        lessons: [
          { title: 'What you can fix yourself vs. brief to a dev', duration: '16 min' },
          { title: 'The developer brief template', duration: '12 min' },
          { title: 'How to verify fixes using Search Console', duration: '14 min' },
          { title: '30-day action plan framework', duration: '18 min' },
        ],
      },
      {
        title: 'Maintaining It',
        lessons: [
          { title: 'Setting up monthly monitoring', duration: '13 min' },
          { title: 'Automated alerts with Search Console', duration: '10 min' },
          { title: 'The 10-minute weekly SEO check', duration: '10 min' },
        ],
      },
    ],
    outcomes: [
      'Read and interpret your Google Search Console data confidently',
      'Identify the exact technical issues holding your site back',
      'Fix the issues you can fix yourself - today',
      'Brief a developer precisely for the rest',
      'Build a monitoring system so problems don\'t compound',
    ],
    forWho: ['Founders running their own website', 'Marketing managers without technical SEO training', 'Small business owners tired of paying for audits that go nowhere', 'Anyone who wants to understand what their agency is actually doing'],
  },
  {
    id: 'automation-stack',
    title: 'The Automation Stack',
    subtitle: 'Build your first production-ready workflow from scratch - no code required.',
    description: 'Manual data entry, copy-paste between tools, missed follow-ups. This course kills all three. You\'ll build four real workflows using Make and n8n - from lead capture to CRM to email sequence - and leave with a system that runs while you sleep. Every lesson uses real client examples.',
    price: '$67',
    originalPrice: '$197',
    priceNumber: 67,
    duration: '5 hours',
    level: 'Beginner',
    tag: 'Automation',
    checkoutUrl: 'https://organictheory.lemonsqueezy.com/checkout/buy/976a89a7-9949-43df-885b-b4d36d9ba2a4',
    accessKey: 'ot-auto-2025',
    pdfPath: '/course-pdfs/automation-stack.pdf',
    modules: [
      {
        title: 'Automation Fundamentals',
        lessons: [
          { title: 'How automation platforms work', duration: '14 min' },
          { title: 'Make vs. n8n vs. Zapier - which to use', duration: '16 min' },
          { title: 'Triggers, actions, and conditions', duration: '18 min' },
          { title: 'Reading an automation flow diagram', duration: '12 min' },
        ],
      },
      {
        title: 'Your First Four Workflows',
        lessons: [
          { title: 'Workflow 1: Form → CRM (HubSpot/ActiveCampaign)', duration: '28 min' },
          { title: 'Workflow 2: New lead → Slack notification + email', duration: '22 min' },
          { title: 'Workflow 3: CRM status change → automated follow-up sequence', duration: '30 min' },
          { title: 'Workflow 4: Google Sheets data sync', duration: '20 min' },
        ],
      },
      {
        title: 'Branching Logic',
        lessons: [
          { title: 'If/else conditions: routing based on data', duration: '20 min' },
          { title: 'Handling new vs. existing contacts', duration: '15 min' },
          { title: 'Error paths and fallback handling', duration: '18 min' },
          { title: 'Testing every branch before going live', duration: '16 min' },
        ],
      },
      {
        title: 'Production-Ready Builds',
        lessons: [
          { title: 'Error monitoring and alerts', duration: '14 min' },
          { title: 'Documentation for your team', duration: '12 min' },
          { title: 'When to hire vs. when to build yourself', duration: '16 min' },
          { title: 'Scaling your stack as you grow', duration: '18 min' },
        ],
      },
    ],
    outcomes: [
      'Build four working automations from scratch',
      'Connect your form, CRM, email, and Slack without code',
      'Understand branching logic for handling different contact types',
      'Deploy confidently with testing and error handling in place',
      'Know exactly when to build and when to hire',
    ],
    forWho: ['Founders spending hours on repetitive admin', 'Ops managers wanting to reduce manual handoffs', 'Marketers who want CRM and email working together automatically', 'Anyone who has thought "there must be a better way" about their workflow'],
  },
  {
    id: 'aeo-masterclass',
    title: 'AEO Masterclass',
    subtitle: 'Write content that gets cited by ChatGPT, Perplexity, and Google\'s AI Overviews.',
    description: 'SEO optimized for blue links. AEO optimizes for AI citations. This course shows you exactly how answer engines extract content, what structural patterns they prefer, and how to rewrite your existing pages to earn citations in AI-generated answers. The brands that figure this out now will dominate their categories in three years.',
    price: '$79',
    originalPrice: '$247',
    priceNumber: 79,
    duration: '4.5 hours',
    level: 'Intermediate',
    tag: 'AEO',
    checkoutUrl: 'https://organictheory.lemonsqueezy.com/checkout/buy/07dbe795-2778-4bb3-a532-e834a7799962',
    accessKey: 'ot-aeo-2025',
    pdfPath: '/course-pdfs/aeo-masterclass.pdf',
    modules: [
      {
        title: 'How AI Reads the Web',
        lessons: [
          { title: 'How ChatGPT, Perplexity, and Google AI Overviews work', duration: '16 min' },
          { title: 'Why traditional SEO isn\'t enough', duration: '12 min' },
          { title: 'The citation signal: what makes AI choose your content', duration: '18 min' },
          { title: 'AEO vs. SEO: complementary, not competing', duration: '14 min' },
        ],
      },
      {
        title: 'Content Structure for AI',
        lessons: [
          { title: 'The four structural patterns AI models prefer', duration: '20 min' },
          { title: 'Question-answer pairs that get extracted', duration: '16 min' },
          { title: 'How to write definition sentences', duration: '14 min' },
          { title: 'Bullet and list formatting that AI parses cleanly', duration: '12 min' },
          { title: 'Sentence length and density guidelines', duration: '10 min' },
        ],
      },
      {
        title: 'Schema Markup for AEO',
        lessons: [
          { title: 'Why structured data matters more than ever', duration: '15 min' },
          { title: 'FAQPage schema: implementation and impact', duration: '20 min' },
          { title: 'HowTo schema for process content', duration: '18 min' },
          { title: 'Article and Author schema for authority signals', duration: '14 min' },
          { title: 'Testing and validating with Google\'s Rich Results Test', duration: '12 min' },
        ],
      },
      {
        title: 'Rewriting Your Existing Content',
        lessons: [
          { title: 'The AEO content audit framework', duration: '18 min' },
          { title: 'Rewriting service pages for AI citation', duration: '22 min' },
          { title: 'Building FAQ sections that rank and get cited', duration: '16 min' },
          { title: 'Measuring AEO performance in Search Console', duration: '14 min' },
          { title: 'The 6-week monitoring checklist', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Understand exactly how AI answer engines select and cite content',
      'Rewrite your existing pages for AI citation - without harming SEO',
      'Implement FAQPage and HowTo schema correctly',
      'Build a monitoring system to track AI Overview appearances',
      'Create a content template your team can use on every future page',
    ],
    forWho: ['Content managers wanting to future-proof their strategy', 'SEO professionals adding AEO to their skillset', 'Founders who create their own content and want it to rank everywhere', 'Marketing teams at brands in competitive search categories'],
  },
];
