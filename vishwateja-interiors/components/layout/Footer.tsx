export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">VISHWATEJA INTERIORS</h3>
          <p className="text-sm text-graylight">
            Machine-Crafted Precision. Timeless Interior Excellence.
          </p>
        </div>

        <div className="text-sm text-graylight space-y-1">
          <p>Plot No. 6-567, Devendar Nagar,</p>
          <p>Gajularamaram, Quthbullapur,</p>
          <p>Hyderabad – 500055, Telangana</p>
        </div>

        <div className="text-sm text-graylight space-y-1">
          <p>📞 9885034309</p>
          <p>✉️ info@vishwatejainteriors.com</p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-graylight py-4">
        © {new Date().getFullYear()} Vishwateja Interiors. All rights reserved.
      </div>
    </footer>
  );
}