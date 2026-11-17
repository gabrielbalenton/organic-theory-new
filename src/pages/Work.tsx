import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Work() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#292B2A]">
      <Helmet>
        <title>Case Studies | Organic Theory</title>
        <meta
          name="description"
          content="Case studies across SEO and local search, Google and Meta Ads, CRM automation, workflow systems, website engineering, and full-stack product development."
        />
        <meta property="og:title" content="Case Studies | Organic Theory" />
        <meta property="og:description" content="Real work across search, paid media, CRM automation, websites, workflow systems, and full-stack products." />
        <meta property="og:url" content="https://organic-theory.vercel.app/case-studies" />
        <link rel="canonical" href="https://organic-theory.vercel.app/case-studies" />
      </Helmet>

      <header className="px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-medium text-[#667469]">Selected work</p>
          <h1 className="max-w-5xl font-editorial text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">
            Proof across the whole digital stack.
          </h1>
          <div className="mt-8 flex max-w-4xl flex-col gap-5 border-t border-[#C9CAC2] pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-base leading-7 text-[#555B56]">
              SEO and local search. Google and Meta Ads. CRM and Make automation. Websites. Internal systems. Full-stack applications. The client names are not the point; the work is.
            </p>
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.22em] text-[#667469]">{portfolioData.length} case studies</p>
          </div>
        </div>
      </header>

      <main className="border-t border-[#CFCFC7] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-16 md:grid-cols-2">
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
                  <h2 className="font-editorial text-3xl leading-tight md:text-4xl">{item.title}</h2>
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
      </main>
    </div>
  );
}
