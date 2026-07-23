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
    <div className="bg-white border border-graylight rounded-2xl p-6 hover:shadow-md hover:border-gold/40 transition-all duration-300">
      <p className="text-sm text-navy/50 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-navy">{value}</p>
        {trend && <span className="text-xs text-gold font-medium">{trend}</span>}
      </div>
    </div>
  );
}