import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <p className="text-gold font-medium tracking-[0.2em] text-sm mb-4 uppercase">
              Vishwateja Interiors
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Machine-Crafted Precision.
              <br />
              <span className="text-gold">Timeless Interior Excellence.</span>
            </h1>
            <p className="text-white/70 mb-8 max-w-md">
              Premium modular kitchens, wardrobes, and complete home interiors —
              built with modern machinery, not just manual labor.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:9885034309"
                className="bg-gold text-navy px-6 py-3 rounded-full font-medium hover:bg-goldDark hover:text-white hover:scale-105 transition-all duration-300"
              >
                Call Now
              </a>
              <Link
                href="/get-quote"
                className="border border-gold/50 text-gold px-6 py-3 rounded-full font-medium hover:bg-gold/10 hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-semibold text-gold">500+</p>
                <p className="text-xs text-white/50 tracking-wide">Projects Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gold">10+</p>
                <p className="text-xs text-white/50 tracking-wide">Years of Craft</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gold">100%</p>
                <p className="text-xs text-white/50 tracking-wide">Machine Precision</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group ring-1 ring-gold/20">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Premium modular interior by Vishwateja Interiors"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}