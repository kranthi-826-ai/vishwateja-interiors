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
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-navy text-white">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-5 py-3.5 font-medium tracking-wider text-[11px] uppercase text-white/70 whitespace-nowrap">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-graylight/40">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-14 text-navy/30">
                  <p className="text-xs sm:text-sm font-light">No records found</p>
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="hover:bg-gold/5 transition-colors duration-200">
                  {columns.map((c) => (
                    <td key={c.key} className="px-5 py-3.5 text-navy/80 font-normal text-xs sm:text-sm">
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