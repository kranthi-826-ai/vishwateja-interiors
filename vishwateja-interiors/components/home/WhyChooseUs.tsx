import Reveal from "@/components/ui/Reveal";

const points = [
  { title: "German Automated Machinery", desc: "Automated, precision-driven CNC manufacturing — eliminate manual carpentry errors." },
  { title: "Exact Millimeter Precision", desc: "Computer-controlled precision cutting guarantees 100% gapless joint fittings." },
  { title: "BWP Grade Materials", desc: "Calibrated boiling waterproof plywood, HDMR, and anti-fingerprint laminates." },
  { title: "30-Day Guaranteed Delivery", desc: "Standardized factory production workflows eliminate unpredictable site delays." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-navy text-white py-28 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3">
              The Vishwateja Standard
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Precision You Can See. Quality You Can Trust.
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-goldDark mx-auto mt-4 rounded-full" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant="fadeUp">
              <div className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-lg">
                  ✓
                </div>
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}