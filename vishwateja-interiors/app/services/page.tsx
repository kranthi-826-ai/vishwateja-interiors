import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const services = [
  {
    name: "Modular Kitchens",
    desc: "Machine-cut precision cabinetry with smart storage, premium acrylic/laminate finishes, and durable soft-close hardware.",
    icon: "🍽️",
  },
  {
    name: "Bedroom Wardrobes",
    desc: "Sliding, hinged, and walk-in wardrobe solutions tailored to your room's exact dimensions with sensor lighting.",
    icon: "🚪",
  },
  {
    name: "TV Units & Entertainment Panels",
    desc: "Statement-piece media units combining function, concealed cable management, and premium fluted aesthetics.",
    icon: "📺",
  },
  {
    name: "Crockery Units",
    desc: "Elegant glass display and storage units built for daily use and long-term durability.",
    icon: "🍶",
  },
  {
    name: "Custom Furniture",
    desc: "Beds, study units, and bespoke furniture pieces manufactured to your exact specification.",
    icon: "🛋️",
  },
  {
    name: "False Ceiling Works",
    desc: "Gypsum and POP false ceiling designs with integrated magnetic track and cove lighting layouts.",
    icon: "💡",
  },
  {
    name: "Interior Designing",
    desc: "Full-space design planning — 3D walkthrough visualization, layout design, and material selection.",
    icon: "📐",
  },
  {
    name: "Complete Home Interior Solutions",
    desc: "End-to-end interior execution for 1BHK to 6BHK villas & apartments, managed from factory to delivery.",
    icon: "🏠",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white pt-36 pb-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Reveal variant="fadeUp">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30">
              Architectural Offerings
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              From a single wardrobe to a fully furnished home — every service is delivered with machine-crafted precision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-28 bg-warmwhite">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80} variant="fadeUp">
              <div className="group bg-white border border-graylight/80 rounded-3xl p-8 hover:border-gold/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-goldDark transition-colors duration-300">
                    {s.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy/60 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-graylight/40 flex items-center justify-between text-xs font-medium text-gold">
                  <span>Explore service</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} variant="fadeUp">
          <div className="text-center mt-20">
            <Button href="/get-quote" variant="primary" className="text-base px-9 py-4">
              Get a Free Estimate →
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}