import Button from "@/components/ui/Button";
import CostEstimator from "@/components/estimator/CostEstimator";
import Reveal from "@/components/ui/Reveal";

export default function GetQuotePage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-warmwhite">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] text-sm mb-2 uppercase">Get Started</p>
          <h1 className="text-4xl font-semibold text-navy">Get Your Free Estimate</h1>
          <p className="text-navy/60 mt-3 max-w-xl mx-auto">
            Use the calculator for an instant estimate, or send us your details directly for a personalized quote.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12">
        <Reveal><CostEstimator /></Reveal>

        <Reveal delay={150}>
          <form id="lead-form" className="space-y-5 bg-white border border-graylight rounded-2xl p-8" action="/api/leads" method="POST">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Name</label>
              <input name="name" required className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Mobile</label>
              <input name="mobile" required className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Service Interested</label>
              <select name="service" className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300">
                <option>Modular Kitchen</option>
                <option>Wardrobes</option>
                <option>TV Unit</option>
                <option>Complete Home Interior</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Message</label>
              <textarea name="message" rows={4} className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <Button type="submit">Submit Request</Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}