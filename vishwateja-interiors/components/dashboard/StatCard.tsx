export default function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="bg-white border border-graylight/80 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:border-gold/40 transition-all duration-300">
      <p className="text-xs text-navy/50 font-medium uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-navy tracking-tight">{value}</p>
        {trend && <span className="text-xs text-gold font-medium bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">{trend}</span>}
      </div>
    </div>
  );
}