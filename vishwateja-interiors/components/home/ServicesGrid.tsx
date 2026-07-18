const services = [
  { name: "Modular Kitchens", icon: "🍽️" },
  { name: "Bedroom Wardrobes", icon: "🚪" },
  { name: "TV Units & Entertainment Panels", icon: "📺" },
  { name: "Crockery Units", icon: "🍶" },
  { name: "Custom Furniture", icon: "🛋️" },
  { name: "False Ceiling Works", icon: "💡" },
  { name: "Interior Designing", icon: "📐" },
  { name: "Complete Home Interiors", icon: "🏠" },
];

export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <p className="text-royal font-medium tracking-widest text-sm mb-2">
          WHAT WE DO
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">Our Services</h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((s) => (
          <div
            key={s.name}
            className="group border border-graylight rounded-2xl p-6 hover:border-royal hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-4">{s.icon}</div>
            <h3 className="font-medium text-navy group-hover:text-royal transition-colors duration-300">
              {s.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}