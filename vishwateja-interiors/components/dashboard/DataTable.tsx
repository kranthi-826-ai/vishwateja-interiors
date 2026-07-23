type Column = { key: string; label: string };

export default function DataTable({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Record<string, string>[];
}) {
  return (
    <div className="bg-white border border-graylight rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-white">
            {columns.map((c) => (
              <th key={c.key} className="text-left px-5 py-3.5 font-medium tracking-wide text-xs uppercase text-white/70">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-14 text-navy/30">
                <p className="text-sm">No records yet</p>
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-graylight hover:bg-gold/5 transition-colors duration-200">
                {columns.map((c) => (
                  <td key={c.key} className="px-5 py-3.5 text-navy/80">
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}