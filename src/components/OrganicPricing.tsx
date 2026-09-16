import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface OrganicPricingPlan {
  label: string;
  price: string;
  description: string;
  features: string[];
  note: string;
  highlighted?: boolean;
}

export function OrganicPricing({ plans }: { plans: OrganicPricingPlan[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Link key={plan.label} to="/contact" className="group relative block pt-9">
          <div className="absolute inset-x-0 top-0 bottom-2 border border-[#09090B]/10 bg-[#09090B]/[0.04] opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <p className="px-5 pt-3 text-center text-[10px] tracking-[0.16em] uppercase font-bold text-[#09090B]/45">{plan.note}</p>
          </div>
          <article className={'relative z-10 min-h-[430px] p-7 md:p-8 flex flex-col border transition-all duration-500 bg-[#F5F0EB] group-hover:-translate-y-1 ' + (plan.highlighted ? 'border-[#09090B]/30 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.7)]' : 'border-[#09090B]/10 group-hover:border-[#09090B]/25')}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#09090B]/40">{plan.label}</p>
                <p className="mt-4 text-3xl md:text-4xl font-editorial uppercase tracking-tight text-[#09090B]">{plan.price}</p>
              </div>
              {plan.highlighted && <span className="border border-[#09090B] px-2 py-1 text-[9px] tracking-[0.15em] uppercase font-bold text-[#09090B]">Core</span>}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#09090B]/55">{plan.description}</p>
            <ul className="mt-8 space-y-3">
              {plan.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex gap-3 text-xs leading-relaxed text-[#09090B]/60">
                  <Check size={13} className="mt-0.5 shrink-0 text-[#09090B]/45" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 flex items-center justify-between border-t border-[#09090B]/10">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#09090B]/55 group-hover:text-[#09090B] transition-colors">Start here</span>
              <ArrowUpRight size={15} className="text-[#09090B]/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
