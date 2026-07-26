import CostEstimator from "@/components/estimator/CostEstimator";
import QuoteWizard from "@/components/estimator/QuoteWizard";
import Reveal from "@/components/ui/Reveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Estimate & Quote Wizard | Vishwateja Interiors",
  description: "Calculate instant interior estimates or complete our step-by-step quote wizard with email OTP verification for custom architectural interior design.",
};

export default function GetQuotePage() {
  return (
    <section className="pt-36 pb-28 bg-warmwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-navy/5 border border-gold/30">
              Interactive Estimator & Wizard
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy">
              Get Your Interior Estimate
            </h1>
            <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto font-light">
              Use our instant cost configurator below, or complete our step-by-step quote wizard for an itemized architectural proposal.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Configurator Column */}
          <div className="lg:col-span-5">
            <Reveal variant="fadeLeft">
              <CostEstimator />
            </Reveal>
          </div>

          {/* Multi-Step Wizard Column */}
          <div className="lg:col-span-7" id="quote-wizard">
            <Reveal variant="fadeRight" delay={150}>
              <QuoteWizard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}