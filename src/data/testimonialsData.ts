export interface Testimonial {
  name: string;
  role: string;
  company: string;
  industry: string;
  service: string;
  quote: string;
  course?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'SEO & Local SEO',
    role: 'Australia',
    company: 'Building Design',
    industry: 'Professional Services',
    service: 'SEO & Local SEO',
    quote: '1,281 suburb landing pages launched in eight weeks. Google Search clicks increased 53%, impressions increased 154%, and 189 tracked keywords reached positions 1 to 3.',
  },
  {
    name: 'Google & Meta Ads',
    role: 'United States',
    company: 'Ecommerce',
    industry: 'Retail',
    service: 'Paid Media',
    quote: '$42,121 in ad spend produced $157,674 in sales linked to paid ads and 521 paid orders across six months, a 3.74× blended return.',
  },
  {
    name: 'CRM & Marketing Automation',
    role: 'New Zealand',
    company: 'B2B Supply',
    industry: 'B2B',
    service: 'HubSpot + Make',
    quote: 'The first 90 days produced 184 enquiries, 83 quotes, 29 won deals, NZ$486,740 in won-deal value, and a 99.84% final Make completion rate after retries.',
  },
  {
    name: 'Website Engineering',
    role: 'New Zealand',
    company: 'B2B Timber',
    industry: 'B2B',
    service: 'Next.js Rebuild',
    quote: 'A page-builder site was rebuilt as a custom Next.js production system and finished final QA at 100 for Performance, Accessibility, Best Practices, and SEO on mobile and desktop.',
  },
  {
    name: 'Product UX & Performance',
    role: 'New Zealand',
    company: 'B2B Sourcing',
    industry: 'B2B',
    service: 'Website Performance',
    quote: 'The public acquisition layer was rebuilt around an existing product. Mobile Lighthouse performance moved from 79 to 98, desktop from 95 to 99, with SEO, Accessibility, and Best Practices at 100.',
  },
  {
    name: 'Full-Stack Development',
    role: 'Anonymized',
    company: 'Operations Platform',
    industry: 'Software',
    service: 'Product Engineering',
    quote: 'A custom operations platform replaced chat, spreadsheets, screenshots, and institutional memory with relational data, scoped permissions, validated workflows, and auditable state.',
  },
  {
    name: 'AI-Assisted Product Development',
    role: 'New Zealand',
    company: 'B2B Sourcing',
    industry: 'B2B',
    service: 'Internal Product',
    quote: 'A collaborative process workspace turned stakeholder discussions into visual journeys, structured decisions, controlled AI-assisted proposals, and versioned review history.',
  },
  {
    name: 'Technical SEO',
    role: 'New Zealand',
    company: 'B2B Platform',
    industry: 'B2B',
    service: 'Technical Search',
    quote: 'Technical cleanup improved crawlability, metadata, structured data, and performance, with Lighthouse SEO reaching 100 and performance reaching 96 in the earlier optimization phase.',
  },
  {
    name: 'Workflow Automation',
    role: 'Anonymized',
    company: 'Membership Organization',
    industry: 'Membership',
    service: 'CRM Automation',
    quote: 'Annual membership processing was connected from form submission through CRM and email, eliminating routine manual data entry and routing only genuine exceptions to the team.',
  },
  {
    name: 'Content Strategy',
    role: 'Anonymized',
    company: 'B2B Platform',
    industry: 'B2B',
    service: 'Content System',
    quote: 'A five-pillar content system produced 40 ready-to-produce posts with a practical approval and publishing cadence designed to build authority without paid media.',
  },
];
