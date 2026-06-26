const ITEMS = [
  'SEARCH ARCHITECTURE',
  'AI AUTOMATION',
  'WORKFLOW ENGINEERING',
  'INTERFACE DESIGN',
  'CONTENT STRATEGY',
  'EMAIL SYSTEMS',
  'SEARCH ARCHITECTURE',
  'AI AUTOMATION',
  'WORKFLOW ENGINEERING',
  'INTERFACE DESIGN',
  'CONTENT STRATEGY',
  'EMAIL SYSTEMS',
];

export default function Marquee({ inverted = false }: { inverted?: boolean }) {
  const textColor = inverted ? 'text-[#09090B]' : 'text-[#FAFAFA]';
  const borderColor = inverted ? 'border-[#09090B]/10' : 'border-[#FAFAFA]/10';
  const dividerColor = inverted ? 'text-[#09090B]/20' : 'text-[#A1A1AA]/40';

  return (
    <div className={`w-full overflow-hidden border-y ${borderColor} py-4`}>
      <div
        className="flex gap-12 w-max"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {ITEMS.map((item, i) => (
          <span key={i} className={`flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase ${textColor} shrink-0`}>
            {item}
            <span className={dividerColor}>/</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
