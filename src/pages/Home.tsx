import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const problems = [
  ['Not enough qualified enquiries', 'Help the right people find your business, understand what you offer, and get in touch.'],
  ['A website that looks good but does little', 'Create a faster, clearer website built around how your customers make decisions.'],
  ['Too much repetitive admin', 'Connect existing tools and remove unnecessary manual steps so your team can focus on customers.'],
  ['A business process that needs custom software', 'Build the application, database, permissions, logic, and integrations around the way the operation actually works.'],
];

export default function Home() {
  return (
    <div className="bg-[#F5F3EE] text-[#292B2A]">
      <Helmet>
        <title>Organic Theory | SEO, Paid Media, Websites & Digital Systems</title>
        <meta
          name="description"
          content="Organic Theory helps businesses attract the right customers, improve paid and organic acquisition, build better websites and applications, and reduce manual work through connected digital systems."
        />
      </Helmet>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 md:pb-36 md:pt-28">
        <p className="mb-8 text-sm font-medium text-[#667469]">Independent digital consultancy</p>
        <h1 className="max-w-5xl font-editorial text-[clamp(4rem,9.5vw,9rem)] leading-[0.94] tracking-[-0.045em]">
          Good strategy.<br /><span className="text-[#738475]">Better execution.</span>
        </h1>
        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:mt-14 md:flex-row md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-[#555B56] md:text-xl">
            I help businesses get found by the right people, turn attention into real opportunities, improve the systems behind the work, and build what the business actually needs.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/case-studies" className="inline-flex items-center gap-3 bg-[#292B2A] px-6 py-4 text-sm font-medium text-[#F5F3EE] transition-colors hover:bg-[#526357]">
              See the work <ArrowUpRight size={17} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border-b border-[#292B2A] pb-2 text-sm font-medium">
              Discuss your business <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#CFCFC7] bg-[#ECEAE3] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm text-[#667469]">Selected work</p>
              <h2 className="max-w-3xl font-editorial text-5xl leading-[1.05] tracking-tight md:text-7xl">
                The work should speak for itself.
              </h2>
            </div>
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium">
              All case studies <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
            {portfolioData.map((item, index) => (
              <Link
                to={item.slug}
                key={item.slug}
                className={index === 0 ? 'group md:col-span-2' : 'group'}
              >
                <div className={index === 0 ? 'aspect-[16/9] overflow-hidden bg-[#D9DBD4] md:aspect-[21/8]' : 'aspect-[4/3] overflow-hidden bg-[#D9DBD4]'}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-2 text-sm text-[#667469]">{item.client}</p>
                    <h3 className="font-editorial text-3xl leading-tight md:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555B56]">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {item.metrics.map((metric) => (
                        <span key={metric} className="text-sm font-semibold text-[#526357]">{metric}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 shrink-0" size={22} />
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-xs leading-relaxed text-[#777A73]">
            These are results and outcomes from individual projects, not a promise of future performance or revenue. Client identities are withheld where appropriate.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[0.85fr_1.15fr] md:gap-24 md:px-12 md:py-36">
        <div>
          <p className="mb-5 text-sm text-[#667469]">How I help</p>
          <h2 className="font-editorial text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Business problems first. Tools second.
          </h2>
        </div>
        <div>
          {problems.map(([heading, copy]) => (
            <div key={heading} className="border-t border-[#C9CAC2] py-8">
              <h3 className="font-editorial text-3xl md:text-4xl">{heading}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#555B56]">{copy}</p>
            </div>
          ))}
          <Link to="/services" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#292B2A] underline underline-offset-8">
            Explore what I do <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="bg-[#292B2A] px-6 py-24 text-[#F5F3EE] md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm text-[#B7C1B8]">A practical approach</p>
          <h2 className="max-w-4xl font-editorial text-5xl leading-[1.04] md:text-7xl">
            Find the bottleneck. Fix what matters. Measure what changes.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#D2D6D0]">
            Sometimes that means improving search visibility or paid acquisition. Sometimes it means rebuilding a website, automating a process, or developing the application behind it. The starting point is the business problem, not a list of services to sell.
          </p>
          <Link to="/process" className="mt-9 inline-flex items-center gap-2 border-b border-[#C1C9C0] pb-2 text-sm font-medium">
            How I work <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-12 md:py-36">
        <div>
          <p className="mb-5 text-sm text-[#667469]">Start a conversation</p>
          <h2 className="max-w-3xl font-editorial text-5xl leading-[1.05] md:text-7xl">
            What is holding your business back?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#555B56]">
            Tell me what you are trying to improve. We can start with the problem and decide what is actually worth building or changing.
          </p>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#292B2A] px-7 py-4 text-sm font-medium text-[#F5F3EE] transition-colors hover:bg-[#526357]">
          Let's talk <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}
