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
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/2dd0e939-9f6f-493d-ab08-b1f0d5b3e30b',
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
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/3caf6013-7e69-49da-9742-dde45db908c0',
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
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/fbffa491-76fa-45ac-a890-7efe10f38b67',
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
  {
    id: 'web-design-101',
    title: 'Web Design 101',
    subtitle: 'Build fast, clean sites that actually convert.',
    description: 'Most small business websites look fine but do nothing. This course teaches you how to design and build a site that loads fast, communicates clearly, and turns visitors into leads — without a designer or developer. You\'ll understand layout, typography, conversion principles, and how to get your site live without the guesswork.',
    price: '$97',
    originalPrice: '$197',
    priceNumber: 97,
    duration: '5 hours',
    level: 'Beginner',
    tag: 'Design',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-web-2025',
    pdfPath: '/course-pdfs/web-design-101.pdf',
    modules: [
      {
        title: 'Foundations of Web Design',
        lessons: [
          { title: 'What makes a website actually work', duration: '12 min' },
          { title: 'The 5 pages every business site needs', duration: '15 min' },
          { title: 'Choosing your platform: Webflow, Framer, or WordPress', duration: '20 min' },
          { title: 'Planning your site structure before you build', duration: '12 min' },
        ],
      },
      {
        title: 'Layout & Typography',
        lessons: [
          { title: 'How visual hierarchy guides attention', duration: '15 min' },
          { title: 'Grid systems and white space done right', duration: '12 min' },
          { title: 'Picking fonts that work (and pairing them)', duration: '10 min' },
          { title: 'Colour, contrast, and accessibility basics', duration: '12 min' },
          { title: 'Designing for mobile first', duration: '15 min' },
        ],
      },
      {
        title: 'Conversion-Focused Pages',
        lessons: [
          { title: 'The homepage formula that converts', duration: '20 min' },
          { title: 'Writing and designing your service pages', duration: '18 min' },
          { title: 'CTAs that get clicked', duration: '10 min' },
          { title: 'Building a contact page that generates enquiries', duration: '8 min' },
        ],
      },
      {
        title: 'Going Live',
        lessons: [
          { title: 'Domain setup and DNS in plain English', duration: '12 min' },
          { title: 'Speed optimisation before launch', duration: '15 min' },
          { title: 'Pre-launch checklist: 20 things to verify', duration: '15 min' },
          { title: 'Connecting Google Analytics and Search Console', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Understand what separates a converting site from a pretty one',
      'Design clean, professional layouts without a designer',
      'Write and structure pages that turn visitors into leads',
      'Launch a fast, accessible site with confidence',
      'Set up analytics to know what\'s working from day one',
    ],
    forWho: ['Founders building or rebuilding their own site', 'Freelancers who want to understand design principles', 'Small business owners tired of depending on agencies for every change', 'Anyone who has ever launched a site and wondered why it isn\'t converting'],
  },
  {
    id: 'email-series-converts',
    title: 'Email Series That Converts',
    subtitle: 'Write email sequences that move people from interested to buying.',
    description: 'A good email sequence is the closest thing to a sales team that runs without you. This course shows you how to map, write, and automate email flows — welcome sequences, nurture campaigns, and sales sequences — that build trust and drive revenue. Every framework is built from sequences that have worked for real service businesses.',
    price: '$97',
    originalPrice: '$197',
    priceNumber: 97,
    duration: '4 hours',
    level: 'Beginner - Intermediate',
    tag: 'Email',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-email-2025',
    pdfPath: '/course-pdfs/email-series-converts.pdf',
    modules: [
      {
        title: 'Strategy & Segmentation',
        lessons: [
          { title: 'Why most email sequences fail before they\'re written', duration: '12 min' },
          { title: 'Mapping your buyer journey to email flows', duration: '20 min' },
          { title: 'Segmentation: who gets which sequence and why', duration: '15 min' },
          { title: 'Choosing the right email platform for your stack', duration: '12 min' },
        ],
      },
      {
        title: 'Writing That Works',
        lessons: [
          { title: 'Subject lines that get opened (with examples)', duration: '15 min' },
          { title: 'The one-idea-per-email rule', duration: '10 min' },
          { title: 'Writing for skimmers without losing depth', duration: '12 min' },
          { title: 'CTAs that feel natural, not pushy', duration: '10 min' },
          { title: 'Welcome sequence: the 5-email framework', duration: '25 min' },
        ],
      },
      {
        title: 'Automation & Flows',
        lessons: [
          { title: 'Building a nurture sequence in ActiveCampaign or Klaviyo', duration: '25 min' },
          { title: 'Trigger-based emails vs. time-based sequences', duration: '15 min' },
          { title: 'Re-engagement flows for cold subscribers', duration: '12 min' },
          { title: 'Sales sequences: structure, timing, and follow-up', duration: '20 min' },
        ],
      },
      {
        title: 'Tracking & Optimising',
        lessons: [
          { title: 'The 4 metrics that actually matter', duration: '12 min' },
          { title: 'A/B testing subject lines and CTAs', duration: '15 min' },
          { title: 'Diagnosing a sequence that isn\'t converting', duration: '15 min' },
          { title: 'Quarterly email audit framework', duration: '10 min' },
        ],
      },
    ],
    outcomes: [
      'Map and write a complete welcome and nurture sequence',
      'Understand how to segment subscribers for relevance',
      'Build automated flows that run without touching them',
      'Write subject lines and body copy that get results',
      'Know exactly which metrics to track and what to do when numbers drop',
    ],
    forWho: ['Founders with a list but no real email strategy', 'Marketers who want to build sequences that convert', 'Service businesses wanting automated follow-up that doesn\'t feel robotic', 'Anyone who has written emails and wondered why no one clicks'],
  },
  {
    id: 'local-seo-masterclass',
    title: 'Local SEO Masterclass',
    subtitle: 'Get your business found in local search, maps, and AI results.',
    description: 'If you serve customers in a specific location, local search is your highest-leverage marketing channel. This course covers everything from Google Business Profile optimisation to citation building, review strategy, and tracking — so when someone searches for what you do in your area, you show up first.',
    price: '$147',
    originalPrice: '$297',
    priceNumber: 147,
    duration: '5 hours',
    level: 'Beginner - Intermediate',
    tag: 'SEO',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-local-2025',
    pdfPath: '/course-pdfs/local-seo-masterclass.pdf',
    modules: [
      {
        title: 'Local Search Foundations',
        lessons: [
          { title: 'How Google decides local rankings', duration: '15 min' },
          { title: 'The three local ranking factors: relevance, distance, prominence', duration: '12 min' },
          { title: 'Local pack vs. organic vs. AI results: how to win each', duration: '18 min' },
          { title: 'Setting up your local SEO baseline audit', duration: '20 min' },
        ],
      },
      {
        title: 'Google Business Profile',
        lessons: [
          { title: 'Claiming and verifying your profile', duration: '12 min' },
          { title: 'Optimising every section of your GBP', duration: '25 min' },
          { title: 'Google Posts: what to publish and how often', duration: '12 min' },
          { title: 'Q&A, services, and products sections', duration: '12 min' },
          { title: 'GBP photo strategy that builds trust', duration: '10 min' },
        ],
      },
      {
        title: 'Citations & Reviews',
        lessons: [
          { title: 'What citations are and why they matter', duration: '12 min' },
          { title: 'The top citation sources for your industry', duration: '15 min' },
          { title: 'NAP consistency: getting your details right everywhere', duration: '10 min' },
          { title: 'Building a review generation system', duration: '20 min' },
          { title: 'Responding to reviews: good, bad, and ugly', duration: '12 min' },
        ],
      },
      {
        title: 'Ranking & Reporting',
        lessons: [
          { title: 'Local keyword research: finding what people actually search', duration: '18 min' },
          { title: 'On-page optimisation for local intent', duration: '15 min' },
          { title: 'Tracking local rankings with free tools', duration: '12 min' },
          { title: 'Monthly local SEO reporting: what to measure', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Fully optimise your Google Business Profile',
      'Build a consistent citation footprint across key directories',
      'Create a review generation system that runs on autopilot',
      'Rank in the local pack for your most valuable search terms',
      'Track and report on local SEO performance month over month',
    ],
    forWho: ['Local service businesses that rely on nearby customers', 'Trades, clinics, agencies, and retailers in competitive local markets', 'Marketers managing local SEO for clients', 'Franchises or multi-location businesses wanting consistent visibility'],
  },
  {
    id: 'ai-automation-small-biz',
    title: 'AI Automation for Small Business',
    subtitle: 'Automate the repetitive work so you can focus on what only you can do.',
    description: 'AI tools are not just for big companies. This course shows small business owners and solo operators how to identify what\'s worth automating, build practical AI-powered flows, and deploy chatbots and assistants that actually help clients — without needing a technical background. Real tools, real examples, real results.',
    price: '$197',
    originalPrice: '$397',
    priceNumber: 197,
    duration: '6 hours',
    level: 'Beginner - Intermediate',
    tag: 'AI',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-aiauto-2025',
    pdfPath: '/course-pdfs/ai-automation-small-biz.pdf',
    modules: [
      {
        title: 'What to Automate',
        lessons: [
          { title: 'The automation opportunity map for small businesses', duration: '15 min' },
          { title: 'Tasks worth automating vs. tasks that need a human', duration: '12 min' },
          { title: 'AI tools landscape: what does what', duration: '20 min' },
          { title: 'Building your automation roadmap', duration: '15 min' },
        ],
      },
      {
        title: 'Building Your First Flow',
        lessons: [
          { title: 'Connecting AI to your existing tools with Make or n8n', duration: '25 min' },
          { title: 'AI-powered lead qualification flow', duration: '25 min' },
          { title: 'Automated content repurposing pipeline', duration: '20 min' },
          { title: 'Document processing and data extraction with AI', duration: '20 min' },
          { title: 'Testing and error-handling AI flows', duration: '15 min' },
        ],
      },
      {
        title: 'AI Assistants & Chatbots',
        lessons: [
          { title: 'When a chatbot makes sense (and when it doesn\'t)', duration: '12 min' },
          { title: 'Building a website chatbot with Voiceflow or Botpress', duration: '25 min' },
          { title: 'Training your bot on your own content', duration: '20 min' },
          { title: 'Handoff: when AI passes to a human', duration: '12 min' },
        ],
      },
      {
        title: 'Scaling Without Hiring',
        lessons: [
          { title: 'The systems stack for a lean operation', duration: '18 min' },
          { title: 'Monitoring your automations so they don\'t break silently', duration: '12 min' },
          { title: 'What to outsource vs. automate vs. do yourself', duration: '15 min' },
          { title: 'Building an AI-first operations playbook', duration: '20 min' },
        ],
      },
    ],
    outcomes: [
      'Identify the highest-value automation opportunities in your business',
      'Build AI-powered workflows using Make, n8n, and LLM APIs',
      'Deploy a working chatbot trained on your own content',
      'Create a lean systems stack that scales without headcount',
      'Monitor and maintain your automations so they stay reliable',
    ],
    forWho: ['Solo operators and small business owners with too much on their plate', 'Founders who want to scale without hiring', 'Operations managers looking to introduce AI practically', 'Service businesses with repetitive client-facing processes'],
  },
  {
    id: 'content-strategy-blueprint',
    title: 'Content Strategy Blueprint',
    subtitle: 'Build a content system you can actually sustain — not a one-off burst.',
    description: 'Most businesses publish content in bursts and then stop. This course gives you a repeatable system: how to position your content, what to create and why, how to produce it efficiently, and how to get maximum value from every piece through smart distribution and repurposing. Built for teams of one.',
    price: '$127',
    originalPrice: '$247',
    priceNumber: 127,
    duration: '4.5 hours',
    level: 'Beginner - Intermediate',
    tag: 'Content',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-content-2025',
    pdfPath: '/course-pdfs/content-strategy-blueprint.pdf',
    modules: [
      {
        title: 'Audience & Positioning',
        lessons: [
          { title: 'Who you\'re writing for and why that changes everything', duration: '15 min' },
          { title: 'Positioning your content in a crowded market', duration: '18 min' },
          { title: 'The content topics that actually drive business', duration: '15 min' },
          { title: 'Competitor content gap analysis', duration: '20 min' },
        ],
      },
      {
        title: 'Content Architecture',
        lessons: [
          { title: 'Pillar content and cluster strategy explained', duration: '20 min' },
          { title: 'Building a content calendar that isn\'t a fantasy', duration: '15 min' },
          { title: 'Format decisions: long-form, short-form, video, newsletter', duration: '15 min' },
          { title: 'The 3-tier content model for service businesses', duration: '12 min' },
        ],
      },
      {
        title: 'Production Systems',
        lessons: [
          { title: 'Batching and time-blocking for consistent output', duration: '12 min' },
          { title: 'Using AI to speed up drafts without losing your voice', duration: '20 min' },
          { title: 'Brief templates that cut editing time in half', duration: '12 min' },
          { title: 'Working with freelancers and editors', duration: '12 min' },
          { title: 'Quality control checklist before publishing', duration: '8 min' },
        ],
      },
      {
        title: 'Distribution & Repurposing',
        lessons: [
          { title: 'Where to publish and in what order', duration: '12 min' },
          { title: 'Repurposing one piece into six formats', duration: '20 min' },
          { title: 'Email, social, and SEO: making content work across channels', duration: '15 min' },
          { title: 'Measuring content performance without drowning in data', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Define a clear content positioning that makes your work stand out',
      'Build a pillar and cluster architecture for your topic area',
      'Set up a production system that\'s actually sustainable',
      'Repurpose each piece of content into multiple formats without extra effort',
      'Measure what matters and drop what doesn\'t',
    ],
    forWho: ['Founders who want to publish consistently but keep stopping', 'Marketing managers building a content function from scratch', 'Freelancers and consultants building authority through content', 'Anyone who has a content strategy document but no working system'],
  },
  {
    id: 'crm-workflow-automation',
    title: 'CRM Setup & Workflow Automation',
    subtitle: 'Connect your tools so leads never fall through the cracks again.',
    description: 'A CRM that isn\'t connected to the rest of your business is just an expensive spreadsheet. This course walks through choosing, configuring, and automating your CRM so that leads are captured, followed up on, and moved through your pipeline — without manual effort. Built around HubSpot and ActiveCampaign, with transferable principles for any platform.',
    price: '$147',
    originalPrice: '$297',
    priceNumber: 147,
    duration: '5 hours',
    level: 'Beginner - Intermediate',
    tag: 'CRM',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-crm-2025',
    pdfPath: '/course-pdfs/crm-workflow-automation.pdf',
    modules: [
      {
        title: 'CRM Foundations',
        lessons: [
          { title: 'What a CRM actually does (and what it doesn\'t)', duration: '12 min' },
          { title: 'Choosing the right CRM for your business stage', duration: '18 min' },
          { title: 'Setting up your contact properties and custom fields', duration: '20 min' },
          { title: 'Data hygiene: getting clean data in from day one', duration: '12 min' },
        ],
      },
      {
        title: 'Pipeline Design',
        lessons: [
          { title: 'Mapping your sales process to pipeline stages', duration: '20 min' },
          { title: 'Deal stages, probability, and forecasting', duration: '15 min' },
          { title: 'Building a lead scoring model', duration: '18 min' },
          { title: 'Views and filters that surface the right deals', duration: '12 min' },
          { title: 'Team visibility: who sees what and when', duration: '10 min' },
        ],
      },
      {
        title: 'Automating Follow-Up',
        lessons: [
          { title: 'Trigger-based sequences: the building block of CRM automation', duration: '15 min' },
          { title: 'New lead → assigned → follow-up: the core flow', duration: '25 min' },
          { title: 'Task automation: never miss a follow-up again', duration: '15 min' },
          { title: 'Proposal sent → chase sequence: building it step by step', duration: '20 min' },
        ],
      },
      {
        title: 'Integrations & Reporting',
        lessons: [
          { title: 'Connecting your CRM to your form, email, and calendar', duration: '20 min' },
          { title: 'Bi-directional sync with email marketing tools', duration: '15 min' },
          { title: 'The 5 CRM reports every sales-focused business needs', duration: '15 min' },
          { title: 'Monthly CRM audit: keeping your pipeline accurate', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Choose and configure a CRM that fits your business and sales process',
      'Design a pipeline that reflects how you actually sell',
      'Build automated follow-up sequences that run without reminders',
      'Connect your CRM to the rest of your tool stack',
      'Report on pipeline health and forecast revenue with confidence',
    ],
    forWho: ['Founders who have tried a CRM but never got it working properly', 'Sales-led service businesses with a follow-up problem', 'Ops managers standardising how leads are handled', 'Teams moving off spreadsheets into a proper CRM for the first time'],
  },
  {
    id: 'cro-fundamentals',
    title: 'Conversion Rate Optimisation',
    subtitle: 'Turn more of the traffic you already have into leads and sales.',
    description: 'Most businesses chase more traffic when the bigger win is converting what\'s already arriving. This course teaches you how to read user behaviour data, identify where people drop off, make structured changes to pages, and run tests that give you real answers — not guesses. Built for service businesses and consultancies, not e-commerce.',
    price: '$127',
    originalPrice: '$247',
    priceNumber: 127,
    duration: '4.5 hours',
    level: 'Intermediate',
    tag: 'CRO',
    checkoutUrl: 'https://organic-theory.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
    accessKey: 'ot-cro-2025',
    pdfPath: '/course-pdfs/cro-fundamentals.pdf',
    modules: [
      {
        title: 'Understanding User Behaviour',
        lessons: [
          { title: 'What CRO actually is (and the myths that waste your time)', duration: '12 min' },
          { title: 'Reading heatmaps and session recordings correctly', duration: '20 min' },
          { title: 'Google Analytics 4: the CRO reports that matter', duration: '18 min' },
          { title: 'User surveys and feedback: asking the right questions', duration: '15 min' },
          { title: 'Building your CRO evidence brief', duration: '12 min' },
        ],
      },
      {
        title: 'Page Anatomy',
        lessons: [
          { title: 'The above-the-fold formula for service businesses', duration: '20 min' },
          { title: 'Trust signals: what works and what looks cheap', duration: '15 min' },
          { title: 'CTA design and copy that converts', duration: '15 min' },
          { title: 'Form optimisation: fewer fields, more submissions', duration: '12 min' },
        ],
      },
      {
        title: 'Testing & Iteration',
        lessons: [
          { title: 'A/B testing basics: what you need to run a valid test', duration: '18 min' },
          { title: 'Statistical significance in plain English', duration: '12 min' },
          { title: 'Running tests without enough traffic', duration: '15 min' },
          { title: 'Documenting and sharing test results', duration: '10 min' },
          { title: 'Building a testing roadmap', duration: '12 min' },
        ],
      },
      {
        title: 'CRO for Service Businesses',
        lessons: [
          { title: 'Optimising your contact and enquiry page', duration: '18 min' },
          { title: 'Pricing page psychology and structure', duration: '20 min' },
          { title: 'Case study pages that close the deal', duration: '15 min' },
          { title: 'CRO maintenance: the quarterly review process', duration: '12 min' },
        ],
      },
    ],
    outcomes: [
      'Read heatmaps, session recordings, and analytics to find real friction points',
      'Diagnose why pages aren\'t converting and prioritise fixes',
      'Run structured A/B tests and interpret results correctly',
      'Apply CRO principles to service pages, contact forms, and pricing pages',
      'Build a repeatable testing process you can run every quarter',
    ],
    forWho: ['Founders who have traffic but not enough enquiries', 'Marketers responsible for conversion performance', 'Agencies wanting to add CRO to their service offering', 'Anyone who has changed a page based on a hunch and wants a better approach'],
  },
];
