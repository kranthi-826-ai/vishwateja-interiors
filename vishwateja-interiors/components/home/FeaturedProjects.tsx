import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const projects = [
  {
    name: "Modular Kitchen — Kollur Villa",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Wardrobe Suite — Gajularamaram",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "TV Unit & Ceiling — Miyapur",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-royal font-medium tracking-widest text-sm mb-2">
              OUR WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden md:inline-block text-royal font-medium hover:underline"
          >
            View Full Gallery →
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 150}>
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