import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface ChoreographyStep {
  number: string;
  title: string;
  description: string;
  detail?: string;
}

export function ScrollChoreography({ steps }: { steps: ChoreographyStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} className="bg-[#FAF9F4]" style={{ minHeight: reduceMotion ? undefined : `${Math.max(steps.length, 2) * 74}vh` }}>
      <div className={reduceMotion ? 'px-6 py-16 md:px-12' : 'sticky top-0 min-h-screen px-6 py-20 md:px-12'}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:pt-10">
            <p className="ot-eyebrow mb-5">[ THE PROCESS ]</p>
            <h2 className="max-w-[10ch] font-editorial text-4xl leading-[0.98] tracking-[-0.035em] text-[#2F3A45] md:text-6xl">Clarity before complexity.</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#2F3A45]/62 md:text-base">Each phase narrows uncertainty before more time or budget is committed.</p>
            <div className="mt-10 hidden h-44 w-px bg-[#2F3A45]/10 lg:block">
              <motion.div className="w-px bg-[#8DA5B7]" style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} />
            </div>
          </div>
          <div className="relative min-h-[570px]">
            {steps.map((step, index) => (
              <ChoreographyCard key={step.number} step={step} index={index} total={steps.length} progress={scrollYProgress} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoreographyCard({ step, index, total, progress, reduceMotion }: {
  step: ChoreographyStep;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduceMotion: boolean;
}) {
  const point = index / Math.max(total - 1, 1);
  const prev = Math.max(0, point - 0.14);
  const next = Math.min(1, point + 0.14);
  const opacity = useTransform(progress, [prev, point, next], index === 0 ? [1, 1, 0.22] : [0.16, 1, 0.22]);
  const y = useTransform(progress, [prev, point, next], reduceMotion ? [0, 0, 0] : [46, 0, -40]);
  const scale = useTransform(progress, [prev, point, next], reduceMotion ? [1, 1, 1] : [0.985, 1, 0.985]);

  return (
    <motion.article
      className={`${reduceMotion ? 'relative mb-5' : 'absolute inset-x-0 top-0'} overflow-hidden rounded-[22px] border border-[#2F3A45]/10 bg-[#E8E2DB] p-8 md:p-12`}
      style={{ opacity, y, scale, zIndex: total - index }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-editorial text-5xl text-[#2F3A45]/28 md:text-7xl">{step.number}</span>
        <span className="h-2 w-2 rounded-full bg-[#8FA897]" />
      </div>
      <h3 className="mt-14 max-w-[13ch] font-editorial text-4xl leading-none tracking-[-0.03em] text-[#2F3A45] md:text-5xl">{step.title}</h3>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-[#2F3A45]/68 md:text-base">{step.description}</p>
      {step.detail ? <p className="mt-8 border-t border-[#2F3A45]/10 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F3A45]/45">{step.detail}</p> : null}
    </motion.article>
  );
}
