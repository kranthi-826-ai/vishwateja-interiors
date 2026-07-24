type Column = { key: string; label: string };

export default function DataTable({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Record<string, string>[];
}) {
  return (
    <div className="bg-white border border-graylight/80 rounded-3xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-6 py-4 font-medium tracking-wider text-xs uppercase text-white/70">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-graylight/40">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-16 text-navy/30">
                  <p className="text-sm font-light">No records found</p>
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="hover:bg-gold/5 transition-colors duration-200">
                  {columns.map((c) => (
                    <td key={c.key} className="px-6 py-4 text-navy/80 font-light text-xs sm:text-sm">
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}