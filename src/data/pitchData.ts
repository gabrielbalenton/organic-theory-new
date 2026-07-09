export interface PitchPoint {
  heading: string;
  detail: string;
}

export interface PitchData {
  slug: string;
  clientName: string;
  problem: string;
  points: [PitchPoint, PitchPoint];
  ctaLabel: string;
  ctaTo: string;
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
    clientName: 'The ABA Therapy Practice (CA)',
    problem:
      "You're trying to fill a Fall Social Skills Group and building a 90-day growth system from scratch - Wix SEO, Google Business Profile, landing pages, email nurture, and ad campaigns - all riding on one new hire.",
    points: [
      {
        heading: 'The 90-day system you\'re hiring for already exists',
        detail:
          'Local SEO, Google Business Profile optimization, and conversion-focused landing pages is exactly what we build as a packaged engagement - no ramp-up time, no training a new hire on your positioning.',
      },
      {
        heading: 'Email and content run in parallel, not sequentially',
        detail:
          'We stand up the parent-education email flow and content calendar alongside the SEO work instead of waiting for one hire to get through both.',
      },
    ],
    ctaLabel: 'Skip the Hiring Cycle - Book a Call',
    ctaTo: '/contact',
  },
  {
    slug: 'holistify-wordpress',
    clientName: 'The Pet Wellness Brand',
    problem:
      "You're hiring a senior WordPress/Elementor developer to turn your site into an authority - but you're managing two properties, a service brand and a media brand, and vetting portfolios instead of shipping pages.",
    points: [
      {
        heading: 'Elementor builds and technical SEO in one pass',
        detail:
          'We build and optimize WordPress/Elementor sites for speed and search from day one, so you\'re not paying to discover plugin conflicts after launch.',
      },
      {
        heading: 'One team across both properties',
        detail:
          'A consistent design system and SEO implementation across your service site and media brand, without coordinating two separate hires.',
      },
    ],
    ctaLabel: 'See How We\'d Build It',
    ctaTo: '/contact',
  },
  {
    slug: 'nw-marketing-solutions',
    clientName: 'NW Marketing Solutions',
    problem:
      "You're building an in-house marketing team to run paid ads, email, landing pages, and lead funnels across multiple real estate brands at once - a lot to load onto a single new hire.",
    points: [
      {
        heading: 'Landing pages and funnels that plug into your ad spend',
        detail:
          'We build the conversion layer - landing pages, lead funnels, email sequences - so your ad spend has somewhere effective to send traffic, without a hire ramping up on your brand voice first.',
      },
      {
        heading: 'SEO and content systems running in the background',
        detail:
          'While your team focuses on paid and social, we handle the organic side - local SEO, Google Business Profile, structured content - so growth doesn\'t depend on ad spend alone.',
      },
    ],
    ctaLabel: 'Talk Through Your Funnel',
    ctaTo: '/contact',
  },
  {
    slug: 'brunet-law',
    clientName: 'Brunet Law',
    problem:
      "You're hiring one reliable person to own your WordPress site, SEO, social, and email newsletter - a lot of specialties to find in a single long-term hire for a boutique firm.",
    points: [
      {
        heading: 'WordPress (Kallyas) and on-page SEO, handled as a system',
        detail:
          'We maintain the site, keep SEO titles/meta and internal linking clean, and handle ongoing page work - the exact scope in your listing - without you managing a single generalist hire.',
      },
      {
        heading: 'A content calendar built once, run consistently',
        detail:
          'We turn your existing content into a structured calendar across web, social, and email, so quality doesn\'t depend on one person\'s bandwidth.',
      },
    ],
    ctaLabel: 'Book a 15-Minute Call',
    ctaTo: '/contact',
  },
  {
    slug: 'kbeauty-shopify',
    clientName: 'The K-Beauty Shopify Launch',
    problem:
      "You're building a Shopify storefront from scratch for a new K-beauty brand and need someone who can handle visual identity, theme build, and conversion-focused UX all at once.",
    points: [
      {
        heading: 'A full Shopify build, not just a themed template',
        detail:
          'We design and implement the storefront - homepage, collections, product pages, checkout flow - with SEO-friendly structure and fast load times built in from the start.',
      },
      {
        heading: 'Launch-ready without re-hiring for each phase',
        detail:
          'Store build, email capture, and app integrations delivered as one engagement instead of piecing together a designer, a Shopify dev, and an SEO fix later.',
      },
    ],
    ctaLabel: 'See a K-Beauty Build Concept',
    ctaTo: '/contact',
  },
  {
    slug: 'ecommerce-email-designer',
    clientName: 'The Growing eCommerce Team',
    problem:
      "You're hiring a dedicated Email Marketing Designer to build high-converting Klaviyo/Omnisend campaigns for multiple eCommerce brands - a specialized, ongoing design need.",
    points: [
      {
        heading: 'Email campaigns designed and deployed as a service',
        detail:
          'We design and build mobile-responsive, on-brand email campaigns for eCommerce brands without you needing to manage a dedicated in-house designer\'s workload.',
      },
      {
        heading: 'CRO principles baked into every send',
        detail:
          'Every campaign is built with conversion and A/B testing in mind from the first draft, not bolted on after the fact.',
      },
    ],
    ctaLabel: 'Show Me a Sample Campaign',
    ctaTo: '/contact',
  },
  {
    slug: 'bertha-maison',
    clientName: 'Bertha Maison',
    problem:
      "You're building an editorial lifestyle brand and need someone to execute Shopify uploads, SEO metadata, and content scheduling consistently - without diluting your creative direction.",
    points: [
      {
        heading: 'Shopify and SEO execution that protects your editorial voice',
        detail:
          'We handle product/blog uploads, SEO titles, meta descriptions, and alt text to your established style guide - execution only, no reinterpreting your brand.',
      },
      {
        heading: 'Consistent output across Shopify, Instagram, and Pinterest',
        detail:
          'One system keeps your editorial calendar, Shopify journal, and Pinterest presence in sync instead of depending on a single part-time hire\'s availability.',
      },
    ],
    ctaLabel: 'Talk Content Systems',
    ctaTo: '/contact',
  },
  {
    slug: 'calgary-furniture-seo',
    clientName: 'The Calgary Furniture Retailer',
    problem:
      "You're hiring a full-time SEO content writer to build organic growth on Shopify - keyword research, content, on-page SEO, and AI-assisted writing that doesn't read like AI.",
    points: [
      {
        heading: 'An SEO content system, not just articles',
        detail:
          'Keyword clustering, on-page optimization, and Shopify publishing handled as one workflow, tuned for local intent around Calgary homeowners.',
      },
      {
        heading: 'AI-assisted, human-edited - the balance you\'re hiring for',
        detail:
          'We use the same AI-productivity approach you described - research-first, human judgment on top - without needing to train and manage a new full-time writer.',
      },
    ],
    ctaLabel: 'See Our SEO Content Process',
    ctaTo: '/contact',
  },
  {
    slug: 'hair-restoration-brand',
    clientName: 'The Hair Restoration Brand (AU)',
    problem:
      "You need a shared design resource across your ecommerce and clinic sides - emails, product imagery, infographics, clinic collateral - juggled against a queue of briefs from different specialists.",
    points: [
      {
        heading: 'One design system for both business arms',
        detail:
          'Clean, premium design for your Shopify product pages, email/newsletter layouts, and clinic collateral, delivered against your existing specialists\' briefs instead of adding another hire to manage.',
      },
      {
        heading: 'Photo editing and infographic production, handled end-to-end',
        detail:
          'Retouching, compositing, and ingredient/benefit infographics produced on a predictable turnaround, not queued behind a single part-time designer.',
      },
    ],
    ctaLabel: 'Review Our Design Process',
    ctaTo: '/contact',
  },
  {
    slug: 'bk-express',
    clientName: 'B&K Express',
    problem:
      "You're modernizing your online presence and building digital tools for a growing logistics operation, and looking for one web designer to own the whole build.",
    points: [
      {
        heading: 'A professional, high-performing site built and maintained as a service',
        detail:
          'We design, build, and maintain the site - landing pages for your transport services, mobile performance, basic SEO - the exact scope in your listing, without a single hire\'s bandwidth as the bottleneck.',
      },
      {
        heading: 'Ongoing improvements without re-hiring',
        detail:
          'Website maintenance and iteration continue after launch as part of the engagement, rather than ending when a contractor\'s project scope runs out.',
      },
    ],
    ctaLabel: 'Get a Site Assessment',
    ctaTo: '/contact',
  },
  {
    slug: 'em-digital-group',
    clientName: 'EM Digital Group',
    problem:
      "You're scaling Google Ads and tracking across multiple European ecommerce brands and need someone who can own analytics, GTM/GA4, and campaign optimization end-to-end.",
    points: [
      {
        heading: 'Tracking infrastructure built right the first time',
        detail:
          'GTM, GA4, Meta Pixel, and Google Ads conversion tracking set up and audited as a system, so your performance data is trustworthy before you scale spend.',
      },
      {
        heading: 'Campaign optimization without the ramp-up of a new hire',
        detail:
          'We bring existing e-commerce Google Ads and CRO experience across Search, Shopping, and Performance Max instead of learning your stack from zero.',
      },
    ],
    ctaLabel: 'Audit Our Tracking Setup',
    ctaTo: '/contact',
  },
  {
    slug: 'alphax-re-capital',
    clientName: 'AlphaX RE Capital',
    problem:
      "You're hiring a content and copywriting VA to run social, email, and campaign copy across your real estate portfolio - a broad content operation for one hire to carry.",
    points: [
      {
        heading: 'A content system across LinkedIn, Instagram, email, and property marketing',
        detail:
          'We build the content calendar and produce persuasive copy for listings, buyer/seller education, and lead-gen campaigns as a coordinated system, not a single generalist\'s task list.',
      },
      {
        heading: 'A repurposing pipeline built in',
        detail:
          'Long-form content - webinars, articles, listings - gets systematically repurposed into short-form social and email, so nothing you already produce goes unused.',
      },
    ],
    ctaLabel: 'See Our Content System',
    ctaTo: '/contact',
  },
  {
    slug: 'ecommerce-seo-multiplatform',
    clientName: 'The Multi-Platform eCommerce Team',
    problem:
      "You're running SEO across five stores on Etsy, Shopify, Temu, TikTok, and Amazon and need product listings optimized and updated continuously across all of them.",
    points: [
      {
        heading: 'Multi-platform SEO and A+ content as one workflow',
        detail:
          'Product titles, tags, and backend SEO optimized across every platform you sell on, with A+ content and listing graphics produced alongside it.',
      },
      {
        heading: 'Built to keep up with algorithm changes',
        detail:
          'We track Etsy, Amazon, Shopify, TikTok, and Temu SEO changes as part of the engagement, so your listings don\'t quietly lose rank between updates.',
      },
    ],
    ctaLabel: 'Review Our Listings Process',
    ctaTo: '/contact',
  },
  {
    slug: 'ecommerce-web-redesign',
    clientName: 'The eCommerce Redesign Project',
    problem:
      "You need your Home, Shop, About, and Contact pages redesigned in Figma for conversion - a scoped project you're currently hiring out to one designer.",
    points: [
      {
        heading: 'A conversion-focused redesign, scoped and delivered',
        detail:
          'We redesign the same four pages you listed - clean, modern, conversion-focused - with UX/UI grounded in ecommerce best practice, not just visual polish.',
      },
      {
        heading: 'Built to hand off cleanly',
        detail:
          'Figma files delivered in a structure your existing team, or the next contractor, can implement without guesswork.',
      },
    ],
    ctaLabel: 'See Sample Redesign Concepts',
    ctaTo: '/contact',
  },
  {
    slug: 'sewing-craft-retailer',
    clientName: 'The Sewing & Craft Retailer (AU)',
    problem:
      "You're growing your online presence across email, social, and Google Ads and need one person to design promotional artwork, banners, and campaign creative across every channel.",
    points: [
      {
        heading: 'Marketing artwork production, handled as a system',
        detail:
          'Email campaign design (Mailchimp), website banners, social posts, and Google Ads creative produced from one consistent brand system instead of one hire\'s daily bandwidth.',
      },
      {
        heading: 'Built for a fast-moving promotional calendar',
        detail:
          'Multi-format resizing, competitor price-monitoring support, and CMS uploads handled on the cadence your promotions actually need.',
      },
    ],
    ctaLabel: 'See Our Creative Process',
    ctaTo: '/contact',
  },
];

export function getPitch(slug: string | undefined): PitchData | undefined {
  return pitches.find((p) => p.slug === slug);
}
