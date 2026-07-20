import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <p className="text-royal font-medium tracking-widest text-sm mb-4">
              VISHWATEJA INTERIORS
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Machine-Crafted Precision.
              <br />
              Timeless Interior Excellence.
            </h1>
            <p className="text-graylight mb-8 max-w-md">
              Premium modular kitchens, wardrobes, and complete home interiors —
              built with modern machinery, not just manual labor.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:9885034309"
                className="bg-white text-navy px-6 py-3 rounded-full font-medium hover:bg-graylight hover:scale-105 transition-all duration-300"
              >
                Call Now
              </a>
              <Link
                href="/get-quote"
                className="border border-white/40 px-6 py-3 rounded-full font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Premium modular interior by Vishwateja Interiors"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}