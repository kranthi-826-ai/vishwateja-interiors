import Reveal from "@/components/ui/Reveal";

const testimonials = [
  { quote: "The precision on our modular kitchen was unlike anything we'd seen from other local contractors.", name: "Venkat Madhav", location: "Kollur Villa" },
  { quote: "On-time delivery and clean finish. The wardrobes fit perfectly, no adjustments needed.", name: "Site Client", location: "Gajularamaram" },
];

export default function Testimonials() {
  return (
    <section className="bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold font-medium tracking-[0.2em] text-sm mb-2 uppercase">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">Trusted By Homeowners</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 150}>
              <div className="bg-white/5 border border-gold/20 rounded-2xl p-8 hover:bg-white/10 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
                <p className="text-white/80 mb-6 leading-relaxed">"{t.quote}"</p>
                <p className="font-medium text-gold">{t.name}</p>
                <p className="text-sm text-white/50">{t.location}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="text-center">
            <a
              href="/get-quote"
              className="inline-block bg-gold text-navy px-8 py-4 rounded-full font-medium hover:bg-goldDark hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Your Free Estimate
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}