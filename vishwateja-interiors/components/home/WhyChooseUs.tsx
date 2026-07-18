const points = [
  {
    title: "Modern Machinery",
    desc: "Automated, precision-driven manufacturing — not just manual carpentry.",
  },
  {
    title: "Exact Measurements",
    desc: "Machine-cut precision means perfect fits, every single time.",
  },
  {
    title: "Premium Materials",
    desc: "Quality plywood, laminates, and hardware sourced for durability.",
  },
  {
    title: "On-Time Delivery",
    desc: "Structured production process means no unpredictable delays.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-graylight/40">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-royal font-medium tracking-widest text-sm mb-2">
            WHY CHOOSE US
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy">
            Precision You Can See. Quality You Can Trust.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((p) => (
            <div key={p.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-navy text-white flex items-center justify-center font-semibold">
                ✓
              </div>
              <h3 className="font-medium text-navy mb-2">{p.title}</h3>
              <p className="text-sm text-navy/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}