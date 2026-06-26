export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  tag: string;
  modules: { title: string; lessons: string[] }[];
  outcomes: string[];
  forWho: string[];
}

export const courses: Course[] = [
  {
    id: 'technical-seo-founders',
    title: 'Technical SEO for Founders',
    subtitle: 'Fix the 10 issues killing your rankings — without hiring an agency.',
    description: 'Most founders know their site isn\'t ranking. Most don\'t know why. This course teaches you exactly how to read your own technical data, identify the issues that matter, and either fix them yourself or brief a developer without wasting money. Built from 40+ real audits.',
    price: '$197',
    duration: '4 hours',
    level: 'Beginner — Intermediate',
    tag: 'SEO',
    modules: [
      {
        title: 'Reading the Data',
        lessons: ['How Google crawls your site', 'Google Search Console: the 5 reports that matter', 'Core Web Vitals explained simply', 'Screaming Frog: a non-technical walkthrough'],
      },
      {
        title: 'The 10 Critical Issues',
        lessons: ['Canonical tag errors', 'JavaScript rendering problems', 'Slow LCP — what\'s causing it', 'Broken internal links', 'Missing or duplicate meta tags', 'H1 structure mistakes', 'Image issues killing performance', 'Crawl budget waste', 'HTTPS and mixed content', 'Sitemap and robots.txt errors'],
      },
      {
        title: 'Fixing It',
        lessons: ['What you can fix yourself vs. brief to a dev', 'The developer brief template', 'How to verify fixes using Search Console', '30-day action plan framework'],
      },
      {
        title: 'Maintaining It',
        lessons: ['Setting up monthly monitoring', 'Automated alerts with Search Console', 'The 10-minute weekly SEO check'],
      },
    ],
    outcomes: [
      'Read and interpret your Google Search Console data confidently',
      'Identify the exact technical issues holding your site back',
      'Fix the issues you can fix yourself — today',
      'Brief a developer precisely for the rest',
      'Build a monitoring system so problems don\'t compound',
    ],
    forWho: ['Founders running their own website', 'Marketing managers without technical SEO training', 'Small business owners tired of paying for audits that go nowhere', 'Anyone who wants to understand what their agency is actually doing'],
  },
  {
    id: 'automation-stack',
    title: 'The Automation Stack',
    subtitle: 'Build your first production-ready workflow from scratch — no code required.',
    description: 'Manual data entry, copy-paste between tools, missed follow-ups. This course kills all three. You\'ll build four real workflows using Make and n8n — from lead capture to CRM to email sequence — and leave with a system that runs while you sleep. Every lesson uses real client examples.',
    price: '$247',
    duration: '5 hours',
    level: 'Beginner',
    tag: 'Automation',
    modules: [
      {
        title: 'Automation Fundamentals',
        lessons: ['How automation platforms work', 'Make vs. n8n vs. Zapier — which to use', 'Triggers, actions, and conditions', 'Reading an automation flow diagram'],
      },
      {
        title: 'Your First Four Workflows',
        lessons: ['Workflow 1: Form → CRM (HubSpot/ActiveCampaign)', 'Workflow 2: New lead → Slack notification + email', 'Workflow 3: CRM status change → automated follow-up sequence', 'Workflow 4: Google Sheets data sync'],
      },
      {
        title: 'Branching Logic',
        lessons: ['If/else conditions: routing based on data', 'Handling new vs. existing contacts', 'Error paths and fallback handling', 'Testing every branch before going live'],
      },
      {
        title: 'Production-Ready Builds',
        lessons: ['Error monitoring and alerts', 'Documentation for your team', 'When to hire vs. when to build yourself', 'Scaling your stack as you grow'],
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
    description: 'SEO optimised for blue links. AEO optimises for AI citations. This course shows you exactly how answer engines extract content, what structural patterns they prefer, and how to rewrite your existing pages to earn citations in AI-generated answers. The brands that figure this out now will dominate their categories in three years.',
    price: '$297',
    duration: '4.5 hours',
    level: 'Intermediate',
    tag: 'AEO',
    modules: [
      {
        title: 'How AI Reads the Web',
        lessons: ['How ChatGPT, Perplexity, and Google AI Overviews work', 'Why traditional SEO isn\'t enough', 'The citation signal: what makes AI choose your content', 'AEO vs. SEO: complementary, not competing'],
      },
      {
        title: 'Content Structure for AI',
        lessons: ['The four structural patterns AI models prefer', 'Question-answer pairs that get extracted', 'How to write definition sentences', 'Bullet and list formatting that AI parses cleanly', 'Sentence length and density guidelines'],
      },
      {
        title: 'Schema Markup for AEO',
        lessons: ['Why structured data matters more than ever', 'FAQPage schema: implementation and impact', 'HowTo schema for process content', 'Article and Author schema for authority signals', 'Testing and validating with Google\'s Rich Results Test'],
      },
      {
        title: 'Rewriting Your Existing Content',
        lessons: ['The AEO content audit framework', 'Rewriting service pages for AI citation', 'Building FAQ sections that rank and get cited', 'Measuring AEO performance in Search Console', 'The 6-week monitoring checklist'],
      },
    ],
    outcomes: [
      'Understand exactly how AI answer engines select and cite content',
      'Rewrite your existing pages for AI citation — without harming SEO',
      'Implement FAQPage and HowTo schema correctly',
      'Build a monitoring system to track AI Overview appearances',
      'Create a content template your team can use on every future page',
    ],
    forWho: ['Content managers wanting to future-proof their strategy', 'SEO professionals adding AEO to their skillset', 'Founders who create their own content and want it to rank everywhere', 'Marketing teams at brands in competitive search categories'],
  },
];
