export interface PitchPoint {
  heading: string;
  detail: string;
}

export type PreviewConfig =
  | {
      type: 'website';
      url: string;
      navItems: string[];
      eyebrow: string;
      headline: string;
      subhead: string;
      ctaLabel: string;
      accent: string;
      imageUrl: string;
    }
  | {
      type: 'email';
      fromName: string;
      subject: string;
      preheader: string;
      bannerText: string;
      bodyBlocks: { heading: string; body: string }[];
      ctaLabel: string;
      accent: string;
      imageUrl: string;
    }
  | {
      type: 'dashboard';
      title: string;
      stats: { label: string; value: string; delta?: string }[];
      bars: number[];
      accent: string;
      imageUrl: string;
    }
  | {
      type: 'seo';
      searchQuery: string;
      results: { url: string; title: string; meta: string; highlighted?: boolean }[];
      accent: string;
      imageUrl: string;
    };

export interface PitchData {
  slug: string;
  clientName: string;
  problem: string;
  points: [PitchPoint, PitchPoint];
  ctaLabel: string;
  ctaTo: string;
  preview?: PreviewConfig;
  /** OnlineJobs.ph job post URL this pitch was built from. Used by the daily
   * collector to skip leads that already have a pitch page. */
  sourceJobUrl?: string;
}

