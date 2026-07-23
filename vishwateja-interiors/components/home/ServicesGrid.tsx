import Reveal from "@/components/ui/Reveal";

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
    <section className="max-w-7xl mx-auto px-6 py-24 bg-warmwhite">
      <Reveal>
        <div className="text-center mb-14">
          <p className="text-gold font-medium tracking-[0.2em] text-sm mb-2 uppercase">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy">Our Services</h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 80}>
            <div className="group border border-graylight bg-white rounded-2xl p-6 hover:border-gold hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                {s.icon}
              </div>
              <h3 className="font-medium text-navy group-hover:text-goldDark transition-colors duration-300">
                {s.name}
              </h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}