import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown, Play, Download, Lock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courses } from '../data/coursesData';
import { testimonials } from '../data/testimonialsData';
import { TextReveal, TextRevealLines } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const TAG_COLORS: Record<string, string> = {
  SEO: 'border-blue-400/30 text-blue-400',
  Automation: 'border-amber-400/30 text-amber-400',
  AEO: 'border-purple-400/30 text-purple-400',
};

function ModuleAccordion({ modules }: { modules: typeof courses[0]['modules'] }) {
  const [open, setOpen] = useState<number | null>(0);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA]">
          <ScrambleText text="[ CURRICULUM ]" />
        </p>
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/40">{totalLessons} lessons</span>
      </div>
      <div className="space-y-1">
        {modules.map((mod, i) => (
          <div key={i} className="border border-[#FAFAFA]/10">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAFA]/[0.03] transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA]/40 w-6 shrink-0">0{i + 1}</span>
                <span className="text-sm font-bold tracking-wide">{mod.title}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/40 hidden sm:block">{mod.lessons.length} lessons</span>
                <ChevronDown size={14} className={`text-[#A1A1AA]/40 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="px-5 pb-4 space-y-2 border-t border-[#FAFAFA]/8">
                    {mod.lessons.map((lesson, j) => (
                      <li key={j} className="flex items-center justify-between gap-3 pt-2">
                        <div className="flex items-start gap-3">
                          <Lock size={11} className="text-[#A1A1AA]/25 shrink-0 mt-1" />
                          <span className="text-sm opacity-50">{lesson.title}</span>
                        </div>
                        {lesson.duration && (
                          <span className="text-[10px] tracking-[0.1em] text-[#A1A1AA]/30 shrink-0">{lesson.duration}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Courses() {
  const [activeTab, setActiveTab] = useState<string>(courses[0].id);
  const activeCourse = courses.find(c => c.id === activeTab) ?? courses[0];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Organic Theory Courses',
    description: 'Self-paced courses on technical SEO, automation, and AEO by Gabriel Balenton.',
    itemListElement: courses.map((c, i) => ({
      '@type': 'Course',
      position: i + 1,
      name: c.title,
      description: c.description,
      offers: { '@type': 'Offer', price: c.priceNumber, priceCurrency: 'USD' },
      provider: { '@type': 'Organization', name: 'Organic Theory', url: 'https://organictheory.vercel.app' },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Courses | Learn SEO, Automation & AEO | Organic Theory</title>
        <meta name="description" content="Self-paced courses on Technical SEO, workflow automation, and AEO. Built from 40+ real client engagements. Buy once, access forever." />
        <link rel="canonical" href="https://organictheory.vercel.app/courses" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* ── HEADER ── */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ COURSES - LIVE NOW ]" delay={0.3} />
          </motion.p>
          <TextRevealLines
            lines={['Learn the system.', 'Build it yourself.']}
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] font-display uppercase tracking-tight"
            staggerDelay={0.12}
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base max-w-lg leading-relaxed mt-6"
          >
            Three self-paced courses built directly from real client work. No fluff, no filler - just the frameworks and builds that actually move numbers. Buy once, access forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { value: '3', label: 'Courses available now' },
              { value: '40+', label: 'Real audits sourced from' },
              { value: '$49–$79', label: 'One-time pricing' },
              { value: '0', label: 'Hours of fluff' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-display text-[#FAFAFA]">{s.value}</div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-[#A1A1AA] opacity-50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── COURSE TABS ── */}
        <div className="border-t border-[#FAFAFA]/10">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex gap-0 border-b border-[#FAFAFA]/10 overflow-x-auto">
              {courses.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`px-6 py-5 text-left shrink-0 border-b-2 transition-all duration-200 ${
                    activeTab === c.id
                      ? 'border-[#FAFAFA] opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className={`text-[9px] font-bold tracking-[0.25em] uppercase border px-2 py-0.5 mb-2 inline-block ${TAG_COLORS[c.tag] ?? 'border-[#FAFAFA]/20 text-[#A1A1AA]'}`}>
                    {c.tag}
                  </div>
                  <div className="text-sm font-display uppercase tracking-wide">{c.title}</div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                {/* Left: course info */}
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <span className={`text-[9px] font-bold tracking-[0.25em] uppercase border px-2.5 py-1 ${TAG_COLORS[activeCourse.tag] ?? 'border-[#FAFAFA]/20 text-[#A1A1AA]'}`}>
                        {activeCourse.tag}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/50">{activeCourse.level}</span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/50">{activeCourse.duration}</span>
                    </div>
                    <TextReveal>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-display uppercase tracking-tight leading-tight mb-4">
                        {activeCourse.title}
                      </h2>
                    </TextReveal>
                    <p className="text-base opacity-60 leading-relaxed">{activeCourse.description}</p>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-5">
                      <ScrambleText text="[ WHAT YOU'LL LEARN ]" />
                    </p>
                    <ul className="space-y-3">
                      {activeCourse.outcomes.map((o, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                          className="flex items-start gap-4"
                        >
                          <span className="w-5 h-5 border border-[#FAFAFA]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[#FAFAFA]/60" />
                          </span>
                          <span className="text-sm opacity-60 leading-relaxed">{o}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Curriculum */}
                  <ModuleAccordion modules={activeCourse.modules} />

                  {/* Who it's for */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-5">
                      <ScrambleText text="[ WHO THIS IS FOR ]" />
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCourse.forWho.map((w, i) => (
                        <div key={i} className="border border-[#FAFAFA]/8 bg-[#FAFAFA]/[0.02] px-4 py-3">
                          <p className="text-sm opacity-50 leading-relaxed">{w}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: purchase card - sticky */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28 space-y-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                      className="border border-[#FAFAFA]/15 bg-[#FAFAFA]/[0.03] p-8"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-display text-[#FAFAFA]">{activeCourse.price}</span>
                            <span className="text-lg text-[#A1A1AA]/40 line-through">{activeCourse.originalPrice}</span>
                          </div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/40 mt-1">One-time · Lifetime access</p>
                        </div>
                        <span className={`text-[9px] font-bold tracking-[0.25em] uppercase border px-2.5 py-1 ${TAG_COLORS[activeCourse.tag] ?? 'border-[#FAFAFA]/20 text-[#A1A1AA]'}`}>
                          {activeCourse.tag}
                        </span>
                      </div>

                      <div className="space-y-2 mb-6 pb-6 border-b border-[#FAFAFA]/10">
                        {[
                          { label: 'Format', value: 'Self-paced, on-demand' },
                          { label: 'Duration', value: activeCourse.duration },
                          { label: 'Level', value: activeCourse.level },
                          { label: 'Access', value: 'Lifetime + all updates' },
                          { label: 'Includes', value: 'PDF workbook' },
                          { label: 'Support', value: 'Email Q&A included' },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/50">{label}</span>
                            <span className="text-xs opacity-70">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA buttons */}
                      <div className="space-y-3">
                        <a
                          href={activeCourse.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-3 bg-[#FAFAFA] text-[#09090B] py-4 px-6 font-bold text-sm tracking-[0.1em] uppercase hover:bg-[#A1A1AA] transition-colors duration-300"
                        >
                          <span>Buy Now - {activeCourse.price}</span>
                          <ArrowRight size={15} />
                        </a>
                        <Link
                          to={`/courses/${activeCourse.id}/learn`}
                          className="w-full flex items-center justify-center gap-3 border border-[#FAFAFA]/15 py-4 px-6 text-[10px] tracking-[0.2em] uppercase text-[#FAFAFA]/50 hover:border-[#FAFAFA]/30 hover:text-[#FAFAFA]/80 transition-all duration-300"
                        >
                          <Play size={12} />
                          <span>Already purchased? Access course</span>
                        </Link>
                      </div>

                      <p className="text-[10px] opacity-25 text-center mt-4 leading-relaxed">
                        Secure checkout via Lemon Squeezy. Card, PayPal accepted.
                      </p>
                    </motion.div>

                    {/* Instructor */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                      className="border border-t-0 border-[#FAFAFA]/15 bg-[#FAFAFA]/[0.02] p-6 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 border border-[#FAFAFA]/20 flex items-center justify-center font-display text-sm shrink-0">G</div>
                      <div>
                        <p className="text-xs font-bold tracking-[0.1em] mb-0.5">Gabriel Balenton</p>
                        <p className="text-[10px] opacity-40 leading-relaxed">Digital consultant. 40+ site audits, 1,281 programmatic pages deployed, $0 to 63% search visibility. These courses are built from live client work - not theory.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── ALL COURSES OVERVIEW ── */}
        <section className="border-t border-[#FAFAFA]/10 py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-4">
                <ScrambleText text="[ ALL COURSES ]" />
              </p>
              <TextReveal>
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest">The full curriculum.</h2>
              </TextReveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  onClick={() => { setActiveTab(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-7 cursor-pointer hover:border-[#FAFAFA]/25 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500 group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-[9px] font-bold tracking-[0.25em] uppercase border px-2 py-0.5 ${TAG_COLORS[c.tag] ?? 'border-[#FAFAFA]/20 text-[#A1A1AA]'}`}>{c.tag}</span>
                    <span className="text-lg font-display opacity-80">{c.price}</span>
                  </div>
                  <h3 className="text-lg font-display uppercase tracking-wide mb-3 group-hover:opacity-70 transition-opacity duration-300">{c.title}</h3>
                  <p className="text-xs opacity-40 leading-relaxed mb-5">{c.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.15em] uppercase opacity-30">{c.duration} · {c.level}</span>
                    <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSE TESTIMONIALS ── */}
        {(() => {
          const courseTestimonials = testimonials.filter(t => t.course);
          return (
            <section className="py-24 px-6 md:px-12 border-t border-[#FAFAFA]/8">
              <div className="max-w-7xl mx-auto">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-4">
                  <ScrambleText text="[ FROM COURSE STUDENTS ]" />
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseTestimonials.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                      className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-6 flex flex-col justify-between hover:border-[#FAFAFA]/20 transition-all duration-500"
                    >
                      <div>
                        <Quote size={16} className="text-[#A1A1AA]/30 mb-4" />
                        <p className="text-sm leading-[1.8] opacity-70 mb-5">"{t.quote}"</p>
                      </div>
                      <div className="border-t border-[#FAFAFA]/10 pt-4">
                        <p className="text-xs font-bold tracking-[0.1em]">{t.name}</p>
                        <p className="text-[10px] opacity-40 tracking-[0.1em] mt-0.5">{t.role}</p>
                        <span className="text-[9px] tracking-[0.2em] uppercase border border-[#FAFAFA]/10 px-2 py-0.5 text-[#A1A1AA] inline-block mt-2">{t.course}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── BOTTOM CTA ── */}
        <section className="bg-[#F5F0EB] text-[#09090B] py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-4">
                <ScrambleText text="[ WANT IT DONE FOR YOU? ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-lg text-[#09090B]">
                  Need it done<br />now instead?
                </h2>
              </TextReveal>
              <p className="text-sm opacity-50 mt-4 max-w-sm leading-relaxed">
                Skip the course. Book the $400 audit and I'll do the work for you.
              </p>
            </div>
            <MagneticButton strength={0.5}>
              <a
                href="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B] shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Book the Audit - $400</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
