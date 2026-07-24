import Reveal from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal rounded-full blur-[160px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Reveal variant="fadeUp">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30">
              About Vishwateja Interiors
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Built On Precision. Driven By Machinery.
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              VISHWATEJA INTERIORS was founded on a simple belief — that premium
              interiors deserve machine-grade precision, not just manual
              craftsmanship. Every wardrobe, kitchen, and unit we build reflects
              that standard.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 bg-warmwhite">
        <Reveal variant="fadeLeft">
          <div className="bg-white border border-graylight/80 rounded-3xl p-10 shadow-lg hover:border-gold/40 transition-all duration-500">
            <h2 className="text-2xl font-bold text-navy mb-4 border-b border-graylight pb-3">
              Our Story
            </h2>
            <p className="text-navy/70 leading-relaxed mb-4 text-sm font-light">
              Led by Yellanki Paripurna Chary, VISHWATEJA INTERIORS grew from
              hands-on furnishing and carpentry work into a full-scale modular
              interior manufacturing company based in Hyderabad.
            </p>
            <p className="text-navy/70 leading-relaxed text-sm font-light">
              Today, we combine modern automated machinery with experienced
              design sensibility — delivering interiors that are precise,
              durable, and genuinely premium.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} variant="fadeRight">
          <div className="bg-white border border-graylight/80 rounded-3xl p-10 shadow-lg hover:border-gold/40 transition-all duration-500">
            <h2 className="text-2xl font-bold text-navy mb-4 border-b border-graylight pb-3">
              Our Mission
            </h2>
            <p className="text-navy/70 leading-relaxed mb-4 text-sm font-light">
              To bring factory-grade precision and transparent, professional
              service to a market still dominated by inconsistent, manual-only
              contractors.
            </p>
            <p className="text-navy/70 leading-relaxed text-sm font-light">
              Every project — from a single wardrobe to a complete home
              interior — is executed with the same discipline and attention to
              detail.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}