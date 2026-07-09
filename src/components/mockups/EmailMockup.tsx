interface EmailMockupProps {
  fromName: string;
  subject: string;
  preheader: string;
  bannerText: string;
  bodyBlocks: { heading: string; body: string }[];
  ctaLabel: string;
  accent: string;
  imageUrl: string;
}

export function EmailMockup({ fromName, subject, preheader, bannerText, bodyBlocks, ctaLabel, accent, imageUrl }: EmailMockupProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#FAFAFA]/10 bg-[#FAFAFA] shadow-2xl shadow-black/40">
      {/* Inbox header */}
      <div className="bg-[#e5e5e5] px-5 py-3 border-b border-black/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: accent }}>
            {fromName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-black/80 truncate">{fromName}</p>
            <p className="text-[11px] text-black/50 truncate">{subject}</p>
          </div>
        </div>
        <p className="text-[10px] text-black/30 truncate pl-10">{preheader}</p>
      </div>
      {/* Email body */}
      <div>
        <div className="relative h-52 md:h-64 flex items-center justify-center text-center px-6">
          <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${accent}66 0%, ${accent}cc 100%)` }} />
          <p className="relative z-10 text-white text-lg md:text-2xl font-bold tracking-wide drop-shadow-sm">{bannerText}</p>
        </div>
        <div className="px-6 md:px-10 py-8 space-y-6">
          {bodyBlocks.map((block, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-16 h-16 rounded shrink-0" style={{ backgroundColor: `${accent}1a` }} />
              <div>
                <p className="text-sm font-bold text-black/80 mb-1">{block.heading}</p>
                <p className="text-xs text-black/50 leading-relaxed">{block.body}</p>
              </div>
            </div>
          ))}
          <div className="text-center pt-2">
            <div className="inline-block text-xs tracking-[0.15em] uppercase px-6 py-3 rounded font-bold" style={{ backgroundColor: accent, color: '#fff' }}>
              {ctaLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
