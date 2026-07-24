import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <section className="pt-36 pb-28 bg-warmwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-navy/5 border border-gold/30">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy">Contact Our Studio</h1>
            <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto font-light">
              Speak directly with our modular interior specialists for your home or villa project in Hyderabad.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="md:col-span-7">
            <Reveal variant="fadeLeft">
              <form
                className="space-y-6 bg-white border border-graylight/80 rounded-3xl p-8 sm:p-10 shadow-xl hover:border-gold/30 transition-all duration-500"
                action="/api/leads"
                method="POST"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-graylight rounded-xl px-5 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Mobile Number *
                  </label>
                  <input
                    name="mobile"
                    required
                    placeholder="Enter 10-digit mobile number"
                    className="w-full border border-graylight rounded-xl px-5 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Project Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your home floor plan, timeline, or specific requirements..."
                    className="w-full border border-graylight rounded-xl px-5 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Anti-spam honeypot */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <Button type="submit" variant="primary" className="w-full py-4 text-base">
                  Send Consultation Request →
                </Button>
              </form>
            </Reveal>
          </div>

          {/* Contact Details & Map */}
          <div className="md:col-span-5 space-y-8">
            <Reveal variant="fadeRight" delay={150}>
              <div className="bg-navy text-white rounded-3xl p-8 shadow-xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-royal/40 rounded-bl-full blur-xl pointer-events-none" />

                <h3 className="text-xl font-bold text-gold mb-6 border-b border-white/10 pb-4">
                  Direct Studio Details
                </h3>

                <div className="space-y-5 text-sm font-light">
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-white/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">📞</span>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Phone</p>
                      <a href="tel:9885034309" className="text-white hover:text-gold transition-colors font-medium">9885034309</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-white/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">✉️</span>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Email</p>
                      <a href="mailto:info@vishwatejainteriors.com" className="text-white hover:text-gold transition-colors font-medium">info@vishwatejainteriors.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-white/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">📍</span>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Factory & Studio</p>
                      <p className="text-white/80 leading-relaxed mt-0.5">Plot No. 6-567, Devendar Nagar, Gajularamaram, Quthbullapur, Hyderabad – 500055</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fadeRight" delay={250}>
              <div className="aspect-video rounded-3xl overflow-hidden border border-graylight shadow-xl ring-1 ring-gold/20">
                <iframe
                  title="Vishwateja Interiors Location"
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Gajularamaram,+Quthbullapur,+Hyderabad&output=embed"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}