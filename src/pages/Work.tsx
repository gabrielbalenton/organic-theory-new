import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../data/portfolioData';
import { ScrambleText } from '../components/ScrambleText';
import { KineticTextReveal } from '../components/ui/kinetic-text-reveal';
import { CaseStudyFlipStack, type EditorialCaseStudy } from '../components/ui/case-study-flip-stack';

const accents: Array<'blue' | 'sage' | 'neutral'> = ['blue', 'sage', 'neutral', 'blue'];

export default function Work() {
  const items: EditorialCaseStudy[] = portfolioData.map((project, index) => ({
    id: project.id,
    eyebrow: project.client,
    title: project.title,
    description: project.description,
    image: project.image,
    imageAlt: project.alt,
    href: project.slug,
    metrics: project.metrics,
    accent: accents[index % accents.length],
  }));

  return (
    <>
      <Helmet>
        <title>Case Studies | Real Results | Organic Theory</title>
        <meta name="description" content="Real results from real builds. Search visibility from 0 to 63%, Lighthouse SEO score of 100, 1,281 pages deployed. See the work." />
        <meta property="og:title" content="Case Studies | Organic Theory" />
        <meta property="og:url" content="https://organic-theory.vercel.app/case-studies" />
        <link rel="canonical" href="https://organic-theory.vercel.app/case-studies" />
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F4] text-[#2F3A45]">
        <header className="px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="ot-eyebrow mb-6"
            >
              <ScrambleText text="[ SELECTED WORK ]" delay={0.25} />
            </motion.p>
            <KineticTextReveal
              text="Case studies built around measurable change."
              splitBy="words"
              direction="up"
              stagger={0.045}
              distance={22}
              className="max-w-[14ch] font-editorial text-5xl leading-[0.96] tracking-[-0.045em] text-[#2F3A45] md:text-7xl lg:text-8xl"
              segmentClassName="inline-block"
            />
            <div className="mt-8 flex max-w-3xl flex-col gap-5 border-t border-[#2F3A45]/10 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-[#2F3A45]/62 md:text-base">
                Technical search, automation, content systems, and platform work. The presentation is quieter now; the evidence stays front and centre.
              </p>
              <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2F3A45]/40">{portfolioData.length} studies</p>
            </div>
          </div>
        </header>

        <div className="border-t border-[#2F3A45]/10">
          <CaseStudyFlipStack items={items} />
        </div>
      </div>
    </>
  );
}
