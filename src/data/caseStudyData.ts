export interface CaseStudySection {
  title: string;
  body?: string;
  items?: string[];
}

export interface CaseStudy {
  slug: string;
  label: string;
  client: string;
  context: string;
  headline?: string;
  coverImage?: string;
  coverAlt?: string;
  metrics?: Array<{ value: string; label: string }>;
  stack?: string[];
  sections: CaseStudySection[];
  downloadUrl?: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'crm-marketing-automation',
    label: 'CRM & Marketing Automation',
    client: 'New Zealand Timber Sourcing & Supply Business · Identity Withheld',
    context: 'A New Zealand timber sourcing and supply business needed one controlled system connecting commercial enquiries, quotations, request-cart behaviour, customer records, email follow-up, analytics, and verified app-to-CRM events.',
    headline: '184 enquiries, 29 won deals, and NZ$486,740 in won-deal value across the first 90 days.',
    coverImage: '/images/crm-automation-case-study.svg',
    coverAlt: 'CRM and automation flow connecting website and app events to Make, HubSpot, GA4, sales, and marketing',
    metrics: [
      { value: '184', label: 'Enquiries' },
      { value: '83', label: 'Quotes issued' },
      { value: '29', label: 'Deals won' },
      { value: 'NZ$486,740', label: 'Won-deal value' },
      { value: '99.84%', label: 'Integration completion' },
    ],
    stack: ['HubSpot', 'Make', 'GA4', 'Google Tag Manager', 'Email Automation', 'CRM Workflows'],
    sections: [
      {
        title: 'The Business Problem',
        body: 'The customer journey moved through website enquiries, product browsing, saved request carts, quotations, sales follow-up, order confirmation, and repeat buying. The goal was to make those steps easier without creating more manual work or letting marketing automation interfere with live sales conversations.',
      },
      {
        title: 'System Design',
        items: [
          'Kept one CRM record structure for contacts, companies, deals, owners, consent, sales tasks, and email workflows.',
          'Used Make for validated handoffs between the sourcing application, operational records, commerce data, and HubSpot rather than treating GA4 as a CRM trigger.',
          'Preserved request IDs, cart IDs, and order IDs so new events could be matched and deduplicated before creating records.',
          'Separated quote-request recovery from true ecommerce checkout recovery so commercial intent was measured correctly.',
        ],
      },
      {
        title: 'Pipeline & Automation',
        items: [
          'Built a quote-to-order pipeline covering new enquiry, qualified, quote in progress, quote sent, negotiation, won, and lost or cancelled.',
          'Designed workflows for enquiry intake, missing information, quote follow-up, lead nurture, saved request carts, customer onboarding, reorder prompts, SLA alerts, and approved supply notifications.',
          'Suppressed irrelevant marketing when a contact had an active quotation, had replied, had purchased, or had unsubscribed.',
        ],
      },
      {
        title: 'Implementation Sequence',
        items: [
          'Structured the rollout into three lanes: quote-to-order first, behaviour-to-enquiry second, and request-cart or checkout recovery only after reliable event sync existed.',
          'Mapped source systems, permissions, buyer stages, request IDs, data ownership, and existing GTM tags before activating workflows.',
          'Connected HubSpot, Make, GTM/GA4, and secure source events before adding nurture, recovery, promotions, onboarding, reorder, and supply-alert workflows.',
          'Used launch gates for reliable data, safe customer messages, and clear ownership before pilot go-live.',
        ],
      },
      {
        title: 'Measurement Architecture',
        body: 'GTM and GA4 measured consent-permitted website behaviour, HubSpot remained the source of record for identified leads and deal stages, and Make moved verified operational events between the application and CRM. Reporting reconciled records using request IDs rather than assuming anonymous GA4 event counts should equal CRM totals.',
      },
      {
        title: '90-Day Results',
        items: [
          '184 enquiries received, 131 qualified, 83 quotes issued, and 29 deals marked won.',
          'Won-deal value reached NZ$486,740 across the reporting period.',
          '142 leads entered nurture and 16 later requested quotes; 99 known visitors without an enquiry produced 16 later enquiries.',
          '78 identified saved request carts entered recovery and 27 completed after the reminder, a 34.6% recovery rate.',
          '945 marketing emails were delivered, with a 42.0% unique open rate, 7.1% unique click rate, and 0.4% unsubscribe rate.',
          'Make processed 11,382 scenario runs: 11,227 completed on the first attempt, 137 recovered after retry, and the final completion rate reached 99.84%.',
          'Lead-source reporting attributed 34.8% of enquiries to organic search, 20.7% to paid search, 16.8% to direct/referral, 11.4% to organic social, 9.8% to paid social, and 6.5% to email.',
        ],
      },
      {
        title: 'What It Demonstrates',
        body: 'This project shows CRM architecture, operational integration, lifecycle automation, customer communications, measurement, exception handling, and reporting working as one commercial system rather than as separate tools.',
      },
    ],
    seo: {
      title: 'CRM & Marketing Automation Case Study | Organic Theory',
      description: 'A B2B HubSpot and Make automation case study covering quote-to-order workflows, cart recovery, email nurture, analytics, and 90-day commercial results.',
      canonical: 'https://organic-theory.vercel.app/case-studies/crm-marketing-automation',
    },
  },
  {
    slug: 'paid-media-ecommerce',
    label: 'Google & Meta Ads',
    client: 'U.S. Birth-Pool Store · Identity Withheld',
    context: 'A six-month paid media engagement for a U.S. ecommerce store selling birth pools, liners, and accessories, with purchase tracking reconciled against Shopify.',
    headline: '$157,674 in sales linked to paid ads from $42,121 in spend, producing a 3.74× blended return.',
    coverImage: '/images/paid-media-case-study.svg',
    coverAlt: 'Paid media results showing ad spend, sales, orders, return, and channel performance',
    metrics: [
      { value: '$157,674', label: 'Sales linked to ads' },
      { value: '$42,121', label: 'Ad spend' },
      { value: '521', label: 'Paid orders' },
      { value: '3.74×', label: 'Sales per $1 spent' },
    ],
    stack: ['Google Ads', 'Google Shopping', 'Meta Ads', 'Shopify', 'Conversion Tracking', 'Remarketing'],
    sections: [
      {
        title: 'The Goal',
        body: 'Generate more paid orders without letting acquisition costs climb too far. The campaign had to distinguish high-intent pool shoppers from people still researching, returning customers buying liners, and low-value accessory purchases that could not support the same advertising cost.',
      },
      {
        title: '14-Day Setup',
        items: [
          'Audited the old ads, sales tracking, product details, and available stock.',
          'Connected purchase tracking to Shopify and verified order values before scaling.',
          'Separated campaigns for core pools and accessories, excluding searches and audiences unlikely to buy.',
          'Improved product comparisons, mobile checkout clarity, liner compatibility, shipping information, and the path from ad to the correct product page.',
        ],
      },
      {
        title: 'Channel Strategy',
        items: [
          'Used Google Search for shoppers already looking to buy and Google Shopping for product-led discovery with price and stock context.',
          'Kept separate campaigns for the standard and upgraded pool models instead of forcing different purchase intents into one ad group.',
          'Used Meta product creative and reminder ads to help shoppers compare options and return after viewing or abandoning the cart.',
          'Kept accessories and open-box products on tighter budgets and reduced spend when order economics stopped supporting the traffic.',
        ],
      },
      {
        title: 'Optimization During the Run',
        body: 'Month 4 exposed weaker traffic: orders fell from 96 to 71 and cost per order rose to $97.63. Weak searches and ads were cut, accessory spend was reduced, and product and checkout paths were reviewed before budget was increased again.',
      },
      {
        title: 'Six-Month Results',
        items: [
          '$42,121 total ad spend produced $157,674 in sales linked to paid ads and 521 paid orders.',
          'The blended return was 3.74×, with an average cost per order of $80.85.',
          'Google Ads produced 360 orders and $113,108 in sales from $27,451 spend, a 4.12× return.',
          'Meta Ads produced 161 orders and $44,566 in sales from $14,670 spend, a 3.04× return.',
          'Month 6 finished at 122 orders, $38,216 in sales, a 4.21× return, and $74.45 ad spend per order.',
        ],
      },
      {
        title: 'What It Demonstrates',
        body: 'Paid media performance depended on product economics, intent separation, accurate purchase tracking, landing-page clarity, budget discipline, and the willingness to cut weak traffic before scaling again.',
      },
    ],
    seo: {
      title: 'Google & Meta Ads Ecommerce Case Study | Organic Theory',
      description: 'Six months of Google and Meta Ads: $157,674 in sales linked to $42,121 ad spend, 521 paid orders, and a 3.74x blended return.',
      canonical: 'https://organic-theory.vercel.app/case-studies/paid-media-ecommerce',
    },
  },
  {
    slug: 'ai-assisted-journey-platform',
    label: 'AI-Assisted Full-Stack Product Development',
    client: 'B2B Timber Sourcing Business',
    context: 'An internal process-mapping application developed for a New Zealand B2B sourcing business to turn stakeholder discussions into shared, reviewable lead and customer journeys.',
    headline: 'From workshop conversations to a collaborative, AI-assisted process workspace.',
    coverImage: '/images/ai-journey-case-study.svg',
    coverAlt: 'Conceptual illustration of an AI-assisted lead and customer journey workspace',
    metrics: [
      { value: 'Visual', label: 'Journey mapping' },
      { value: 'AI', label: 'Controlled proposals' },
      { value: 'Shared', label: 'Workshop decisions' },
      { value: 'Versioned', label: 'Change history' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel', 'GitHub'],
    sections: [
      {
        title: 'The Challenge',
        body: 'Lead acquisition, onboarding, follow-up, and customer reactivation involved multiple channels, tools, people, and decisions. The business needed one practical workspace where the team could map the current process, flag unresolved steps, and build a shared picture of what should happen next.',
      },
      {
        title: 'My Role',
        body: 'I designed and developed the platform as a custom internal web application covering requirements discovery, information architecture, interaction design, frontend and server development, data migration, AI import controls, and deployment.',
      },
      {
        title: 'Interactive Process Canvas',
        items: [
          'Built a navigable canvas with connected cards, directional relationships, zooming, panning, multi-select, automatic alignment, and simple or in-depth viewing modes.',
          'Separated overarching source views from focused lead, onboarding, customer, and reactivation journeys.',
          'Created reusable card definitions and editable sequence templates capturing purpose, tool, execution method, owner, timing, status, and notes.',
        ],
      },
      {
        title: 'Decisions & AI Review',
        items: [
          'Added Draft, Needs Discussion, and Agreed workshop states so proposals could not be confused with approved process.',
          'Placed questions, comments, final decisions, connections, and editing controls beside each selected card.',
          'Validated AI-generated journey structures, previewed additions, modifications, and removals, and required explicit version saving before applying changes.',
        ],
      },
      {
        title: 'Data Foundation',
        body: 'The first working iteration used Airtable. As shared editing expanded, the application was migrated to a dedicated Supabase PostgreSQL project, with the original Airtable export preserved as a historical archive and database access handled server-side.',
      },
      {
        title: 'What It Demonstrates',
        body: 'The project connects discovery workshops with full-stack product development: turning operational complexity into usable interfaces and data, placing AI behind deliberate approval steps, and delivering a system that can evolve as people agree on the process.',
      },
    ],
    seo: {
      title: 'AI-Assisted Journey Mapping Platform | Organic Theory',
      description: 'An internal AI-assisted journey-mapping platform combining visual process design, collaborative decisions, controlled AI updates, Supabase, and full-stack development.',
      canonical: 'https://organic-theory.vercel.app/case-studies/ai-assisted-journey-platform',
    },
  },

  {
    slug: 'operations-platform',
    label: 'Full-Stack Product Engineering',
    client: 'Online Operations Organization',
    context: 'A custom operations platform built for a large online organization whose workflows had outgrown chat, spreadsheets, screenshots, and institutional memory.',
    headline: 'From scattered coordination to an auditable operations system of record.',
    coverImage: '/images/headless-gm-case-study.svg',
    coverAlt: 'Operations platform architecture showing client, application, domain, data, and audit layers',
    metrics: [
      { value: 'RBAC', label: 'Scoped permissions' },
      { value: 'Relational', label: 'Domain model' },
      { value: 'Auditable', label: 'State & history' },
      { value: 'Decoupled', label: 'Architecture' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Authentication', 'RBAC', 'Vercel'],
    sections: [
      {
        title: 'The Problem',
        body: 'The brief initially looked like a dashboard project. The deeper problem was operational ambiguity: identity, permissions, ownership, participation, approvals, publication state, and transaction history were spread across chat, spreadsheets, screenshots, and administrator memory.',
      },
      {
        title: 'Product Strategy',
        body: 'I reframed the work as an operations platform rather than a collection of screens. Stable domains including identity, groups, roles, listings, transactions, entitlements, participation, approvals, publication, and audit history sit below the interface.',
      },
      {
        title: 'Architecture',
        items: [
          'Separated client interfaces, application orchestration, domain rules, relational data, external services, and observability.',
          'Kept consequential rules below the presentation layer so authorization and state validation are enforced where requests are processed and persisted.',
          'Designed the domain model around relationships and history so the system can answer both what is true now and how it became true.',
        ],
      },
      {
        title: 'Authentication, RBAC & Integrity',
        items: [
          'Separated authentication from authorization and scoped elevated roles to the relevant group.',
          'Used canonical records, relational references, constrained transaction types, and validated state transitions.',
          'Preserved prior values when provenance mattered instead of destructively overwriting ownership, entitlement, or participation history.',
        ],
      },
      {
        title: 'Transactional Workflows',
        items: [
          'Modelled sale, transfer, and gift as distinct transaction outcomes.',
          'Made transfer a first-class domain event with source, destination, authorization context, time, and resulting state.',
          'Separated original entitlement from final participation so a transferred right can change authoritative output without erasing history.',
        ],
      },
      {
        title: 'QA, Security & Auditability',
        body: 'The platform was tested across allowed and denied roles, same-group and cross-group behavior, identity variants, duplicates, missing prerequisites, transfers, and attempts to mutate finalized state. Actors, timestamps, provenance, transfer relationships, review, and publication state are preserved so administrators can understand why the current state exists.',
      },
      {
        title: 'What It Demonstrates',
        body: 'Requirements discovery, product architecture, frontend UX, backend logic, relational data modelling, authentication, RBAC, validation, security, testing, and extensible system design delivered as one full-stack product.',
      },
    ],
    seo: {
      title: 'Full-Stack Operations Platform Case Study | Organic Theory',
      description: 'A full-stack operations platform case study covering relational data, authentication, RBAC, transactional workflows, validation, auditability, and decoupled product architecture.',
      canonical: 'https://organic-theory.vercel.app/case-studies/operations-platform',
    },
  },

  {
    slug: 'b2b-timber-merchant',
    label: 'Website Engineering & Migration',
    client: 'B2B Timber Merchant',
    context: 'An anonymized New Zealand commercial timber business moving from a constrained page-builder site to a custom production stack.',
    headline: 'Wix to custom Next.js, with 100 across every final Lighthouse category.',
    coverImage: '/images/timber-merchant-case-study.svg',
    coverAlt: 'Website migration and performance engineering diagram for a B2B timber merchant',
    metrics: [
      { value: '100', label: 'Performance' },
      { value: '100', label: 'Accessibility' },
      { value: '100', label: 'Best Practices' },
      { value: '100', label: 'SEO' },
      { value: '3/3', label: 'Agentic checks' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Vercel', 'GA4', 'Search Console', 'JSON-LD'],
    sections: [
      {
        title: 'Legacy Problem',
        body: 'The existing page-builder site carried the company story but behaved more like a brochure than a modern commercial acquisition asset. Product discovery was shallow, conversion paths were underdeveloped, and the stack restricted control over performance, metadata, redirects, security headers, analytics, and future expansion.',
      },
      {
        title: 'Target Architecture',
        items: [
          'Rebuilt the site with Next.js 16, React 19, TypeScript, and Vercel using a static-first approach for marketing and knowledge pages.',
          'Used server-side routes only where they added clear value, including enquiry handling with credentials kept in environment variables rather than the browser.',
          'Applied route-specific CSS, responsive Next/Image delivery with AVIF/WebP, permanent redirects, centralized metadata patterns, and global security headers.',
        ],
      },
      {
        title: 'Information Architecture',
        body: 'The top-level navigation stayed intentionally small while deeper commercial intent was handled beneath the Timber section. Distinct product-group pages and a buyer guide made the range clearer to commercial users while giving search engines and answer systems specific crawlable pages for distinct intents.',
      },
      {
        title: 'Performance Engineering',
        items: [
          'Removed the global JavaScript reveal runtime and moved supported motion to CSS so static content did not pay for unnecessary client-side work.',
          'Stopped loading page-specific CSS globally and tuned responsive image sizes, quality, and loading priority around the actual layout.',
          'Kept the hero LCP asset high priority, reduced compositing cost, removed layout-triggering effects, and converted remaining image delivery to explicit Next/Image patterns.',
          'The final optimization pass moved mobile performance from 94 to 100 while preserving 100 desktop performance.',
        ],
      },
      {
        title: 'SEO, AEO & Entity Architecture',
        items: [
          'Implemented unique metadata, canonicals, XML sitemap, robots policy, permanent redirects, descriptive internal linking, and semantically distinct commercial landing pages.',
          'Used Organization, WebSite, BreadcrumbList, AboutPage, Person, ItemList, Service, and Article structured data where the visible page justified it.',
          'Added a machine-readable llms.txt content map and kept crawler access aligned with the same information architecture used by human visitors.',
        ],
      },
      {
        title: 'Accessibility & Responsive UX',
        body: 'Accessibility was treated as a production requirement. The final WCAG-related defect was a small-text contrast issue in shared color tokens; fixing the token prevented the same failure from reappearing elsewhere. The final Lighthouse accessibility score reached 100 on both mobile and desktop.',
      },
      {
        title: 'Security, Privacy & Measurement',
        items: [
          'Added CSP, HSTS, frame protection, content-type protection, strict referrer policy, COOP, and restricted Permissions-Policy controls.',
          'Loaded analytics only after consent and kept form-delivery credentials server-side.',
          'Connected GA4 and Search Console and instrumented successful enquiries, email clicks, phone clicks, external sourcing-platform clicks, and identifiable AI referral visits.',
        ],
      },
      {
        title: 'Migration & Launch',
        body: 'Launch was treated as a website, domain, redirect, analytics, and search migration rather than a DNS-only task: QA on deployment infrastructure, legacy URL mapping, DNS and SSL cutover, measurement reconnection, sitemap submission, crawl monitoring, and post-launch smoke testing.',
      },
      {
        title: 'Measured Results',
        body: 'The final PageSpeed Insights run on 21 September 2026 returned 100/100 for Performance, Accessibility, Best Practices, and SEO on both mobile and desktop, with all available Agentic Browsing checks passing at 3/3. These are Lighthouse laboratory measurements; the newly launched site did not yet have sufficient Chrome UX Report field data.',
      },
      {
        title: 'What It Demonstrates',
        body: 'The project was not a visual reskin. It replaced a constrained page-builder implementation with a controllable production system where UX, content architecture, performance, technical SEO, accessibility, analytics, migration logic, and release discipline were designed together.',
      },
    ],
    seo: {
      title: 'B2B Timber Merchant Website Rebuild | Organic Theory',
      description: 'An anonymized Wix-to-Next.js rebuild covering performance engineering, technical SEO, AEO, accessibility, analytics, security, migration, and perfect final Lighthouse scores.',
      canonical: 'https://organic-theory.vercel.app/case-studies/b2b-timber-merchant',
    },
  },
  {
    slug: 'b2b-timber-sourcing',
    label: 'Product UX & Performance Engineering',
    client: 'B2B Timber Sourcing Platform',
    context: 'An anonymized New Zealand timber sourcing business with a public marketing layer feeding an existing authenticated application.',
    headline: '79 to 98 mobile performance while rebuilding the acquisition layer around an existing product.',
    coverImage: '/images/timber-sourcing-case-study.svg',
    coverAlt: 'Public acquisition layer flowing into sourcing routes and an authenticated application',
    metrics: [
      { value: '79→98', label: 'Mobile performance' },
      { value: '95→99', label: 'Desktop performance' },
      { value: '100', label: 'SEO / A11y / BP' },
      { value: '2/2', label: 'Agentic browsing' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Vercel', 'GitHub', 'GA4', 'Search Console', 'JSON-LD'],
    sections: [
      {
        title: 'Problem Framing',
        body: 'The old public site tried to explain too much before telling buyers where to start. Multiple product and operational concepts competed at the same level, calls to action required too much platform knowledge, and the mobile experience carried heavy CSS, JavaScript, image payloads, and delayed LCP rendering.',
      },
      {
        title: 'Acquisition Architecture',
        items: [
          'Reduced the public journey to clearer buyer intents: browse what is available, review current opportunities, or submit a specific requirement.',
          'Kept marketing pages responsible for explanation and qualification while the authenticated application remained responsible for current inventory and transactional workflows.',
          'Built product-group and educational routes as topic clusters with explicit handoff into the appropriate application workflow.',
        ],
      },
      {
        title: 'UX & Visual Redesign',
        body: 'The redesign used editorial timber imagery, stronger hierarchy, consistent typography and spacing, clearer CTA behavior, and responsive components without turning the public website into a dashboard. The goal was a commercial timber brand that made the digital product obvious without duplicating it.',
      },
      {
        title: 'Front-End Architecture',
        items: [
          'Used Next.js App Router with route-level metadata and static generation where appropriate.',
          'Moved static homepage sections back to server-rendered markup and limited client JavaScript to interaction, motion, forms, and analytics.',
          'Kept a shared shell for navigation, footer, and consent while scoping heavier styles to the routes that actually used them.',
        ],
      },
      {
        title: 'Performance Engineering',
        items: [
          'Removed the hero from the JavaScript reveal lifecycle so the LCP element could paint as soon as the asset was ready.',
          'Extracted homepage-critical CSS and scoped heavier styles away from the mobile critical path.',
          'Tightened responsive image sizes and quality tiers while retaining high-priority LCP discovery.',
          'Converted static sections to server-rendered components and removed unused framework, animation, and component-library CSS.',
          'Left a small legacy-JavaScript warning alone because the savings were minor and the compatibility risk was not justified.',
        ],
      },
      {
        title: 'SEO, AEO & GEO',
        items: [
          'Implemented canonical metadata, sitemap, robots controls, permanent redirects, crawlable navigation, contextual links, and social metadata.',
          'Used answer-first definitions, technically grounded articles with citations, consistent Organization/Person/Article entities, and topic-cluster linking for answer extraction.',
          'Kept AI crawler access open without inventing unsupported special-purpose AI markup.',
        ],
      },
      {
        title: 'Structured Data & Measurement',
        items: [
          'Used Organization, Person, Article, FAQPage, HowTo, Service, CollectionPage, ItemList, and BreadcrumbList only where visible page content justified the type.',
          'Instrumented consent-aware GA4 events for contact submissions, newsletter subscriptions, inventory browsing, requests, offers, login, and account creation.',
          'Kept analytics tied to business actions rather than pageviews alone.',
        ],
      },
      {
        title: 'QA, Deployment & Hardening',
        body: 'The release sequence covered responsive QA, forms, metadata, redirects, structured data, sitemap/robots, Lighthouse, Git-based Vercel deployment, GA4 reconnection, Search Console submission, live form confirmation, redirect verification, and post-launch performance reruns.',
      },
      {
        title: 'Measured Results',
        body: 'Mobile Lighthouse performance moved from 79 to 98 and desktop from 95 to 99. Accessibility, Best Practices, and SEO reached 100, Agentic Browsing passed 2/2, and CLS remained 0 in final Lighthouse testing. The site was newly launched, so mature organic rankings, AI citations, and field performance were deliberately not presented as completed outcomes.',
      },
      {
        title: 'What It Demonstrates',
        body: 'The strongest optimization was not a framework trick. It was identifying which parts of the experience genuinely required JavaScript, which belonged on the server, and which visual behavior was delaying the user’s first meaningful paint. The project combines product positioning, buyer-journey architecture, front-end engineering, search architecture, measurement, and release discipline.',
      },
    ],
    seo: {
      title: 'B2B Timber Sourcing Website Performance Case Study | Organic Theory',
      description: 'An anonymized B2B sourcing redesign covering product positioning, UX architecture, Next.js, SEO/AEO/GEO, analytics, accessibility, performance engineering, QA, and launch.',
      canonical: 'https://organic-theory.vercel.app/case-studies/b2b-timber-sourcing',
    },
  },
  {
    slug: 'local-seo-programmatic-pages',
    label: 'SEO & Local SEO',
    client: 'Australian Building Design Company · Identity Withheld',
    context: 'An Australian building design and drafting business needed to reach homeowners, renovators, investors, and developers searching across New South Wales.',
    headline: '1,281 local landing pages in eight weeks, with search visibility reaching 63.21%.',
    metrics: [
      { value: '+53%', label: 'Search clicks' },
      { value: '+154%', label: 'Search impressions' },
      { value: '1,281', label: 'Local pages launched' },
      { value: '189', label: 'Keywords in top 3' },
      { value: '63.21%', label: 'Search visibility' },
    ],
    stack: ['Google Search Console', 'Google Analytics', 'Moz', 'Technical SEO', 'Local SEO'],
    sections: [
      {
        title: 'The Problem',
        body: 'Broad building-design terms were highly competitive, but the business also needed to appear when people searched for help in a specific suburb or council area. The existing website did not cover enough of those local searches, and publishing near-identical pages at scale would not have helped users or search engines.',
      },
      {
        title: 'Search Mapping',
        body: 'Searches were grouped by suburb or council area and matched to services people were already looking for: building design, home design, drafting, duplex design, and DA or CDC approval help. Each location page had a clear search purpose.',
      },
      {
        title: '1,281 Local Pages',
        body: 'Over eight weeks, 1,281 suburb landing pages were created and published with location-specific headings and content covering local planning context, housing types, and practical questions relevant to people planning a project in that area.',
      },
      {
        title: 'Technical SEO & Measurement',
        items: [
          'Checked indexing and crawlability as the site footprint expanded.',
          'Reviewed titles and descriptions for duplication and improved image and script performance.',
          'Used Search Console for indexing, clicks, impressions, and search position; Google Analytics for visits and engagement; and Moz for local rankings and search visibility.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Google Search clicks increased 53% in the two-month comparison.',
          'Google Search impressions increased 154% over the same comparison.',
          'Search visibility reached 63.21%, more than double the original 30% target.',
          '189 tracked keywords ranked in positions 1 to 3 at project completion.',
        ],
      },
      {
        title: 'What It Demonstrates',
        body: 'This case study shows local SEO built as a scalable search system: location-intent mapping, useful local content, technical controls, progressive rollout, and measurement across search visibility, ranking distribution, and organic traffic.',
      },
    ],
    seo: {
      title: 'Local SEO Case Study: 1,281 NSW Pages | Organic Theory',
      description: 'An eight-week local SEO project that launched 1,281 NSW suburb pages, increased search clicks 53%, impressions 154%, and reached 63.21% search visibility.',
      canonical: 'https://organic-theory.vercel.app/case-studies/local-seo-programmatic-pages',
    },
  },

  {
    slug: 'technical-seo-rebuild',
    label: 'Technical SEO',
    client: 'B2B Timber Platform',
    context: 'A New Zealand B2B timber platform needed a technical search rebuild so search engines and AI systems could read, crawl, and understand the site properly.',
    headline: 'A site search engines could barely read, rebuilt to a perfect 100 SEO score.',
    sections: [
      {
        title: 'The Problem',
        body: 'Titles and descriptions ran too long, page structure was inconsistent, and core search signals such as robots controls, sitemap coverage, and structured data were incomplete. Load performance also created unnecessary technical friction.',
      },
      {
        title: 'What I Did',
        items: [
          'Rewrote page metadata and social previews so pages display cleanly in search and sharing surfaces.',
          'Rebuilt heading and semantic structure so search engines and answer systems could understand each page more reliably.',
          'Added robots controls, sitemap coverage, page-level structured data, and a cleaner internal link profile.',
          'Optimized images and loading performance without changing the visible brand experience.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Average Lighthouse score rose from 27 to 72.',
          'Performance improved from 57 to 96.',
          'SEO improved from 61 to 100.',
          'Best Practices reached 100 and crawlability and indexing were confirmed.',
        ],
      },
      {
        title: 'What It Means',
        body: 'Technical search work removes friction that blocks otherwise useful content from being discovered, understood, and surfaced by search engines and AI systems.',
      },
    ],
    seo: {
      title: 'Technical SEO Rebuild Case Study | Organic Theory',
      description: 'A technical SEO rebuild that improved performance from 57 to 96, SEO from 61 to 100, and restored clean crawlability and machine-readable structure.',
      canonical: 'https://organic-theory.vercel.app/case-studies/technical-seo-rebuild',
    },
  },

  {
    slug: 'membership-automation',
    label: 'CRM & Workflow Automation',
    client: 'Membership-Based Industry Organization',
    context: 'A membership organization needed annual signups and renewals to move from form submission to CRM and email without repetitive manual handling.',
    headline: 'Annual membership processing automated from form submission to CRM to the member inbox.',
    sections: [
      {
        title: 'The Problem',
        body: 'Every application required someone to create the record, determine whether the person was new or renewing, assign an ID, send the correct email, and clean up failed payments. At volume, the process was slow and easy to break.',
      },
      {
        title: 'What I Did',
        items: [
          'Connected the signup form, automation engine, CRM, and email so every valid submission is processed immediately and routed by payment status.',
          'Built separate handling for completed, declined, and stuck payments.',
          'Automated member ID generation, member-year calculation, phone formatting, and new-versus-renewal detection.',
          'Added retries around failed CRM writes so temporary errors do not lose a member record.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Successful signups and renewals process with zero manual data entry.',
          'Failed payments are routed without polluting the CRM.',
          'Members receive the correct email immediately.',
          'The team only handles genuine exceptions.',
        ],
      },
      {
        title: 'What It Demonstrates',
        body: 'A repeatable automation pattern for intake, onboarding, record keeping, routing, and customer communication where the system handles routine work and people handle exceptions.',
      },
    ],
    seo: {
      title: 'Membership Workflow Automation Case Study | Organic Theory',
      description: 'A membership automation case study connecting forms, CRM, payment-state routing, member records, and email with zero routine manual data entry.',
      canonical: 'https://organic-theory.vercel.app/case-studies/membership-automation',
    },
  },

  {
    slug: 'content-system',
    label: 'Content and Conversion',
    client: 'Content and Social System',
    context: 'A B2B platform in a traditional, relationship-driven industry, building a market presence from a near-zero following.',
    sections: [
      {
        title: 'The Problem',
        body: 'The brief was to establish consistent visibility and authority with zero ad spend, before the client had reviews or case studies of their own to point to.',
      },
      {
        title: 'What I Did',
        items: [
          'Built a five-pillar content system, 40 ready-to-produce posts, each with full copy, hashtags, and a design brief, structured so the client approves a whole pillar in one sign-off instead of post-by-post back and forth.',
          'Built a separate outbound engagement plan around how the platform\'s algorithm actually rewards behavior: thoughtful commenting over broadcasting, in a weekly rhythm a busy executive can run in 20 minutes a day.',
          'Created founder-authority content that uses the team\'s real industry experience as social proof, covering the gap until hard results exist.',
          'Set up a simple tracking system so early connections become the seed list for outreach later.',
        ],
      },
      {
        title: 'What It Shows',
        body: 'The content and conversion layer built as a repeatable system, not one-off posts. Strategy, production, and a cadence the client can actually sustain. The groundwork that compounds before a single ad runs.',
      },
    ],
    seo: {
      title: 'Content & Social System: B2B Presence Without Ad Spend | Organic Theory',
      description: 'A five-pillar content system built for a B2B platform establishing authority from zero - structured for approval, cadence, and compounding reach.',
      canonical: 'https://organic-theory.vercel.app/case-studies/content-system',
    },
  },
];
