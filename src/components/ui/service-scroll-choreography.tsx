import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ServiceChoreographyItem {
  id: string;
  label: string;
  description: string;
  detail?: string;
}

interface ServiceScrollChoreographyProps {
  items: ServiceChoreographyItem[];
}

const CARD_SURFACES = ['#E8E2DB', '#E2E9ED', '#E5E9E3', '#EFEAE4'];

export function ServiceScrollChoreography({ items }: ServiceScrollChoreographyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 38,
    mass: 0.9,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return <ReducedMotionLayout items={items} />;
  }

  return (
    <div ref={ref} className="relative h-[360vh] w-full bg-[#FAF9F4]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-5 py-16 md:px-12">
        <div className="relative mx-auto h-full w-full max-w-7xl">
          <StageGuide progress={progress} />

          <div className="absolute inset-0 flex items-center justify-center [perspective:1200px]">
            {items.slice(0, 4).map((item, index) => (
              <LayerCard
                key={item.id}
                item={item}
                index={index}
                progress={progress}
              />
            ))}

            <SystemHero progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LayerCard({
  item,
  index,
  progress,
}: {
  item: ServiceChoreographyItem;
  index: number;
  progress: MotionValue<number>;
}) {
  // Four corners around the visual centre.
  const starts = [
    { x: '-27vw', y: '-18vh', rotate: -5 },
    { x: '27vw', y: '-18vh', rotate: 4 },
    { x: '-27vw', y: '18vh', rotate: 4 },
    { x: '27vw', y: '18vh', rotate: -5 },
  ] as const;

  // A small cross-over movement gives the choreography life before the stack resolves.
  const mids = [
    { x: '-27vw', y: '15vh', rotate: -2 },
    { x: '27vw', y: '15vh', rotate: 2 },
    { x: '-27vw', y: '-15vh', rotate: 2 },
    { x: '27vw', y: '-15vh', rotate: -2 },
  ] as const;

  const start = starts[index] ?? starts[0];
  const mid = mids[index] ?? mids[0];
  const stackOffsetX = (index - 1.5) * 8;
  const stackOffsetY = (index - 1.5) * 7;
  const stackRotate = (index - 1.5) * 1.4;

  const x = useTransform(
    progress,
    [0, 0.28, 0.38, 0.64, 0.78, 1],
    [start.x, start.x, mid.x, `${stackOffsetX}px`, `${stackOffsetX}px`, `${stackOffsetX}px`],
  );
  const y = useTransform(
    progress,
    [0, 0.28, 0.38, 0.64, 0.78, 1],
    [start.y, mid.y, mid.y, `${stackOffsetY}px`, `${stackOffsetY}px`, `${stackOffsetY}px`],
  );
  const rotate = useTransform(
    progress,
    [0, 0.38, 0.64, 1],
    [start.rotate, mid.rotate, stackRotate, stackRotate],
  );
  const scale = useTransform(progress, [0, 0.64, 0.78, 0.9], [1, 0.92, 0.86, 0.8]);
  const opacity = useTransform(progress, [0, 0.72, 0.84, 0.92], [1, 1, 0.55, 0]);
  const blur = useTransform(progress, [0.76, 0.92], [0, 8]);
  const filter = useTransform(blur, value => `blur(${value}px)`);

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 flex h-[240px] w-[min(40vw,410px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[22px] border border-[#2F3A45]/10 p-6 shadow-[0_20px_55px_rgba(47,58,69,0.11)] md:h-[260px] md:p-8"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        filter,
        backgroundColor: CARD_SURFACES[index % CARD_SURFACES.length],
        zIndex: 20 + index,
        transformOrigin: '50% 50%',
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-editorial text-5xl leading-none text-[#2F3A45]/24 md:text-6xl">{item.id}</span>
        <span
          className="mt-2 h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: index % 2 === 0 ? '#8DA5B7' : '#8FA897' }}
        />
      </div>

      <div className="mt-auto">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.27em] text-[#2F3A45]/46">{item.label}</p>
        <p className="max-w-sm text-sm leading-6 text-[#2F3A45]/68">{item.description}</p>
      </div>
    </motion.article>
  );
}

function SystemHero({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.76, 0.84, 0.92], [0, 0, 1, 1]);
  const scale = useTransform(progress, [0.76, 0.86, 1], [0.78, 0.93, 1]);
  const y = useTransform(progress, [0.76, 0.9, 1], ['8vh', '0vh', '0vh']);
  const width = useTransform(progress, [0.76, 0.9, 1], ['38vw', '76vw', '82vw']);
  const height = useTransform(progress, [0.76, 0.9, 1], ['28vh', '62vh', '68vh']);
  const radius = useTransform(progress, [0.76, 0.92], ['24px', '32px']);

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[#2F3A45]/10 bg-[#2F3A45] text-[#FAF9F4] shadow-[0_28px_90px_rgba(47,58,69,0.22)]"
      style={{ opacity, scale, y, width, height, borderRadius: radius, zIndex: 50 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 16% 16%, rgba(141,165,183,.26), transparent 30%), radial-gradient(circle at 82% 80%, rgba(143,168,151,.22), transparent 32%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(rgba(250,249,244,.45) 0.7px, transparent 0.7px)',
          backgroundSize: '7px 7px',
        }}
      />

      <div className="relative z-10 grid h-full grid-cols-1 gap-8 p-8 md:grid-cols-[1.18fr_0.82fr] md:p-12 lg:p-16">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF9F4]/52">[ THE COMPLETE SYSTEM ]</p>
            <h3 className="mt-5 max-w-[12ch] font-editorial text-4xl leading-[0.94] tracking-[-0.04em] text-[#FAF9F4] md:text-6xl lg:text-7xl">
              One layer, a few layers, or the whole machine.
            </h3>
          </div>

          <p className="max-w-xl text-sm leading-7 text-[#FAF9F4]/66 md:text-base">
            Organic Theory is modular by design. Start with the problem in front of you, combine the layers that need to work together, or connect all four into one search-to-operations system.
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <div className="divide-y divide-[#FAF9F4]/12 border-y border-[#FAF9F4]/12">
            {[
              ['01', 'Use one layer', 'Solve a focused problem without rebuilding everything.'],
              ['02', 'Combine what matters', 'Connect two or three layers around the outcome you need.'],
              ['04', 'Run the full system', 'Traffic, capture, conversion, and infrastructure working together.'],
            ].map(([number, title, copy]) => (
              <div key={title} className="grid grid-cols-[38px_1fr] gap-4 py-4">
                <span className="text-[9px] font-bold tracking-[0.18em] text-[#8DA5B7]">{number}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#FAF9F4]">{title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-[#FAF9F4]/50">{copy}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/services"
            className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#FAF9F4] px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2F3A45]"
          >
            Build your system
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function StageGuide({ progress }: { progress: MotionValue<number> }) {
  const openingOpacity = useTransform(progress, [0, 0.08, 0.22], [0.7, 0.7, 0]);
  const stackOpacity = useTransform(progress, [0.38, 0.5, 0.7], [0, 0.65, 0]);
  const resolveOpacity = useTransform(progress, [0.78, 0.88, 1], [0, 0.65, 0]);

  return (
    <>
      <motion.p
        className="pointer-events-none absolute left-1/2 top-[8%] z-[70] -translate-x-1/2 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/40"
        style={{ opacity: openingOpacity }}
      >
        Four independent layers
      </motion.p>
      <motion.p
        className="pointer-events-none absolute left-1/2 top-[8%] z-[70] -translate-x-1/2 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/40"
        style={{ opacity: stackOpacity }}
      >
        Designed to connect
      </motion.p>
      <motion.p
        className="pointer-events-none absolute left-1/2 top-[8%] z-[70] -translate-x-1/2 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/40"
        style={{ opacity: resolveOpacity }}
      >
        One system, configured around the work
      </motion.p>
    </>
  );
}

function ReducedMotionLayout({ items }: { items: ServiceChoreographyItem[] }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {items.slice(0, 4).map((item, index) => (
          <article
            key={item.id}
            className="rounded-[22px] border border-[#2F3A45]/10 p-6 md:p-8"
            style={{ backgroundColor: CARD_SURFACES[index % CARD_SURFACES.length] }}
          >
            <span className="font-editorial text-5xl text-[#2F3A45]/24">{item.id}</span>
            <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.25em] text-[#2F3A45]/46">{item.label}</p>
            <p className="mt-3 text-sm leading-6 text-[#2F3A45]/65">{item.description}</p>
          </article>
        ))}
      </div>

      <article className="rounded-[28px] bg-[#2F3A45] p-8 text-[#FAF9F4] md:p-12">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#FAF9F4]/50">[ THE COMPLETE SYSTEM ]</p>
        <h3 className="mt-5 max-w-[12ch] font-editorial text-5xl leading-[0.96]">One layer, a few layers, or the whole machine.</h3>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#FAF9F4]/64">
          Start with the problem in front of you, combine the layers that need to work together, or connect all four into one operating system.
        </p>
      </article>
    </div>
  );
}
