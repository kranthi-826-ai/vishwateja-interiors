import QuoteWizard from "@/components/estimator/QuoteWizard";
import Reveal from "@/components/ui/Reveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Estimate & Architectural Quote | Vishwateja Interiors",
  description: "Complete our interactive step-by-step quote wizard with email OTP verification for custom architectural interior design in Hyderabad.",
};

export default function GetQuotePage() {
  return (
    <section className="pt-36 pb-28 bg-warmwhite min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-12">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-navy/5 border border-gold/30">
              Architectural Quote Wizard
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy">
              Get Your Interior Estimate
            </h1>
            <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto font-light">
              Select your property layout, scope, and material preferences below for an itemized architectural quotation.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fadeUp" delay={150}>
          <div id="quote-wizard">
            <QuoteWizard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}