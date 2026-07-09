interface WebsiteMockupProps {
  url: string;
  navItems: string[];
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  accent: string;
}

export function WebsiteMockup({ url, navItems, eyebrow, headline, subhead, ctaLabel, accent }: WebsiteMockupProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#FAFAFA]/10 bg-[#FAFAFA] shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="bg-[#e5e5e5] px-4 py-2.5 flex items-center gap-3 border-b border-black/5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-[11px] text-black/40 truncate">{url}</div>
      </div>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-black/5">
        <div className="w-7 h-7 rounded-full" style={{ backgroundColor: accent }} />
        <div className="hidden sm:flex gap-6">
          {navItems.map(item => (
            <span key={item} className="text-[11px] tracking-[0.1em] uppercase text-black/40 font-medium">{item}</span>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded" style={{ backgroundColor: accent, color: '#fff' }}>
          {ctaLabel}
        </div>
      </div>
      {/* Hero */}
      <div className="px-6 md:px-10 py-14 md:py-20 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: accent }}>{eyebrow}</p>
        <h3 className="text-2xl md:text-4xl font-bold text-black/90 leading-tight max-w-lg mx-auto mb-4">{headline}</h3>
        <p className="text-sm md:text-base text-black/50 max-w-md mx-auto mb-8">{subhead}</p>
        <div className="inline-block text-xs tracking-[0.15em] uppercase px-6 py-3 rounded font-bold" style={{ backgroundColor: accent, color: '#fff' }}>
          {ctaLabel}
        </div>
      </div>
      {/* Decorative content blocks */}
      <div className="px-6 md:px-10 pb-10 grid grid-cols-3 gap-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded aspect-[4/3]" style={{ backgroundColor: `${accent}1a` }} />
        ))}
      </div>
    </div>
  );
}
