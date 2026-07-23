import Reveal from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <p className="text-gold font-medium tracking-[0.2em] text-sm mb-4 uppercase">About Us</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Built On Precision. Driven By Machinery.
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              VISHWATEJA INTERIORS was founded on a simple belief — that premium
              interiors deserve machine-grade precision, not just manual
              craftsmanship. Every wardrobe, kitchen, and unit we build reflects
              that standard.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 bg-warmwhite">
        <Reveal>
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Our Story</h2>
            <p className="text-navy/60 leading-relaxed mb-4">
              Led by Yellanki Paripurna Chary, VISHWATEJA INTERIORS grew from
              hands-on furnishing and carpentry work into a full-scale modular
              interior manufacturing company based in Hyderabad.
            </p>
            <p className="text-navy/60 leading-relaxed">
              Today, we combine modern automated machinery with experienced
              design sensibility — delivering interiors that are precise,
              durable, and genuinely premium.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Our Mission</h2>
            <p className="text-navy/60 leading-relaxed mb-4">
              To bring factory-grade precision and transparent, professional
              service to a market still dominated by inconsistent, manual-only
              contractors.
            </p>
            <p className="text-navy/60 leading-relaxed">
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