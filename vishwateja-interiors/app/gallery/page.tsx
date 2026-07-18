"use client";
import { useState } from "react";

const categories = ["All", "Kitchen", "Bedroom", "Living Room", "Ceiling"];

const projects = [
  { name: "Modular Kitchen — Kollur Villa", category: "Kitchen", img: "/images/project-1.jpg" },
  { name: "Wardrobe Suite — Gajularamaram", category: "Bedroom", img: "/images/project-2.jpg" },
  { name: "TV Unit — Miyapur", category: "Living Room", img: "/images/project-3.jpg" },
  { name: "False Ceiling — Quthbullapur", category: "Ceiling", img: "/images/project-4.jpg" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <p className="text-royal font-medium tracking-widest text-sm mb-2">
          OUR WORK
        </p>
        <h1 className="text-4xl font-semibold text-navy">Project Gallery</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              active === c
                ? "bg-navy text-white"
                : "bg-graylight text-navy hover:bg-navy/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.name}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white font-medium">
              {p.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}