export const pitches: PitchData[] = [
  {
    slug: 'test-client',
    clientName: 'Test Client',
    problem:
      'Your site ranks for your brand name and nothing else. Competitors with worse products are outranking you for every commercial keyword that actually drives revenue.',
    points: [
      {
        heading: 'Your technical foundation is leaking rankings',
        detail:
          'A quick scan shows render-blocking scripts and missing canonical tags across your core pages - the kind of technical debt that caps your Lighthouse SEO score before content even matters.',
      },
      {
        heading: 'You\'re invisible where your buyers are searching',
        detail:
          'No structured data, no AEO coverage. AI answer engines and rich results are skipping your pages in favour of competitors who\'ve done the technical work.',
      },
    ],
    ctaLabel: 'Book the $400 Audit',
    ctaTo: '/contact',
  },
  {
    slug: 'aba-therapy-growth',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/growth-marketing-manager-pediatric-healthcare-aba-therapy-1685468',
    clientName: 'The ABA Therapy Practice (CA)',
    problem:
      "You're trying to fill a Fall Social Skills Group and building a 90-day growth system from scratch - Wix SEO, Google Business Profile, landing pages, email nurture, and ad campaigns - all riding on one new hire.",
    points: [
      {
        heading: 'The 90-day system you\'re hiring for already exists',
        detail:
          'Local SEO, Google Business Profile optimization, and conversion-focused landing pages is exactly what I build as a packaged engagement - no ramp-up time, no training a new hire on your positioning.',
      },
      {
        heading: 'Email and content run in parallel, not sequentially',
        detail:
          'I stand up the parent-education email flow and content calendar alongside the SEO work instead of waiting for one hire to get through both.',
      },
    ],
    ctaLabel: 'Skip the Hiring Cycle - Book a Call',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'yourpractice.com/social-skills-group',
      navItems: ['Programs', 'About', 'Locations', 'Contact'],
      eyebrow: 'FALL SOCIAL SKILLS GROUP',
      headline: 'Help Your Child Build Confidence & Connection',
      subhead: 'Individualized ABA therapy and social skills groups for children — now enrolling for Fall.',
      ctaLabel: 'Reserve a Spot',
      accent: '#3B82A6',
      imageUrl: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'holistify-wordpress',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/senior-wordpress-web-developer-1684690',
    clientName: 'The Pet Wellness Brand',
    problem:
      "You're hiring a senior WordPress/Elementor developer to turn your site into an authority - but you're managing two properties, a service brand and a media brand, and vetting portfolios instead of shipping pages.",
    points: [
      {
        heading: 'Elementor builds and technical SEO in one pass',
        detail:
          'I build and optimize WordPress/Elementor sites for speed and search from day one, so you\'re not paying to discover plugin conflicts after launch.',
      },
      {
        heading: 'One team across both properties',
        detail:
          'A consistent design system and SEO implementation across your service site and media brand, without coordinating two separate hires.',
      },
    ],
    ctaLabel: 'See How I\'d Build It',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'holistify.com',
      navItems: ['Shop', 'Learn', 'About', 'Vets'],
      eyebrow: 'PET WELLNESS, SIMPLIFIED',
      headline: 'Science-Backed Care for a Longer, Healthier Life',
      subhead: 'Trusted guides, vet-reviewed products, and a wellness plan built around your pet.',
      ctaLabel: 'Explore Wellness Plans',
      accent: '#5B8C5A',
      imageUrl: 'https://images.unsplash.com/photo-1760791510936-eef13da5018b?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'nw-marketing-solutions',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/graphic-designer-marketer-1685038',
    clientName: 'NW Marketing Solutions',
    problem:
      "You're building an in-house marketing team to run paid ads, email, landing pages, and lead funnels across multiple real estate brands at once - a lot to load onto a single new hire.",
    points: [
      {
        heading: 'Landing pages and funnels that plug into your ad spend',
        detail:
          'I build the conversion layer - landing pages, lead funnels, email sequences - so your ad spend has somewhere effective to send traffic, without a hire ramping up on your brand voice first.',
      },
      {
        heading: 'SEO and content systems running in the background',
        detail:
          'While your team focuses on paid and social, I handle the organic side - local SEO, Google Business Profile, structured content - so growth doesn\'t depend on ad spend alone.',
      },
    ],
    ctaLabel: 'Talk Through Your Funnel',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'nwhometeam.com/listings',
      navItems: ['Listings', 'Buyers', 'Sellers', 'Team'],
      eyebrow: 'FEATURED LISTING',
      headline: 'Find Your Next Home in the South Puget Sound',
      subhead: 'Local expertise, real results — see why buyers and sellers trust the Northwest Home Team.',
      ctaLabel: 'Book a Free Consultation',
      accent: '#1F3A5F',
      imageUrl: 'https://images.unsplash.com/photo-1572771669538-f302ed3752fc?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'ecommerce-email-designer',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/email-marketing-designer-figma-photoshop-ecommerce-remote-1684629',
    clientName: 'The Growing eCommerce Team',
    problem:
      "You're hiring a dedicated Email Marketing Designer to build high-converting Klaviyo/Omnisend campaigns for multiple eCommerce brands - a specialized, ongoing design need.",
    points: [
      {
        heading: 'Email campaigns designed and deployed as a service',
        detail:
          'I design and build mobile-responsive, on-brand email campaigns for eCommerce brands without you needing to manage a dedicated in-house designer\'s workload.',
      },
      {
        heading: 'CRO principles baked into every send',
        detail:
          'Every campaign is built with conversion and A/B testing in mind from the first draft, not bolted on after the fact.',
      },
    ],
    ctaLabel: 'Show Me a Sample Campaign',
    ctaTo: '/contact',
    preview: {
      type: 'email',
      fromName: 'Your eCommerce Brand',
      subject: '✨ New Arrivals Are Here — Shop Before They Sell Out',
      preheader: 'Limited stock. Free shipping over $50.',
      bannerText: 'THE NEW COLLECTION HAS LANDED',
      bodyBlocks: [
        { heading: 'Handpicked for you', body: 'Curated based on what\'s trending this week.' },
        { heading: 'Free shipping over $50', body: 'No code needed — it\'s automatically applied at checkout.' },
      ],
      ctaLabel: 'Shop Now',
      accent: '#6C5CE7',
      imageUrl: 'https://images.unsplash.com/photo-1609840112990-4265448268d1?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'bk-express',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/web-designer-website-develope-1685316',
    clientName: 'B&K Express',
    problem:
      "You're modernizing your online presence and building digital tools for a growing logistics operation, and looking for one web designer to own the whole build.",
    points: [
      {
        heading: 'A professional, high-performing site built and maintained as a service',
        detail:
          'I design, build, and maintain the site - landing pages for your transport services, mobile performance, basic SEO - the exact scope in your listing, without a single hire\'s bandwidth as the bottleneck.',
      },
      {
        heading: 'Ongoing improvements without re-hiring',
        detail:
          'Website maintenance and iteration continue after launch as part of the engagement, rather than ending when a contractor\'s project scope runs out.',
      },
    ],
    ctaLabel: 'Get a Site Assessment',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'bkexpress.com.au',
      navItems: ['Services', 'Track', 'About', 'Contact'],
      eyebrow: 'MELBOURNE CONTAINER TRANSPORT',
      headline: 'Reliable Container Transport, On Time, Every Time',
      subhead: 'Wharf cartage, warehousing, and logistics solutions for Melbourne businesses.',
      ctaLabel: 'Get a Quote',
      accent: '#3B5266',
      imageUrl: 'https://images.unsplash.com/photo-1773126378915-793b5c48fb38?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'alphax-re-capital',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/content-creation-copywriter-1685335',
    clientName: 'AlphaX RE Capital',
    problem:
      "You're hiring a content and copywriting VA to run social, email, and campaign copy across your real estate portfolio - a broad content operation for one hire to carry.",
    points: [
      {
        heading: 'A content system across LinkedIn, Instagram, email, and property marketing',
        detail:
          'I build the content calendar and produce persuasive copy for listings, buyer/seller education, and lead-gen campaigns as a coordinated system, not a single generalist\'s task list.',
      },
      {
        heading: 'A repurposing pipeline built in',
        detail:
          'Long-form content - webinars, articles, listings - gets systematically repurposed into short-form social and email, so nothing you already produce goes unused.',
      },
    ],
    ctaLabel: 'See My Content System',
    ctaTo: '/contact',
    preview: {
      type: 'email',
      fromName: 'AlphaX RE Capital',
      subject: 'New Listing Alert: Sustainable Living in the Bay Area',
      preheader: 'Plus: 3 things every first-time buyer should know',
      bannerText: 'BUILDING SUSTAINABLE COMMUNITIES, ONE HOME AT A TIME',
      bodyBlocks: [
        { heading: 'This week\'s feature listing', body: 'A closer look at our newest sustainable development and what makes it different.' },
        { heading: 'Buyer education', body: 'The 3-question checklist we give every first-time buyer before they make an offer.' },
      ],
      ctaLabel: 'View Listing',
      accent: '#1E5B4F',
      imageUrl: 'https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'darwin-it-rentals-marketing',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/seo-digital-marketing-specialist-remote-full-time-1670289',
    clientName: 'The Darwin IT & Rentals Group',
    problem:
      "You're running digital marketing across an IT managed services brand and a short-term rental brand at once, and hiring one person to own SEO, content, email, and reporting for both without a training runway.",
    points: [
      {
        heading: 'SEO, content, and email run as one system across both brands',
        detail:
          'I handle on-page and local SEO, Google Business Profile, blog/case-study content, and CRM email nurture sequences for both your IT services and rental brands together, not as two separate scattered efforts.',
      },
      {
        heading: 'Plain-English reporting, not just numbers',
        detail:
          'Monthly GA4 and Search Console reporting comes with clear recommendations attached, so you always know what to do next instead of just seeing a traffic graph.',
      },
    ],
    ctaLabel: 'See How I\'d Run Both Brands',
    ctaTo: '/contact',
    preview: {
      type: 'dashboard',
      title: 'reporting.yourbrands.com.au/overview',
      accent: '#0EA5E9',
      stats: [
        { label: 'Organic Traffic', value: '+38%', delta: '+38% QoQ' },
        { label: 'GBP Leads', value: '112', delta: '+22 this month' },
        { label: 'Email Booked Meetings', value: '19', delta: '+7 vs last month' },
      ],
      bars: [22, 28, 26, 34, 31, 40, 47],
      imageUrl: 'https://images.unsplash.com/photo-1589051194321-7201ca7194ae?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'marketing-communications-partner',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/marketing-communications-partner-part-time-1686089',
    clientName: 'The Professional Services Firm',
    problem:
      "You're hiring a part-time Marketing & Communications Partner to own strategy, brand, website, social, and email all at once - a full marketing department's worth of scope for one part-time hire.",
    points: [
      {
        heading: 'Strategy, brand, and execution as one coordinated engagement',
        detail:
          'I run quarterly marketing strategy, website updates, social content calendars, and email automation together, so nothing falls through the gap between "the strategist" and "the person who actually does the work."',
      },
      {
        heading: 'Lead capture campaigns built to compound',
        detail:
          'Automated marketing workflows and lead capture campaigns are built once and keep working, instead of resetting to zero every time a part-time hire\'s bandwidth runs out.',
      },
    ],
    ctaLabel: 'See My Approach to This Scope',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'yourfirm.com',
      navItems: ['Services', 'Insights', 'About', 'Contact'],
      eyebrow: 'PROFESSIONAL SERVICES, REIMAGINED',
      headline: 'Strategy and Execution, Finally in One Place',
      subhead: 'Integrated marketing strategy, brand, and campaigns for growing professional services firms.',
      ctaLabel: 'Book a Consultation',
      accent: '#334155',
      imageUrl: 'https://images.unsplash.com/photo-1757405944970-dfca42373629?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'dr-c-williams-enterprises',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/digital-marketing-brand-designer-website-brand-experience-required-1686253',
    clientName: 'Dr. C. Williams Enterprises',
    problem:
      "You're building a new GrowthHub365 website plus brand assets across four growing brands, and hiring one creative to own the entire build and visual system from scratch.",
    points: [
      {
        heading: 'A GrowthHub365 build handled end-to-end',
        detail:
          'I design and build the new website inside GrowthHub365 - responsive layouts, high-converting landing pages, clean navigation - as one complete build instead of a queue of one-off design requests.',
      },
      {
        heading: 'A brand asset library that scales across all four brands',
        detail:
          'Lead magnets, downloadable guides, and promotional materials get built into a consistent, reusable system, so each new brand launch doesn\'t start from a blank page.',
      },
    ],
    ctaLabel: 'See the GrowthHub365 Build Concept',
    ctaTo: '/contact',
    preview: {
      type: 'website',
      url: 'growthhub365.com',
      navItems: ['Programs', 'Resources', 'About', 'Connect'],
      eyebrow: 'YOUR PURPOSE, WITH A PLAN',
      headline: 'Build the Life Blueprint You Were Meant For',
      subhead: 'Transformational programs and resources for individuals, families, and leaders ready to grow.',
      ctaLabel: 'Get Started',
      accent: '#B45309',
      imageUrl: 'https://images.unsplash.com/photo-1524758870432-af57e54afa26?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'mortgage-email-marketing',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/remote-email-marketing-specialist-email-marketing-social-media-support-1681459',
    clientName: 'The Remote Mortgage & Financial Services Co.',
    problem:
      "You're hiring a dedicated Email Marketing Specialist to build and optimize campaigns for your mortgage and financial services brand, with light social media support layered on top.",
    points: [
      {
        heading: 'Email campaigns built and optimized as a service',
        detail:
          'I create, schedule, and continuously optimize your email campaigns - subject line testing, list segmentation, deliverability - without you needing to manage a dedicated in-house specialist\'s day-to-day.',
      },
      {
        heading: 'Email content repurposed into social, not rebuilt from scratch',
        detail:
          'Every campaign gets repurposed into Facebook, Instagram, and LinkedIn posts as part of the same workflow, so your social presence stays active without extra hours.',
      },
    ],
    ctaLabel: 'See a Sample Campaign',
    ctaTo: '/contact',
    preview: {
      type: 'email',
      fromName: 'Your Mortgage & Financial Co.',
      subject: 'Rates Just Moved — Here\'s What It Means for You',
      preheader: 'A 2-minute read before you lock in your rate',
      bannerText: 'YOUR MONTHLY RATE UPDATE',
      bodyBlocks: [
        { heading: 'What changed this month', body: 'A plain-English breakdown of the latest rate movement and what it means for buyers right now.' },
        { heading: 'Ready to talk numbers?', body: 'Book a free 15-minute call to see what you could qualify for today.' },
      ],
      ctaLabel: 'Book a Call',
      accent: '#1D4ED8',
      imageUrl: 'https://images.unsplash.com/photo-1754039985021-5c50d180d7cd?auto=format&fit=crop&w=1200&q=80',
    },
  },
  ];

export function getPitch(slug: string | undefined): PitchData | undefined {
  return pitches.find((p) => p.slug === slug);
}
