import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-32 relative overflow-hidden border-t border-gold/20">
      {/* Subtle gold lighting glow at top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 relative z-10">
        <div>
          <h3 className="font-heading text-xl font-semibold mb-3 text-gradient-gold tracking-wide">
            VISHWATEJA INTERIORS
          </h3>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            Machine-Crafted Precision. Timeless Interior Excellence. Premium modular kitchens, wardrobes & luxury home interiors in Hyderabad.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-gold/80 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            HYDERABAD, TELANGANA
          </div>
        </div>

        <div className="text-sm text-white/70 space-y-2.5">
          <p className="font-semibold text-white text-base mb-3 border-b border-white/10 pb-2 inline-block">
            Workshop & Office
          </p>
          <p className="leading-relaxed">Plot No. 6-567, Devendar Nagar,</p>
          <p className="leading-relaxed">Gajularamaram, Quthbullapur,</p>
          <p className="leading-relaxed">Hyderabad – 500055, Telangana</p>
        </div>

        <div className="text-sm text-white/70 space-y-3">
          <p className="font-semibold text-white text-base mb-3 border-b border-white/10 pb-2 inline-block">
            Direct Contact
          </p>
          <p className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-white/5 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">📞</span>
            <a href="tel:9885034309" className="hover:text-gold transition-colors duration-300">9885034309</a>
          </p>
          <p className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-white/5 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">✉️</span>
            <a href="mailto:info@vishwatejainteriors.com" className="hover:text-gold transition-colors duration-300">info@vishwatejainteriors.com</a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Vishwateja Interiors. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gold transition-colors duration-300">Privacy Policy</Link>
          <Link href="/admin/login" className="hover:text-gold transition-colors duration-300 font-medium">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}