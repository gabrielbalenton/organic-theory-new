interface DashboardMockupProps {
  title: string;
  stats: { label: string; value: string; delta?: string }[];
  bars: number[];
  accent: string;
}

export function DashboardMockup({ title, stats, bars, accent }: DashboardMockupProps) {
  const max = Math.max(...bars);
  return (
    <div className="rounded-lg overflow-hidden border border-[#FAFAFA]/10 bg-[#FAFAFA] shadow-2xl shadow-black/40">
      <div className="bg-[#e5e5e5] px-4 py-2.5 flex items-center gap-3 border-b border-black/5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-[11px] text-black/40 truncate">{title}</div>
      </div>
      <div className="px-6 md:px-10 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="border border-black/5 rounded p-4">
              <p className="text-[10px] tracking-[0.15em] uppercase text-black/40 mb-1">{s.label}</p>
              <p className="text-xl md:text-2xl font-bold text-black/80">{s.value}</p>
              {s.delta && <p className="text-[11px] font-medium mt-1" style={{ color: accent }}>{s.delta}</p>}
            </div>
          ))}
        </div>
        <div className="border border-black/5 rounded p-5">
          <div className="flex items-end gap-2 h-28">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${(b / max) * 100}%`, backgroundColor: i === bars.length - 1 ? accent : `${accent}33` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
