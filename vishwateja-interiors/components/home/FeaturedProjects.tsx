import Link from "next/link";

const projects = [
  { name: "Modular Kitchen — Kollur Villa", img: "/images/project-1.jpg" },
  { name: "Wardrobe Suite — Gajularamaram", img: "/images/project-2.jpg" },
  { name: "TV Unit & Ceiling — Miyapur", img: "/images/project-3.jpg" },
];

export default function FeaturedProjects() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
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

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
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