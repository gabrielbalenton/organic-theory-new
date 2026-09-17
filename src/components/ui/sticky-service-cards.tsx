import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface StickyServiceItem {
  id: string;
  title: string;
  description: string;
  detail?: string;
  accent?: 'blue' | 'sage' | 'neutral';
}

export function StickyServiceCards({ items }: { items: StickyServiceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} className="relative bg-[#FAF9F4]" style={{ minHeight: reduceMotion ? undefined : `${Math.max(items.length, 2) * 82}vh` }}>
      <div className={reduceMotion ? 'space-y-5 px-6 py-16 md:px-12' : 'sticky top-0 flex min-h-screen items-center px-6 py-20 md:px-12'}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="self-center">
            <p className="ot-eyebrow mb-5">[ WHAT I BUILD ]</p>
            <h2 className="max-w-[11ch] font-editorial text-4xl leading-[0.98] tracking-[-0.035em] text-[#2F3A45] md:text-6xl">One system. Several layers.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#2F3A45]/62 md:text-base">Search, automation, interface, and content should reinforce each other. The stack stays simple; the thinking does the heavy lifting.</p>
          </div>
          <div className="relative min-h-[430px]">
            {items.map((item, index) => (
              <StickyCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyCard({ item, index, total, progress, reduceMotion }: {
  item: StickyServiceItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduceMotion: boolean;
}) {
  const start = index / Math.max(total, 1);
  const end = Math.min(1, start + 1 / Math.max(total, 1));
  const y = useTransform(progress, [Math.max(0, start - 0.18), start, end], reduceMotion ? [0, 0, 0] : [46, 0, -34]);
  const opacity = useTransform(progress, [Math.max(0, start - 0.18), start, end], index === 0 ? [1, 1, 0.35] : [0.25, 1, 0.35]);
  const scale = useTransform(progress, [start, end], [1, 0.975]);
  const accent = item.accent === 'sage' ? '#8FA897' : item.accent === 'blue' ? '#8DA5B7' : '#B7AFA6';

  return (
    <motion.article
      className={`${reduceMotion ? 'relative mb-5' : 'absolute inset-x-0 top-0'} rounded-[22px] border border-[#2F3A45]/10 bg-[#E8E2DB] p-7 shadow-[0_18px_45px_rgba(47,58,69,0.08)] md:p-10`}
      style={{ y, opacity, scale, zIndex: total - index }}
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/42">{item.id}</span>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <h3 className="mt-16 max-w-[13ch] font-editorial text-3xl leading-none tracking-[-0.025em] text-[#2F3A45] md:text-5xl">{item.title}</h3>
      <p className="mt-5 max-w-xl text-sm leading-7 text-[#2F3A45]/68 md:text-base">{item.description}</p>
      {item.detail ? <p className="mt-7 border-t border-[#2F3A45]/10 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F3A45]/45">{item.detail}</p> : null}
    </motion.article>
  );
}
