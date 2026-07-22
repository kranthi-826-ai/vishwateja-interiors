import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-royal font-medium tracking-widest text-sm mb-2">
          GET IN TOUCH
        </p>
        <h1 className="text-4xl font-semibold text-navy">Contact Us</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Form */}
        <form className="space-y-5" action="/api/leads" method="POST">
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
            <label className="block text-sm font-medium text-navy mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal transition-colors duration-300"
            />
          </div>
          <Button type="submit">Send Message</Button>
        <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        </form>

        {/* Info + Map */}
        <div>
          <div className="space-y-4 mb-8 text-navy">
            <p>📞 <a href="tel:9885034309" className="hover:text-royal">9885034309</a></p>
            <p>✉️ <a href="mailto:info@vishwatejainteriors.com" className="hover:text-royal">info@vishwatejainteriors.com</a></p>
            <p>📍 Plot No. 6-567, Devendar Nagar, Gajularamaram, Quthbullapur, Hyderabad – 500055</p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden border border-graylight">
            <iframe
              title="Vishwateja Interiors Location"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Gajularamaram,+Quthbullapur,+Hyderabad&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}