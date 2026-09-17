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
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
          className="md:sticky mb-5 border border-[#FAFAFA]/10 bg-[#0D0D10]/95 backdrop-blur-xl overflow-hidden"
          style={{ top: String(96 + index * 18) + 'px', zIndex: index + 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[330px]">
            <div className="md:col-span-3 p-7 md:p-9 border-b md:border-b-0 md:border-r border-[#FAFAFA]/10 flex flex-col justify-between">
              <span className="text-5xl md:text-6xl font-display text-[#FAFAFA]/15">{item.id}</span>
              <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#A1A1AA]">{item.label}</p>
            </div>
            <div className="md:col-span-9 p-7 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl md:text-5xl font-editorial uppercase tracking-tight leading-[0.95] max-w-3xl">{item.title}</h3>
                <p className="mt-6 text-sm md:text-base leading-relaxed text-[#FAFAFA]/50 max-w-2xl">{item.description}</p>
                {item.detail && <p className="mt-5 text-xs md:text-sm leading-relaxed text-[#FAFAFA]/30 max-w-2xl">{item.detail}</p>}
              </div>
              <Link to="/services" className="mt-10 inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-bold text-[#FAFAFA]/45 hover:text-[#FAFAFA] transition-colors w-fit group">
                See how this works
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
