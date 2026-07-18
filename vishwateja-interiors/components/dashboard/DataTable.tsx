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
              <th key={c.key} className="text-left px-5 py-3 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-navy/40">
                No records yet.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-graylight hover:bg-graylight/30 transition-colors duration-200">
                {columns.map((c) => (
                  <td key={c.key} className="px-5 py-3 text-navy/80">
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