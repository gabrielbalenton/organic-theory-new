import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const proof = [
  { value: '+154%', label: 'Search impressions' },
  { value: '3.74×', label: 'Paid media return' },
  { value: 'NZ$486,740', label: 'Won-deal value' },
  { value: '79 → 98', label: 'Mobile performance' },
  { value: '1,281', label: 'Local pages launched' },
];

const capabilities = [
  ['SEO & Local SEO', 'Search architecture, technical SEO, local landing-page systems, AEO/GEO, and measurement.'],
  ['Google & Meta Ads', 'Paid acquisition, Shopping, remarketing, conversion tracking, landing-page improvements, and budget control.'],
  ['CRM & Marketing Automation', 'HubSpot, Make, lifecycle workflows, lead routing, quote follow-up, recovery flows, and reporting.'],
  ['Website Engineering', 'Fast public websites, migrations, technical SEO, accessibility, analytics, and production deployment.'],
  ['Full-Stack Development', 'Applications, databases, authentication, RBAC, business logic, APIs, internal tools, and portals.'],
  ['AI & Workflow Systems', 'Operational process mapping, controlled AI assistance, integrations, automation, and exception handling.'],
];

export default function Home() {
  return (
    <div className="bg-[#F5F3EE] text-[#292B2A]">
      <Helmet>
        <title>Organic Theory | SEO, Paid Media, Automation & Full-Stack Development</title>
        <meta
          name="description"
          content="Organic Theory delivers SEO and local search, Google and Meta Ads, CRM and Make automation, website engineering, and full-stack product development backed by real case studies."
        />
        <meta property="og:title" content="Organic Theory | SEO, Paid Media, Automation & Full-Stack Development" />
        <meta
          property="og:description"
          content="Real work across search, paid media, CRM automation, websites, workflow systems, and full-stack products."
        />
        <link rel="canonical" href="https://organic-theory.vercel.app" />
      </Helmet>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:px-12 md:pb-28 md:pt-28">
        <p className="mb-7 text-sm font-medium text-[#667469]">
          SEO · Paid Media · CRM Automation · Websites · Full-Stack Development
        </p>
        <h1 className="max-w-6xl font-editorial text-[clamp(4rem,9vw,8.5rem)] leading-[0.94] tracking-[-0.045em]">
          Work that gets found.<br />
          <span className="text-[#738475]">Systems that get used.</span>
        </h1>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:mt-14 md:flex-row md:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-[#555B56] md:text-xl">
            I work across acquisition and infrastructure: search visibility, paid advertising, CRM and automation, high-performance websites, and the software behind the operation. The portfolio below shows the actual range.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/case-studies" className="inline-flex items-center gap-3 bg-[#292B2A] px-6 py-4 text-sm font-medium text-[#F5F3EE] transition-colors hover:bg-[#526357]">
              View all case studies <ArrowUpRight size={17} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border-b border-[#292B2A] pb-2 text-sm font-medium">
              Discuss a project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#CFCFC7] bg-[#ECEAE3] px-6 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#CFCFC7] md:grid-cols-5 md:divide-y-0">
          {proof.map((item) => (
            <div key={item.label} className="px-5 py-7 md:px-6 md:py-9">
              <p className="font-editorial text-3xl leading-none tracking-tight md:text-4xl">{item.value}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#667469]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm text-[#667469]">Case studies</p>
              <h2 className="max-w-4xl font-editorial text-5xl leading-[1.03] tracking-tight md:text-7xl">
                The portfolio is the pitch.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#666A64]">
              Search, ads, CRM, automation, websites, product engineering, and content. Client identities are withheld where appropriate; the work and results stay visible.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {portfolioData.map((item, index) => (
              <Link
                to={item.slug}
                key={item.slug}
                className={index < 3 ? 'group md:col-span-2' : 'group'}
              >
                <div className={index < 3 ? 'aspect-[16/8] overflow-hidden bg-[#D9DBD4]' : 'aspect-[4/3] overflow-hidden bg-[#D9DBD4]'}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-t border-[#C9CAC2] pt-5">
                  <div>
                    <p className="mb-2 text-sm text-[#667469]">{item.client}</p>
                    <h3 className="font-editorial text-3xl leading-tight md:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#555B56]">{item.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.metrics.map((metric) => (
                        <span key={metric} className="rounded-full border border-[#BFC2BA] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526357]">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={22} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#CFCFC7] bg-[#ECEAE3] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm text-[#667469]">What I actually do</p>
          <h2 className="max-w-4xl font-editorial text-5xl leading-[1.03] tracking-tight md:text-7xl">
            Services backed by work, not a capability list.
          </h2>

          <div className="mt-12 grid border-t border-[#C9CAC2] md:grid-cols-2">
            {capabilities.map(([title, copy]) => (
              <div key={title} className="border-b border-[#C9CAC2] py-7 md:px-6 md:first:pl-0">
                <h3 className="font-editorial text-3xl">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#555B56]">{copy}</p>
              </div>
            ))}
          </div>

          <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-8">
            Services and pricing <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-12 md:py-32">
        <div>
          <p className="mb-5 text-sm text-[#667469]">Start a conversation</p>
          <h2 className="max-w-3xl font-editorial text-5xl leading-[1.05] md:text-7xl">
            Bring the problem. I’ll help decide what is worth fixing, automating, or building.
          </h2>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#292B2A] px-7 py-4 text-sm font-medium text-[#F5F3EE] transition-colors hover:bg-[#526357]">
          Let's talk <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}
