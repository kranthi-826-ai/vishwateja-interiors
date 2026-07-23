export default function InvoiceHeader({ label }: { label: "INVOICE" | "QUOTATION" }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl mb-8 print:rounded-none h-32">
      {/* Diagonal navy/royal banner, filled corner to corner */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
      >
        <polygon points="300,0 800,0 800,160 100,160" fill="#0A2D89" />
        <polygon points="450,0 800,0 800,90 350,90" fill="#041B5E" />
      </svg>

      <div className="relative z-10 flex justify-between items-center px-8 h-full">
        <img src="/logo/vishwateja-logo.png" alt="Vishwateja Interiors" className="h-14 w-auto" />
        <p className="text-xs tracking-[0.2em] text-white font-semibold">{label}</p>
      </div>
    </div>
  );
}