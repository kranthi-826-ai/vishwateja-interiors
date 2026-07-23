import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const services = [
  { name: "Modular Kitchens", desc: "Machine-cut precision cabinetry with smart storage, premium finishes, and durable hardware.", icon: "🍽️" },
  { name: "Bedroom Wardrobes", desc: "Sliding, hinged, and walk-in wardrobe solutions tailored to your room's exact dimensions.", icon: "🚪" },
  { name: "TV Units & Entertainment Panels", desc: "Statement-piece media units combining function, cable management, and premium aesthetics.", icon: "📺" },
  { name: "Crockery Units", desc: "Elegant display and storage units built for daily use and long-term durability.", icon: "🍶" },
  { name: "Custom Furniture", desc: "Beds, study units, and bespoke furniture pieces manufactured to your exact specification.", icon: "🛋️" },
  { name: "False Ceiling Works", desc: "Gypsum and POP false ceiling designs with integrated lighting layouts.", icon: "💡" },
  { name: "Interior Designing", desc: "Full-space design planning — layout, material selection, and 3D visualization.", icon: "📐" },
  { name: "Complete Home Interior Solutions", desc: "End-to-end interior execution for 1BHK to 6BHK homes, managed from design to delivery.", icon: "🏠" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <p className="text-gold font-medium tracking-[0.2em] text-sm mb-4 uppercase">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Our Services</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              From a single wardrobe to a fully furnished home — every service is delivered with machine-crafted precision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 bg-warmwhite">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className="group border border-graylight bg-white rounded-2xl p-6 hover:border-gold hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">{s.icon}</div>
                <h3 className="font-medium text-navy mb-2 group-hover:text-goldDark transition-colors duration-300">{s.name}</h3>
                <p className="text-sm text-navy/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-16">
            <Button href="/get-quote">Get a Free Estimate</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}