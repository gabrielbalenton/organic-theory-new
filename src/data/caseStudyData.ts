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
    slug: 'headless-gm',
    label: 'Full-Stack Product Engineering',
    client: 'Headless GM',
    context: 'A custom operations platform built for a large online organization whose workflows had outgrown chat, spreadsheets, screenshots, and institutional memory.',
    headline: 'From scattered coordination to an auditable operations system of record.',
    coverImage: '/images/headless-gm-case-study.svg',
    coverAlt: 'Headless operations platform architecture showing client, application, domain, data, and audit layers',
    metrics: [
      { value: 'RBAC', label: 'Scoped permissions' },
      { value: 'Relational', label: 'Domain model' },
      { value: 'Auditable', label: 'State & history' },
      { value: 'Headless', label: 'Architecture' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Authentication', 'RBAC', 'Vercel'],
    sections: [
      {
        title: 'The Problem',
        body: 'The brief initially looked like a dashboard project. The deeper problem was operational ambiguity: identity, permissions, ownership, participation, approvals, publication state, and transaction history were spread across chat, spreadsheets, screenshots, and administrator memory.',
      },
      {
        title: 'Product Strategy',
        body: 'I reframed the work as an operations platform rather than a collection of screens. Stable domains - identity, groups, roles, listings, transactions, entitlements, participation, approvals, publication, and audit history - sit below the interface so future clients, automations, integrations, or AI-assisted workflows can reuse the same operational core.',
      },
      {
        title: 'Architecture',
        items: [
          'Separated client interfaces, application orchestration, domain rules, relational data, external services, and observability instead of putting business logic into one monolithic UI.',
          'Kept consequential rules below the presentation layer: hiding a button improves UX, but authorization and state validation are enforced where requests are processed and persisted.',
          'Designed the domain model around relationships and history so the system can answer both what is true now and how it became true.',
        ],
      },
      {
        title: 'Authentication & RBAC',
        items: [
          'Separated authentication from authorization so account identity does not automatically imply operational authority.',
          'Scoped elevated roles to the relevant group rather than treating every operator or reviewer as globally privileged.',
          'Designed sensitive actions to support additional authorization while preserving traceable records of consequential operations.',
        ],
      },
      {
        title: 'Identity & Data Integrity',
        items: [
          'Separated display identity from normalized identity so inconsistent casing, decorative characters, and non-Latin prefixes or suffixes do not become fragile primary identifiers.',
          'Used canonical records, relational references, constrained transaction types, and validated state transitions to reduce contradictory or impossible records.',
          'Preserved prior values when provenance mattered instead of destructively overwriting ownership, entitlement, or participation history.',
        ],
      },
      {
        title: 'Transactional Workflows',
        items: [
          'Modelled sale, transfer, and gift as distinct transaction outcomes instead of forcing every movement of value or ownership into a single sale schema.',
          'Made transfer a first-class domain event with source, destination, object or entitlement, authorization context, time, and resulting state.',
          'Separated original entitlement from final participation so a transferred right can change the authoritative output without erasing who originally held it.',
        ],
      },
      {
        title: 'Validation & Publication',
        body: 'Publication is treated as a controlled state transition, not a cosmetic button. Before finalization the system can normalize identities, check duplicates, resolve transfers, verify permissions, and review exceptional cases. The final output becomes an authoritative operational record only after those checks pass.',
      },
      {
        title: 'QA, Security & Auditability',
        items: [
          'Tested allowed and denied roles, same-group and cross-group behavior, identity variants, duplicate candidates, missing prerequisites, transfers before publication, and attempts to mutate finalized state.',
          'Protected actions through authenticated identity, role, scope, and workflow state rather than trusting the client interface.',
          'Preserved actors, timestamps, original ownership or entitlement, transfer relationships, review, and publication state so administrators can understand why the current state exists.',
        ],
      },
      {
        title: 'Outcome & Value',
        body: 'The platform converts informal coordination into structured records and explicit system state. The result is directly transferable to custom CRMs, client portals, internal tools, marketplaces, membership systems, approval platforms, and vertical SaaS where business rules, permissions, data, and workflow state have to work together.',
      },
      {
        title: 'What It Demonstrates',
        body: 'This project is the proof point for Full-Stack Development at Organic Theory: requirements discovery, product architecture, frontend UX, backend logic, relational data modelling, authentication, RBAC, validation, security, testing, and extensible system design delivered as one product.',
      },
    ],
    seo: {
      title: 'Headless GM: Full-Stack Operations Platform | Organic Theory',
      description: 'A full-stack operations platform case study covering relational data, authentication, RBAC, transactional workflows, validation, auditability, and headless product architecture.',
      canonical: 'https://organic-theory.vercel.app/case-studies/headless-gm',
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
    slug: 'dmr',
    label: 'Search and Discovery',
    client: 'DMR Designs',
    context: 'A building design firm competing across New South Wales, Australia.',
    headline: '63.21% search visibility in 8 weeks. The target was 30%.',
    sections: [
      {
        title: 'The Problem',
        body: 'DMR was up against established firms for the local searches homeowners and developers actually use, and ranked for almost none of them. The real opportunity sat in 1,281 individual suburbs, each with its own council rules. Covering that by hand, at quality, was impossible.',
      },
      {
        title: 'What I Did',
        items: [
          'Built 1,281 suburb-specific landing pages, each with unique local content, council planning context, and geo-targeted terms. No cookie-cutter duplication.',
          'Ran keyword research per suburb to match real search intent, mixing competitive head terms with long-tail local queries.',
          'Rebuilt the technical foundation: indexing in Search Console, clearing crawl errors, removing duplicate titles, improving Core Web Vitals.',
          'Rolled out in phases across 8 weeks to hold quality at scale.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Search visibility reached 63.21%, more than double the 30% goal.',
          '189 keywords in the top 3, 44 in the top 10.',
          'Outranked every direct competitor (next best sat at 15.43%) and beat official council pages in some areas.',
          'Impressions up 154%, clicks up 53% over two months.',
        ],
      },
      {
        title: 'What It Means',
        body: 'This is what search looks like when it is built as a system instead of a page at a time. The same method scales to any business with a geographic or category footprint worth owning.',
      },
    ],
    downloadUrl: 'https://drive.google.com/file/d/1YhEhQpQjrZuZn7C6r3TfvESjTpPVLcNF/view',
    seo: {
      title: 'DMR Designs: 63% Search Visibility in 8 Weeks | Organic Theory',
      description: 'How 1,281 suburb-specific landing pages pushed DMR Designs to 63.21% search visibility in 8 weeks - more than double the 30% target.',
      canonical: 'https://organic-theory.vercel.app/case-studies/dmr',
    },
  },
  {
    slug: 'fpx',
    label: 'Search and Discovery',
    client: 'FPX',
    context: 'A New Zealand timber platform connecting buyers, suppliers, and yard operations.',
    headline: 'A site search engines could barely read, rebuilt to a perfect 100 SEO score.',
    sections: [
      {
        title: 'The Problem',
        body: 'FPX ran a real business on a site that search engines and AI tools struggled with. Titles and descriptions ran too long and got cut off. There was no clear H1, headings were inconsistent across pages, and core signals like the robots tag, sitemap, and schema were missing. Load times dragged performance into the high 20s. The company had also just repositioned its two products, and the old site structure no longer matched. A solid platform that was hard to find and hard for machines to understand.',
      },
      {
        title: 'What I Did',
        items: [
          'Rewrote metadata across every page to proper lengths with social previews, so pages display cleanly in search and when shared.',
          'Rebuilt the document structure site-wide: one clear H1 per page, logical H2 and H3 levels, and real semantic HTML so both search engines and AI answer engines can read the content.',
          'Added the full technical layer: robots tag, sitemap, page-level schema including Service and FAQ types, and a cleaner link profile, with the two products modelled correctly as distinct services.',
          'Optimized images and load performance across regions, without changing anything the user sees.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Average Lighthouse score rose from 27 to 72.',
          'Performance 57 to 96. SEO 61 to 100. Best Practices 100. Accessibility held at 92.',
          'Full crawlability and indexing confirmed, with the FAQ page eligible for featured snippets.',
        ],
      },
      {
        title: 'What It Means',
        body: 'Most sites lose traffic not to weak content but to technical friction crawlers and AI tools cannot get past. Clearing it, and structuring the site so machines understand the business, is some of the cheapest visibility a company can buy.',
      },
    ],
    downloadUrl: 'https://drive.google.com/file/d/1lnGxQtv1dtpq3GphCzBrMfxFfyu-NiMe/view',
    seo: {
      title: 'FPX: 27 to 100 SEO Score, Technical Rebuild | Organic Theory',
      description: 'How a full technical SEO rebuild took FPX from a Lighthouse score of 27 to 72, with a perfect 100 SEO score and confirmed crawlability.',
      canonical: 'https://organic-theory.vercel.app/case-studies/fpx',
    },
  },
  {
    slug: 'icsh',
    label: 'CRM and Automation',
    client: 'ICSH',
    context: 'A membership organization processing annual member renewals and signups.',
    headline: 'Annual membership that processes itself, from form submission to CRM to the member\'s inbox.',
    sections: [
      {
        title: 'The Problem',
        body: 'Every membership application meant manual work. Someone had to create the record, check whether the person was new or renewing, assign an ID, send the right email, and clean up after failed payments. At any real volume that is slow, easy to get wrong, and easy to drop entirely.',
      },
      {
        title: 'What I Did',
        items: [
          'Built an automated workflow connecting the signup form, an automation engine, the CRM, and email, so every submission is processed the instant it lands, routed by payment status.',
          'Set up three handling paths: completed payments create or renew the member record and fire the correct welcome or welcome-back email; declined and stuck payments notify the member and the team and clear the CRM automatically.',
          'Automated the logic people get wrong by hand: unique member ID generation, member-year calculation based on payment month, phone formatting, and new-versus-renewal detection.',
          'Built in reliability so failed CRM writes retry on their own before anything is flagged, meaning a momentary glitch never loses a member.',
        ],
      },
      {
        title: 'Results',
        items: [
          'Successful signups and renewals process with zero manual data entry.',
          'The CRM stays clean on its own, even when a payment fails.',
          'Members receive the right email instantly; the team only touches genuine exceptions.',
          'The whole system is documented in plain language so any admin can run it with no technical background.',
        ],
      },
      {
        title: 'What It Means',
        body: 'This is the infrastructure layer doing its job. The system runs the operation and people handle only the edge cases. The same pattern fits any business buried in repetitive intake, onboarding, or record-keeping.',
      },
    ],
    seo: {
      title: 'ICSH: Automated Membership Processing, Zero Manual Entry | Organic Theory',
      description: 'How a fully automated workflow replaced manual membership processing for ICSH - from form submission to CRM record to welcome email, instantly.',
      canonical: 'https://organic-theory.vercel.app/case-studies/icsh',
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
