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
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <div className="text-center mb-10">
          <p className="text-royal font-medium tracking-widest text-sm mb-2">
            OUR WORK
          </p>
          <h1 className="text-4xl font-semibold text-navy">Project Gallery</h1>
        </div>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === c
                ? "bg-navy text-white scale-105"
                : "bg-graylight text-navy hover:bg-navy/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-medium">
                {p.name}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}