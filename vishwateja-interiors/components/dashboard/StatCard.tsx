export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-graylight rounded-2xl p-6">
      <p className="text-sm text-navy/60 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-navy">{value}</p>
    </div>
  );
}