export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">VISHWATEJA INTERIORS</h3>
          <p className="text-sm text-white/60">
            Machine-Crafted Precision. Timeless Interior Excellence.
          </p>
        </div>

        <div className="text-sm text-white/60 space-y-1">
          <p>Plot No. 6-567, Devendar Nagar,</p>
          <p>Gajularamaram, Quthbullapur,</p>
          <p>Hyderabad – 500055, Telangana</p>
        </div>

        <div className="text-sm text-white/60 space-y-1">
          <p>📞 9885034309</p>
          <p>✉️ info@vishwatejainteriors.com</p>
        </div>
      </div>

      <div className="border-t border-white/10 flex items-center justify-center gap-4 text-center text-xs text-white/40 py-4">
        <span>© {new Date().getFullYear()} Vishwateja Interiors. All rights reserved.</span>
        <a href="/admin/login" className="hover:text-gold transition-colors duration-300">Admin</a>
      </div>
    </footer>
  );
}