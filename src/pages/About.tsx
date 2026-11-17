import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextReveal } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const JOURNEY = [
  {
    year: '2011–13',
    role: 'Events Marketing',
    detail: 'Started in event promotion, supplier coordination, and on-site delivery. The work was practical: deadlines, stakeholders, materials, and execution had to line up.',
  },
  {
    year: '2013–16',
    role: 'Assistant Marketing Manager',
    detail: 'Moved into broader brand campaigns, promotions, schedules, suppliers, and cross-team campaign delivery.',
  },
  {
    year: '2016–21',
    role: 'Digital Marketing Specialist',
    detail: 'Worked across paid advertising, SEO, social campaigns, website updates, email marketing, campaign data, content, and landing pages.',
  },
  {
    year: '2021–24',
    role: 'Digital Marketing Specialist',
    detail: 'Managed Google and Meta Ads, SEO, social media, content plans, reporting, and website-to-CRM lead workflows with automated email follow-up.',
  },
  {
    year: '2024–Present',
    role: 'Digital Marketing Consultant · Organic Theory',
    detail: 'Advising B2B suppliers and service businesses on lead generation, quote requests, customer follow-up, SEO, paid media, websites, CRM automation, and digital systems.',
  },
];

const STATS = [
  { value: '2011', label: 'Marketing experience since' },
  { value: '2016', label: 'Digital marketing since' },
  { value: '1,281', label: 'Local pages launched in 8 weeks' },
  { value: '$157,674', label: 'Sales linked to paid ads' },
  { value: 'NZ$486,740', label: 'Won-deal value in 90-day CRM report' },
  { value: '99.84%', label: 'Final Make integration completion' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Gabriel Balenton | Organic Theory</title>
        <meta name="description" content="Gabriel Balenton is a digital marketing consultant with experience in marketing since 2011 and digital marketing since 2016, spanning paid media, SEO, websites, CRM automation, email, reporting, and full-stack systems." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://organic-theory.vercel.app/about" />
        <meta property="og:title" content="About Gabriel Balenton | Organic Theory" />
        <meta property="og:description" content="Marketing, paid media, search, CRM automation, websites, reporting, and full-stack systems delivered through Organic Theory." />
        <meta property="og:image" content="https://organic-theory.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gabriel Balenton - Founder of Organic Theory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Gabriel Balenton | Organic Theory" />
        <meta name="twitter:description" content="Marketing, paid media, search, CRM automation, websites, reporting, and full-stack systems." />
        <meta name="twitter:image" content="https://organic-theory.vercel.app/og-image.png" />
        <link rel="canonical" href="https://organic-theory.vercel.app/about" />
      </Helmet>

      <div className="w-full bg-[#09090B] text-[#FAFAFA]">

        {/* ── HERO ── */}
        <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ THE FOUNDER ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-editorial uppercase tracking-tight leading-[0.95] mb-10 max-w-4xl">
              Marketing and systems.<br />Built to work together.
            </h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
          >
            I have worked in marketing since 2011 and digital marketing since 2016. Today the work spans Google and Meta Ads, SEO, website development, email, CRM workflows, performance reporting, and full-stack delivery.
          </motion.p>
        </section>

        {/* ── JOURNEY TIMELINE ── */}
        <section className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-14">
              <ScrambleText text="[ EXPERIENCE ]" />
            </p>
            <div className="space-y-0">
              {JOURNEY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-[#FAFAFA]/8 group"
                >
                  <div className="col-span-3 md:col-span-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA]/40 uppercase">{item.year}</span>
                  </div>
                  <div className="col-span-9 md:col-span-4">
                    <p className="text-sm font-bold text-[#FAFAFA]/80 group-hover:text-[#FAFAFA] transition-colors duration-300 uppercase tracking-[0.05em]">{item.role}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6 md:pl-4">
                    <p className="text-sm text-[#A1A1AA]/50 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PIVOT SECTION ── */}
        <section className="py-24 px-6 md:px-12 bg-[#F5F0EB] text-[#09090B]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-6">
                <ScrambleText text="[ WHAT CLICKED ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight mb-8 text-[#09090B]">
                  Strategy only matters if it survives implementation.
                </h2>
              </TextReveal>
              <p className="text-sm leading-relaxed text-[#09090B]/60 max-w-md">
                The work I do now sits across acquisition and delivery: finding demand, building the page or campaign that captures it, connecting the CRM and follow-up behind it, and measuring what actually happened.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Google and Meta Ads are treated as commercial channels, not isolated dashboards.',
                'SEO and local search are tied to useful pages, crawlability, and measurable search demand.',
                'CRM and Make workflows are designed around real sales and customer states.',
                'Websites and full-stack products are built with performance, data, permissions, analytics, and QA in the same system.',
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="flex gap-4 items-start border-l-2 border-[#09090B]/15 pl-5 py-1"
                >
                  <p className="text-sm text-[#09090B]/65 leading-relaxed">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-12">
              <ScrambleText text="[ BY THE NUMBERS ]" />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#FAFAFA]/8">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="bg-[#09090B] px-8 py-10"
                >
                  <div className="text-4xl md:text-5xl font-display text-[#FAFAFA] mb-2">{s.value}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ORGANIC THEORY ── */}
        <section className="py-24 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-6">
                <ScrambleText text="[ WHY ORGANIC THEORY ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight leading-tight">
                  The same problem keeps showing up in different forms.
                </h2>
              </TextReveal>
            </div>
            <div className="lg:col-span-7 lg:pt-16 space-y-6">
              <p className="text-base leading-relaxed opacity-50">
                A business can have traffic and still lose the enquiry. It can have leads and still lose the follow-up. It can run ads without reliable purchase tracking, or own a website that cannot support the next stage of the operation.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                Organic Theory exists to connect those pieces: search and paid acquisition, conversion paths, CRM and automation, website engineering, and custom software when the business needs more than off-the-shelf tools.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                The name is intentional. Organic is the system growing from a strong foundation. Theory is the discipline behind the work: define the problem, build the right response, and measure the outcome.
              </p>
              <div className="pt-4">
                <span className="text-2xl font-display tracking-[0.3em] text-[#FAFAFA]/30">O + X</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/30 mt-1">Foundation meets execution</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 md:px-12 bg-[#F5F0EB] text-[#09090B]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-4">
                <ScrambleText text="[ LET'S WORK TOGETHER ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-lg text-[#09090B]">
                  Start with the<br />actual bottleneck.
                </h2>
              </TextReveal>
              <p className="text-sm opacity-50 mt-4 max-w-sm leading-relaxed">
                SEO, paid media, CRM, automation, website, or full-stack development. Scope the part that needs to change first.
              </p>
            </div>
            <MagneticButton strength={0.5}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B] shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Start a Conversation</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
