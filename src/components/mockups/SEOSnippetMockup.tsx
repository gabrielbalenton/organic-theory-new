interface SEOSnippetMockupProps {
  searchQuery: string;
  results: { url: string; title: string; meta: string; highlighted?: boolean }[];
  accent: string;
}

export function SEOSnippetMockup({ searchQuery, results, accent }: SEOSnippetMockupProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#FAFAFA]/10 bg-[#FAFAFA] shadow-2xl shadow-black/40">
      <div className="bg-[#e5e5e5] px-4 py-2.5 flex items-center gap-3 border-b border-black/5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-[12px] text-black/60 flex items-center gap-2">
          <span className="opacity-40">🔍</span> {searchQuery}
        </div>
      </div>
      <div className="px-6 md:px-10 py-8 space-y-6">
        {results.map((r, i) => (
          <div key={i} className={`${r.highlighted ? 'rounded p-3 -mx-3' : ''}`} style={r.highlighted ? { backgroundColor: `${accent}0d`, boxShadow: `inset 0 0 0 1px ${accent}33` } : undefined}>
            <p className="text-[13px] text-[#006621] mb-0.5">{r.url}</p>
            <p className="text-[16px] text-[#1a0dab] leading-snug mb-1">{r.title}</p>
            <p className="text-[13px] text-black/50 leading-relaxed">{r.meta}</p>
            {r.highlighted && (
              <span className="inline-block mt-2 text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded font-bold" style={{ backgroundColor: accent, color: '#fff' }}>
                Optimized by us
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
