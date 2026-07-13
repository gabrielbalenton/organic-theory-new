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
  {
    slug: 'yw-builders-inc',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/Social-Media-Content-SEO-Specialist-1656912',
    clientName: 'YW Builders Inc. (SF Bay Area)',
    problem:
      "You're hiring one person to lead a website overhaul, run your SEO/AEO strategy, and manage social media across Instagram and LinkedIn for your luxury remodeling brand - three specialties riding on a single new hire.",
    points: [
      {
        heading: 'SEO and AEO built into the website overhaul, not bolted on after',
        detail:
          'I rebuild the site with technical SEO and answer-engine optimization from the first page, so search visibility improves alongside the redesign instead of waiting on a second project later.',
      },
      {
        heading: 'A consistent content system across Instagram and LinkedIn',
        detail:
          'I run your brand and executive social presence as a standing system - posting cadence, brand voice, engagement - without you managing a single hire\'s daily bandwidth.',
      },
    ],
    ctaLabel: 'See the Website + SEO Plan',
    ctaTo: '/contact',
    preview: {
      type: 'seo',
      searchQuery: 'luxury home remodeling san francisco bay area',
      accent: '#5B4636',
      results: [
        {
          url: 'competitor-remodel.com',
          title: 'Remodeling Contractor | Bay Area',
          meta: 'We remodel homes. Contact us for a quote.',
        },
        {
          url: 'ywbuilders.com › projects › pacific-heights-remodel',
          title: 'Pacific Heights Whole-Home Remodel: Before & After',
          meta: 'A room-by-room look at a full remodel for a Bay Area family, including the design decisions and 14-week timeline.',
          highlighted: true,
        },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    slug: 'learn-jazz-standards',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/Are-you-our-next-Head-of-Social-Media-Marketing-1624523',
    clientName: 'Learn Jazz Standards',
    problem:
      "You're hiring a Head of Social Media Marketing to turn Instagram and your other channels into a real lead-gen engine for a 7-figure online music education business.",
    points: [
      {
        heading: 'A content calendar and ManyChat funnel running as one system',
        detail:
          'I build and run the posting calendar, repurpose your existing lessons into short-form social, and wire up ManyChat funnels so every post has somewhere to send an interested follower.',
      },
      {
        heading: 'Built around lead-gen, not just posting',
        detail:
          'Every piece of content is built to turn a follower into an email subscriber or student, not just to grow a follower count.',
      },
    ],
    ctaLabel: 'See My Content + Funnel Plan',
    ctaTo: '/contact',
    preview: {
      type: 'dashboard',
      title: 'app.learnjazzstandards.com/social-analytics',
      accent: '#D4A017',
      stats: [
        { label: 'Instagram Followers', value: '48.2K', delta: '+12% MoM' },
        { label: 'ManyChat Opt-ins', value: '1,340', delta: '+31%' },
        { label: 'Email Subs from Social', value: '620', delta: '+22%' },
      ],
      bars: [22, 30, 28, 35, 40, 44, 52],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'wordpress-funnel-business',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/WordPress-Developer-To-Create-Fast-Sites-1585058',
    clientName: 'The WordPress Funnel Business',
    problem:
      "You're hiring a WordPress developer to build fast, clean sites plus landing pages and funnels - and handle basic on-page SEO - as one full-time role.",
    points: [
      {
        heading: 'Fast WordPress builds with speed and SEO baked in',
        detail:
          'I build clean, modern WordPress sites optimized for Core Web Vitals and basic on-page SEO from the first build, not patched in after launch.',
      },
      {
        heading: 'Landing pages and funnels that convert, not just look good',
        detail:
          'I design and build the landing pages and funnels your campaigns send traffic to, with UX and site flow considered from the first wireframe.',
      },
    ],
    ctaLabel: 'See a Sample Fast-Site Build',
    ctaTo: '/contact',
    preview: {
      type: 'dashboard',
      title: 'Core Web Vitals Report',
      accent: '#2F80ED',
      stats: [
        { label: 'Page Load Time', value: '0.8s', delta: '-64%' },
        { label: 'Lighthouse Score', value: '98', delta: '+41pt' },
        { label: 'Funnel Conversion Rate', value: '6.2%', delta: '+2.4pt' },
      ],
      bars: [40, 55, 50, 68, 72, 80, 88],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'ai-workflow-automation',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/AI-Automation-Engineer-n8n-Claude-Expert-1609609',
    clientName: 'The AI Workflow Automation Business',
    problem:
      "You're hiring an AI Automation Engineer to build n8n workflows that pull data from your CRM, SQL, and spreadsheets, run it through an LLM, and produce automated reports and internal chatbots.",
    points: [
      {
        heading: 'Multi-step n8n workflows built and maintained as a service',
        detail:
          'I design the branching n8n workflows, LLM API integrations, and automated reporting pipeline you described, instead of you managing a single engineer\'s workload and coverage.',
      },
      {
        heading: 'Internal tools that keep working after the build',
        detail:
          'Custom internal chatbots and data pipelines get monitored and iterated on, not handed off and left to quietly break when an API changes.',
      },
    ],
    ctaLabel: "Walk Through an Automation I've Built",
    ctaTo: '/contact',
    preview: {
      type: 'dashboard',
      title: 'Automation Ops Dashboard',
      accent: '#7C3AED',
      stats: [
        { label: 'Workflows Running', value: '14', delta: '+6 this quarter' },
        { label: 'Manual Hours Saved/Week', value: '22h' },
        { label: 'Report Accuracy', value: '99.1%', delta: '+3.5pt' },
      ],
      bars: [10, 18, 25, 30, 38, 45, 55],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'homefront-brands',
    sourceJobUrl: 'https://www.linkedin.com/jobs/view/seo-specialist-at-homefront-brands-3462621334',
    clientName: 'Homefront Brands',
    problem:
      "You're hiring an SEO Specialist to manage keyword research, link building, and performance measurement across multiple home-services brands under one roof.",
    points: [
      {
        heading: 'One SEO system across every brand, not per-brand guesswork',
        detail:
          'I run keyword research, link building, and technical SEO as a single coordinated system across your full brand portfolio, so results compound instead of resetting with each new hire.',
      },
      {
        heading: 'Reporting that ties back to franchise-level decisions',
        detail:
          'Monthly performance reporting built around what matters to a multi-brand operation - which brand and market is moving, and why - not a generic traffic report.',
      },
    ],
    ctaLabel: 'See My Multi-Brand SEO Approach',
    ctaTo: '/contact',
    preview: {
      type: 'seo',
      searchQuery: 'home services franchise brands near me',
      accent: '#3B5266',
      results: [
        {
          url: 'competitor-homeservices.com',
          title: 'Home Services | Multiple Locations',
          meta: 'We offer home services in your area. Call today.',
        },
        {
          url: 'homefrontbrands.com › locations › find-a-pro',
          title: 'Find a Trusted Home Services Pro Near You | Homefront Brands',
          meta: 'Search by service and zip code to find a vetted, insured professional from one of our home services brands.',
          highlighted: true,
        },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1630860218787-b73d3426c07c?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    slug: 'rqi-partners',
    sourceJobUrl: 'https://www.linkedin.com/jobs/view/marketing-automation-manager-at-rqi-partners-llc-3811418542',
    clientName: 'RQI Partners',
    problem:
      "You're hiring a Marketing Automation Manager to streamline, automate, and measure marketing tasks and workflows across your resuscitation-training programs.",
    points: [
      {
        heading: 'Marketing workflows automated as a working system',
        detail:
          'I build and maintain the automation layer - lead routing, nurture sequences, task triggers - so your team spends time on training content, not manual marketing ops.',
      },
      {
        heading: 'Measurement built in from day one',
        detail:
          'Every automated workflow ships with the tracking to show which sequences are actually driving enrollments, not just running quietly in the background.',
      },
    ],
    ctaLabel: 'See My Automation Approach',
    ctaTo: '/contact',
    preview: {
      type: 'dashboard',
      title: 'Marketing Automation Dashboard',
      accent: '#C0392B',
      stats: [
        { label: 'Workflows Automated', value: '9', delta: '+9 new' },
        { label: 'Manual Tasks Eliminated', value: '140/mo' },
        { label: 'Enrollment Attribution Accuracy', value: '94%', delta: '+18pt' },
      ],
      bars: [15, 22, 28, 33, 40, 47, 53],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    slug: 'cargas-systems',
    sourceJobUrl: 'https://www.linkedin.com/jobs/view/marketing-automation-specialist-at-cargas-systems-3367050045',
    clientName: 'Cargas Systems',
    problem:
      "You're hiring a Marketing Automation Specialist to plan, manage, and produce marketing assets - email, landing pages, web forms, and social posts - as one role.",
    points: [
      {
        heading: 'Email, landing pages, and social run as one coordinated system',
        detail:
          'I plan and produce the email campaigns, landing pages, web forms, and social posts your marketing calendar needs, instead of one hire context-switching across four channels.',
      },
      {
        heading: 'Chat tool monitoring and lead capture, handled consistently',
        detail:
          'I keep your on-site chat and lead capture forms monitored and connected to your CRM, so leads don\'t sit unanswered between other priorities.',
      },
    ],
    ctaLabel: 'See My Marketing Systems Approach',
    ctaTo: '/contact',
    preview: {
      type: 'seo',
      searchQuery: 'ERP software company lancaster pa',
      accent: '#2F80ED',
      results: [
        {
          url: 'competitor-erp.com',
          title: 'ERP Software | Business Solutions',
          meta: 'We provide ERP software. Contact us to learn more.',
        },
        {
          url: 'cargas.com › blog › choosing-erp-software',
          title: 'How to Choose the Right ERP Software for Your Business',
          meta: 'A practical framework for evaluating ERP vendors, with the exact questions to ask before you sign a contract.',
          highlighted: true,
        },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1630860218787-b73d3426c07c?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    slug: 'wonderly-lights',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/local-seo-specialist-google-maps-ai-search-expert-1685178',
    clientName: 'Wonderly Lights',
    problem:
      "You're hiring a Local SEO Specialist to grow your Google Maps rankings and optimize for AI-powered search (AEO) across Northeast Ohio.",
    points: [
      {
        heading: 'Local SEO and AEO built as one strategy, not two',
        detail:
          'I develop the Local SEO and Google Business Profile strategy your post describes, while also writing the AEO-formatted content that gets you cited by Google AI Overviews, ChatGPT, and Gemini.',
      },
      {
        heading: 'City and ZIP-level pages that actually rank',
        detail:
          'I build the dedicated, keyword-targeted city and ZIP pages your post asks for, so each of your five services can rank on its own instead of competing for one homepage.',
      },
    ],
    ctaLabel: 'See My Local SEO Approach',
    ctaTo: '/contact',
  },
  {
    slug: 'homecare-agency-website',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/web-designer-needed-for-a-homecare-agency-website-1686524',
    clientName: 'The Homecare Agency Website Business',
    problem:
      "You're hiring a web designer to build a warm, trustworthy, accessible website for a homecare agency that families can reach out to during a stressful time.",
    points: [
      {
        heading: 'A site designed for a stressed visitor, not a portfolio piece',
        detail:
          'I design and build clean, accessible pages tuned for seniors and their families - large text, simple navigation, and calm visuals - instead of a template optimized for looks over usability.',
      },
      {
        heading: 'Local SEO built in from the first page',
        detail:
          'I set up the local SEO foundation so your agency is findable when someone searches "home care near me," not just a good-looking site with no visibility.',
      },
    ],
    ctaLabel: 'See A Sample Homecare Site',
    ctaTo: '/contact',
  },
  {
    slug: 'inbound-demo-marketing-business',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/inbound-marketing-expert-1687953',
    clientName: 'The Inbound Demo Marketing Business',
    problem:
      "You're hiring a Marketing Specialist to generate inbound leads and book qualified sales demos through SEO, email marketing, and social media.",
    points: [
      {
        heading: 'SEO, email, and social run as one connected funnel',
        detail:
          'I build the organic traffic strategy, email nurture sequences, and social content your post describes as one system aimed at a single outcome - booked demos - instead of three disconnected efforts.',
      },
      {
        heading: 'A clear path from lead to booked demo',
        detail:
          'I track and optimize the handoff from inbound lead to sales-ready demo booking, so your sales team gets a steady flow of qualified conversations, not just traffic numbers.',
      },
    ],
    ctaLabel: 'See My Inbound Funnel Approach',
    ctaTo: '/contact',
  },
  {
    slug: 'marketing-automation-ai-business',
    sourceJobUrl: 'https://www.onlinejobs.ph/jobseekers/job/marketing-automation-and-ai-specialist-1418038',
    clientName: 'The Marketing Automation & AI Business',
    problem:
      "You're hiring a Marketing Automation and AI Specialist to build workflows across your CRM, email, landing pages, and AI tools.",
    points: [
      {
        heading: 'Workflow automation built and monitored, not just shipped',
        detail:
          'I design the automation workflows across your CRM, email sequences, and landing pages your post describes, and keep watching them after launch so a broken integration gets caught in hours, not weeks.',
      },
      {
        heading: 'One connected system instead of scattered tools',
        detail:
          'CRM integration, marketing automation, and landing pages get built by the same hands and documented clearly, so nothing is a black box only one person understands.',
      },
    ],
    ctaLabel: 'See My Automation Approach',
    ctaTo: '/contact',
  },
  ];

export function getPitch(slug: string | undefined): PitchData | undefined {
  return pitches.find((p) => p.slug === slug);
}
