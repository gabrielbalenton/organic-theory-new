import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StickyServiceItem {
  id: string;
  label: string;
  title: string;
  description: string;
  detail?: string;
}

export function StickyServiceCards({ items }: { items: StickyServiceItem[] }) {
  return (
    <div className="relative">
      {items.map((item, index) => {
        const accent = index % 2 === 0 ? '#8DA5B7' : '#8FA897';
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 34, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.62, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 overflow-hidden rounded-[22px] border border-[#2F3A45]/10 bg-[#E8E2DB]/95 shadow-[0_16px_45px_rgba(47,58,69,0.07)] md:sticky"
            style={{ top: String(96 + index * 18) + 'px', zIndex: index + 1 }}
          >
            <div className="grid min-h-[330px] grid-cols-1 md:grid-cols-12">
              <div className="flex flex-col justify-between border-b border-[#2F3A45]/10 p-7 md:col-span-3 md:border-b-0 md:border-r md:p-9">
                <span className="font-editorial text-6xl leading-none text-[#2F3A45]/18 md:text-7xl">{item.id}</span>
                <div>
                  <span className="mb-3 block h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2F3A45]/54">{item.label}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 md:col-span-9 md:p-10 lg:p-12">
                <div>
                  <h3 className="max-w-3xl font-editorial text-4xl leading-[0.98] tracking-[-0.035em] text-[#2F3A45] md:text-5xl">{item.title}</h3>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-[#2F3A45]/66 md:text-base">{item.description}</p>
                  {item.detail && <p className="mt-5 max-w-2xl text-xs leading-6 text-[#2F3A45]/45 md:text-sm">{item.detail}</p>}
                </div>
                <Link to="/services" className="group mt-10 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F3A45]/52 transition-colors hover:text-[#2F3A45]">
                  See how this works
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
