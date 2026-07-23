import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-warmwhite">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] text-sm mb-2 uppercase">Get In Touch</p>
          <h1 className="text-4xl font-semibold text-navy">Contact Us</h1>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16">
        <Reveal>
          <form className="space-y-5 bg-white border border-graylight rounded-2xl p-8" action="/api/leads" method="POST">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Name</label>
              <input name="name" required className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Mobile</label>
              <input name="mobile" required className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Message</label>
              <textarea name="message" rows={4} className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300" />
            </div>
            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <Button type="submit">Send Message</Button>
          </form>
        </Reveal>

        <Reveal delay={200}>
          <div>
            <div className="space-y-4 mb-8 text-navy">
              <p className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <a href="tel:9885034309" className="hover:text-goldDark transition-colors duration-300">9885034309</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <a href="mailto:info@vishwatejainteriors.com" className="hover:text-goldDark transition-colors duration-300">info@vishwatejainteriors.com</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">📍</span>
                Plot No. 6-567, Devendar Nagar, Gajularamaram, Quthbullapur, Hyderabad – 500055
              </p>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden border border-graylight ring-1 ring-gold/10">
              <iframe
                title="Vishwateja Interiors Location"
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Gajularamaram,+Quthbullapur,+Hyderabad&output=embed"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}