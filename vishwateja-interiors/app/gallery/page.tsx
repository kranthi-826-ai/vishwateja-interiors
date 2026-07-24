"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const categories = ["All", "Kitchen", "Bedroom", "Living Room", "Ceiling"];

const projects = [
  { name: "Modular Kitchen — Kollur Villa", category: "Kitchen", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
  { name: "Wardrobe Suite — Gajularamaram", category: "Bedroom", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" },
  { name: "TV Unit — Miyapur", category: "Living Room", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { name: "False Ceiling — Quthbullapur", category: "Ceiling", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="pt-36 pb-28 bg-warmwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-12">
            <span className="inline-block text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3 px-4 py-1.5 rounded-full bg-navy/5 border border-gold/30">
              Our Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy">Project Gallery</h1>
            <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto font-light">
              Explore our machine-crafted modular interiors installed across luxury residences in Hyderabad.
            </p>
          </div>
        </Reveal>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                active === c
                  ? "bg-navy text-gold shadow-md scale-105 border border-gold/30"
                  : "bg-white text-navy border border-graylight hover:border-gold/50 hover:bg-gold/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} variant="scaleIn">
              <div
                onClick={() => setLightbox(p.img)}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ring-1 ring-transparent hover:ring-gold/40"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-medium bg-gold/15 px-3 py-1 rounded-full backdrop-blur-md border border-gold/30">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{p.name}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-navy/95 backdrop-blur-xl z-50 flex items-center justify-center p-6 cursor-zoom-out animate-[fadeIn_0.3s_ease]"
          >
            <div className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold/40">
              <img src={lightbox} alt="Project detail" className="max-h-[85vh] w-auto max-w-full object-contain" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy/80 text-white flex items-center justify-center border border-white/20 hover:bg-gold hover:text-navy transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}