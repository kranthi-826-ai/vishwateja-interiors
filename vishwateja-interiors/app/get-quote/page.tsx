import Button from "@/components/ui/Button";
import CostEstimator from "@/components/estimator/CostEstimator";
import Reveal from "@/components/ui/Reveal";

export default function GetQuotePage() {
  return (
    <section className="pt-36 pb-28 bg-warmwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-navy/5 border border-gold/30">
              Interactive Estimator
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy">
              Get Your Free Estimate
            </h1>
            <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto font-light">
              Use our instant estimator below, or submit your site details directly for a tailored architectural quotation.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Configurator Column */}
          <div className="md:col-span-6">
            <Reveal variant="fadeLeft">
              <CostEstimator />
            </Reveal>
          </div>

          {/* Direct Lead Form Column */}
          <div className="md:col-span-6">
            <Reveal variant="fadeRight" delay={150}>
              <form
                id="lead-form"
                className="space-y-5 bg-white border border-graylight/80 rounded-3xl p-8 sm:p-10 shadow-xl hover:border-gold/30 transition-all duration-500"
                action="/api/leads"
                method="POST"
              >
                <div className="border-b border-graylight/60 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-navy">Direct Site Enquiry</h3>
                  <p className="text-xs text-navy/50 mt-1 font-light">Our team will call to schedule a free 3D site measurement</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-graylight rounded-xl px-4 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
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
                    className="w-full border border-graylight rounded-xl px-4 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Primary Service Needed
                  </label>
                  <select
                    name="service"
                    className="w-full border border-graylight rounded-xl px-4 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  >
                    <option>Modular Kitchen</option>
                    <option>Wardrobes</option>
                    <option>TV Unit</option>
                    <option>Complete Home Interior</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
                    Site Location & Additional Details
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Mention floor plan layout (e.g. 3BHK Villa in Gachibowli), possession date..."
                    className="w-full border border-graylight rounded-xl px-4 py-3.5 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Anti-spam honeypot */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <Button type="submit" variant="primary" className="w-full py-4 text-base mt-2">
                  Submit Estimate Request →
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}