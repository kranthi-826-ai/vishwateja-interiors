import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const projects = [
  {
    name: "Modular Kitchen — Kollur Villa",
    location: "Kollur, Hyderabad",
    type: "German Finish Kitchen",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Wardrobe Suite — Gajularamaram",
    location: "Gajularamaram, Hyderabad",
    type: "Sliding Glass Wardrobe",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "TV Unit & Ceiling — Miyapur",
    location: "Miyapur, Hyderabad",
    type: "Fluted Panel Media Lounge",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-28 bg-warmwhite">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3">
                Selected Portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-royal hover:text-navy group"
            >
              <span>Explore Full Gallery</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 120} variant="scaleIn">
              <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-medium bg-gold/15 px-3 py-1 rounded-full backdrop-blur-md border border-gold/30">
                    {p.type}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light">
                    {p.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}