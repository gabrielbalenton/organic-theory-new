import { useMemo, useState, type CSSProperties, type FocusEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

export interface ServiceOrbitItem {
  id: string;
  label: string;
  title: string;
  description: string;
  detail?: string;
}

const SURFACES = ['#E8E2DB', '#E3E9ED', '#E5E9E3', '#F0ECE6'];

export function ServiceOrbitStack({ items }: { items: ServiceOrbitItem[] }) {
  const reduceMotion = useReducedMotion() ?? false;
  const restingIndex = Math.min(1, Math.max(0, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const midpoint = (items.length - 1) / 2;

  const layouts = useMemo(
    () =>
      items.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * 178,
            y: Math.abs(orbit) * 34 + Math.max(0, Math.abs(orbit) - 1) * 8,
            rotation: orbit * 7,
          },
          closed: {
            x: stack * 11,
            y: Math.abs(stack) * 6,
            rotation: stack * 2.4,
          },
        };
      }),
    [items, midpoint, restingIndex],
  );

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  if (!items.length) return null;

  return (
    <>
      <div className="hidden md:block">
        <div
          className="relative mx-auto h-[520px] max-w-[1120px]"
          onMouseLeave={close}
          onBlur={leaveFocus}
          role="list"
          aria-label="Organic Theory service layers"
        >
          {items.map((item, index) => {
            const position = open ? layouts[index].open : layouts[index].closed;
            const active = index === activeIndex;
            const style: CSSProperties = {
              zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y - (open && active ? 34 : 0)}px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`,
              transitionDuration: reduceMotion ? '0ms' : '460ms',
              backgroundColor: SURFACES[index % SURFACES.length],
            };

            return (
              <article
                key={item.id}
                role="listitem"
                tabIndex={0}
                aria-current={active ? 'true' : undefined}
                className="absolute left-1/2 top-1/2 flex h-[430px] w-[min(72vw,20rem)] origin-bottom flex-col rounded-[1.65rem] border border-[#2F3A45]/10 p-7 text-[#2F3A45] shadow-[0_20px_55px_rgba(47,58,69,0.10)] outline-none transition-[transform,box-shadow] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-[#8DA5B7]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F4]"
                style={style}
                onMouseEnter={() => { setOpen(true); setActiveIndex(index); }}
                onFocus={() => { setOpen(true); setActiveIndex(index); }}
                onClick={() => { setOpen(true); setActiveIndex(index); }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-editorial text-5xl leading-none text-[#2F3A45]/24">{item.id}</span>
                  <span
                    className="mt-2 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: index % 2 === 0 ? '#8DA5B7' : '#8FA897' }}
                  />
                </div>

                <div className="mt-auto">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/46">{item.label}</p>
                  <h3 className="font-editorial text-3xl leading-[0.98] tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-[#2F3A45]/64">{item.description}</p>
                  {active && open && item.detail ? (
                    <p className="mt-4 border-t border-[#2F3A45]/10 pt-4 text-[11px] leading-5 text-[#2F3A45]/48">{item.detail}</p>
                  ) : null}
                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2F3A45]/55 transition-colors hover:text-[#2F3A45]"
                  >
                    Explore layer <ArrowUpRight size={13} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.22em] text-[#2F3A45]/34">
          Hover or focus to open the system
        </p>
      </div>

      <div className="grid gap-4 md:hidden">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="rounded-[1.25rem] border border-[#2F3A45]/10 p-6"
            style={{ backgroundColor: SURFACES[index % SURFACES.length] }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-editorial text-4xl text-[#2F3A45]/25">{item.id}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#2F3A45]/42">{item.label}</span>
            </div>
            <h3 className="mt-10 font-editorial text-3xl leading-none">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#2F3A45]/64">{item.description}</p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
              Explore layer <ArrowUpRight size={13} />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
