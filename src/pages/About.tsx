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
    year: '2011–2013',
    role: 'Events Marketing | Dominguez Marketing',
    detail: 'Joined the team after an internship, supporting event marketing campaigns, promotions and on-site execution.',
  },
  {
    year: '2013–2016',
    role: 'Assistant Marketing Manager | HCBI',
    detail: 'Supported marketing planning, promotional campaigns, events and coordination with internal teams and partners.',
  },
  {
    year: '2016–2021',
    role: 'Digital Marketing Specialist | BVN',
    detail: 'Worked across the digital marketing function, including paid and organic campaigns, websites, content, email, social media and reporting.',
  },
  {
    year: '2021–2024',
    role: 'Digital Marketing Specialist | Unmake Studios',
    detail: 'Focused on paid and organic marketing, technical and content SEO, landing pages, tracking, and marketing automation.',
  },
  {
    year: '2024–Present',
    role: 'Digital Marketing Consultant | Organic Theory',
    detail: 'Support growth across sectors such as building materials, B2B sourcing and distribution, professional services, and membership organizations. Work includes paid media, search, websites, CRM workflows, lead capture and conversion.',
  },
];

const STATS = [
  { value: '40+', label: 'Site audits completed' },
  { value: '1,281', label: 'Programmatic pages deployed' },
  { value: '63%', label: 'Peak search visibility gain' },
  { value: '8 wks', label: 'Fastest result turnaround' },
  { value: '3', label: 'Kids (still cooking on weekends)' },
  { value: '2016', label: 'Digital marketing focus' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Gabriel Balenton | Organic Theory</title>
        <meta name="description" content="Gabriel Balenton is a digital marketing consultant with a background spanning events marketing, marketing management, paid acquisition, SEO, content, websites, and automation." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://organic-theory.vercel.app/about" />
        <meta property="og:title" content="About Gabriel Balenton | Organic Theory" />
        <meta property="og:description" content="Gabriel Balenton's marketing career spans events, campaign management and digital growth. Explore his experience and practical approach." />
        <meta property="og:image" content="https://organic-theory.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gabriel Balenton - Founder of Organic Theory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Gabriel Balenton | Organic Theory" />
        <meta name="twitter:description" content="From events marketing and campaign management to paid media, SEO and automation." />
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
            <ScrambleText text="[ ABOUT GABRIEL ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-editorial uppercase tracking-tight leading-[0.95] mb-10 max-w-4xl">
              From events to digital.
            </h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
          >
            I started in events marketing in 2011, moved into marketing management, and shifted into digital in 2016. Across every role, the goal has been to connect the right audience with a clear next step.
          </motion.p>
        </section>

        {/* ── JOURNEY TIMELINE ── */}
        <section className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-14">
              <ScrambleText text="[ CAREER TIMELINE ]" />
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
                <ScrambleText text="[ HOW I WORK ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight mb-8 text-[#09090B]">
                  Business outcomes first. Channels second.
                </h2>
              </TextReveal>
              <p className="text-sm leading-relaxed text-[#09090B]/60 max-w-md">
                Experience across events, brand activity and digital campaigns shaped a practical approach: understand the buyer journey, improve the weak points and measure what changes.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Start with the business goal, the audience and the existing data.',
                'Connect paid, organic, email and social activity into a coherent buyer journey.',
                'Build practical lead capture, enquiry and follow-up processes.',
                'Report on results, identify bottlenecks and improve what matters.',
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
                  Everything I'd seen pointed to the same problem.
                </h2>
              </TextReveal>
            </div>
            <div className="lg:col-span-7 lg:pt-16 space-y-6">
              <p className="text-base leading-relaxed opacity-50">
                Years in events, marketing management, and digital consulting taught me that more activity does not always mean better results. The offer, customer journey, website experience, follow-up and measurement all need to work together.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                Organic Theory brings those pieces together: organic and paid acquisition, useful content, effective web experiences, and automation that reduces unnecessary manual work.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                The name is intentional. Organic - because sustainable growth beats borrowed traffic. Theory - because every engagement is built on a framework, not a feeling.
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
                  Start with the<br />$400 audit.
                </h2>
              </TextReveal>
              <p className="text-sm opacity-50 mt-4 max-w-sm leading-relaxed">
                One hour. Your site, your data, a full diagnostic and a 30-day action plan. No fluff.
              </p>
            </div>
            <MagneticButton strength={0.5}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B] shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Book the Audit</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
