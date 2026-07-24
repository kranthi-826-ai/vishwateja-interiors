import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const testimonials = [
  {
    quote: "The precision on our modular kitchen was unlike anything we'd seen from other local contractors. German hardware and zero site mess.",
    name: "Venkat Madhav",
    location: "Kollur Villa, Hyderabad",
    rating: 5,
  },
  {
    quote: "On-time delivery and flawless factory finish. The floor-to-ceiling wardrobes fit perfectly into our alcoves without any manual trims.",
    name: "Site Client",
    location: "Gajularamaram, Hyderabad",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy text-white py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-royal/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3">
              Client Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Trusted By Homeowners
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-goldDark mx-auto mt-4 rounded-full" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} variant="fadeUp">
              <div className="relative bg-white/5 border border-gold/20 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col justify-between">
                <div className="text-gold text-5xl font-serif leading-none mb-4 opacity-40">“</div>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-lg font-bold text-gold">{t.name}</p>
                    <p className="text-xs text-white/50">{t.location}</p>
                  </div>
                  <div className="flex gap-1 text-gold text-sm">
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} variant="fadeUp">
          <div className="text-center">
            <Button href="/get-quote" variant="primary" className="text-base px-9 py-4">
              Get Your Free Estimate →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}