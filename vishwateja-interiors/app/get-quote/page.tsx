import Button from "@/components/ui/Button";
import CostEstimator from "@/components/estimator/CostEstimator";

export default function GetQuotePage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-royal font-medium tracking-widest text-sm mb-2">
          GET STARTED
        </p>
        <h1 className="text-4xl font-semibold text-navy">
          Get Your Free Estimate
        </h1>
        <p className="text-navy/60 mt-3 max-w-xl mx-auto">
          Use the calculator for an instant estimate, or send us your details
          directly for a personalized quote.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <CostEstimator />

        <form
          id="lead-form"
          className="space-y-5"
          action="/api/leads"
          method="POST"
        >
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Name</label>
            <input
              name="name"
              required
              className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal transition-colors duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Mobile</label>
            <input
              name="mobile"
              required
              className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal transition-colors duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Service Interested
            </label>
            <select
              name="service"
              className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal transition-colors duration-300"
            >
              <option>Modular Kitchen</option>
              <option>Wardrobes</option>
              <option>TV Unit</option>
              <option>Complete Home Interior</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal transition-colors duration-300"
            />
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </div>
    </section>
  );
}