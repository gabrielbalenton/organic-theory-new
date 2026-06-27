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
      canonical: 'https://organictheory.vercel.app/case-studies/dmr',
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
      canonical: 'https://organictheory.vercel.app/case-studies/fpx',
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
      canonical: 'https://organictheory.vercel.app/case-studies/icsh',
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
      canonical: 'https://organictheory.vercel.app/case-studies/content-system',
    },
  },
];
