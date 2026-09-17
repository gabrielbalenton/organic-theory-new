import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EditorialCaseStudy {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  metrics?: string[];
  accent?: 'blue' | 'sage' | 'neutral';
}

function FlipCard({ item, index, total, progress, reduceMotion }: {
  item: EditorialCaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const y = useTransform(progress, [start, end], reduceMotion ? ['0%', '0%'] : ['0%', '-112%']);
  const rotateX = useTransform(progress, [start, end], reduceMotion ? [0, 0] : [0, 14]);
  const scale = useTransform(progress, [Math.max(0, start - segment), start], index === 0 ? [1, 1] : [0.975, 1]);
  const accent = item.accent === 'sage' ? '#8FA897' : item.accent === 'blue' ? '#8DA5B7' : '#B7AFA6';

  return (
    <motion.article
      className="absolute inset-x-0 top-0 overflow-hidden rounded-[24px] border border-[#2F3A45]/10 bg-[#E8E2DB] shadow-[0_22px_60px_rgba(47,58,69,0.10)]"
      style={{ y, rotateX, scale, zIndex: total - index, transformOrigin: '50% 0%', backfaceVisibility: 'hidden' }}
    >
      <div className="grid min-h-[520px] md:min-h-[540px] md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col p-7 md:p-11 lg:p-14">
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs font-bold tracking-[0.28em] uppercase text-[#2F3A45]/45">{item.id}</span>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          </div>
          <div className="mt-auto pt-16">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accent }}>{item.eyebrow}</p>
            <h2 className="max-w-[14ch] font-editorial text-4xl leading-[0.98] tracking-[-0.035em] text-[#2F3A45] md:text-5xl lg:text-6xl">{item.title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#2F3A45]/68 md:text-base">{item.description}</p>
            {item.metrics?.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {item.metrics.map(metric => <span key={metric} className="rounded-full border border-[#2F3A45]/12 bg-[#FAF9F4]/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#2F3A45]/65">{metric}</span>)}
              </div>
            ) : null}
            <Link to={item.href} className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F3A45] group">
              View case study <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div className="relative m-3 min-h-[280px] overflow-hidden rounded-[18px] bg-[#FAF9F4] md:ml-0 md:min-h-0">
          <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover saturate-[0.82] contrast-[0.96]" loading={index < 2 ? 'eager' : 'lazy'} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#2F3A45]/16 via-transparent to-[#FAF9F4]/12" />
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudyFlipStack({ items }: { items: EditorialCaseStudy[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.8 });
  const progress = reduceMotion ? scrollYProgress : smooth;

  return (
    <section className="bg-[#FAF9F4] text-[#2F3A45]">
      <div ref={ref} className="relative" style={{ height: `${Math.max(items.length + 0.75, 2) * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 py-20 md:px-12">
          <div className="relative mx-auto h-[650px] w-full max-w-6xl [perspective:1100px] md:h-[540px]">
            {[...items].reverse().map((item, reverseIndex) => {
              const index = items.length - reverseIndex - 1;
              return <FlipCard key={item.id} item={item} index={index} total={items.length} progress={progress} reduceMotion={reduceMotion} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
