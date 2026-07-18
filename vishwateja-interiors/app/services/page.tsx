import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const services = [
  {
    name: "Modular Kitchens",
    desc: "Machine-cut precision cabinetry with smart storage, premium finishes, and durable hardware.",
    icon: "🍽️",
  },
  {
    name: "Bedroom Wardrobes",
    desc: "Sliding, hinged, and walk-in wardrobe solutions tailored to your room's exact dimensions.",
    icon: "🚪",
  },
  {
    name: "TV Units & Entertainment Panels",
    desc: "Statement-piece media units combining function, cable management, and premium aesthetics.",
    icon: "📺",
  },
  {
    name: "Crockery Units",
    desc: "Elegant display and storage units built for daily use and long-term durability.",
    icon: "🍶",
  },
  {
    name: "Custom Furniture",
    desc: "Beds, study units, and bespoke furniture pieces manufactured to your exact specification.",
    icon: "🛋️",
  },
  {
    name: "False Ceiling Works",
    desc: "Gypsum and POP false ceiling designs with integrated lighting layouts.",
    icon: "💡",
  },
  {
    name: "Interior Designing",
    desc: "Full-space design planning — layout, material selection, and 3D visualization.",
    icon: "📐",
  },
  {
    name: "Complete Home Interior Solutions",
    desc: "End-to-end interior execution for 1BHK to 6BHK homes, managed from design to delivery.",
    icon: "🏠",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="text-royal font-medium tracking-widest text-sm mb-4">
            WHAT WE DO
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Our Services</h1>
          <p className="text-graylight max-w-2xl mx-auto">
            From a single wardrobe to a fully furnished home — every service
            is delivered with machine-crafted precision.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.name}>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-medium text-navy mb-2">{s.name}</h3>
              <p className="text-sm text-navy/70">{s.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button href="/get-quote">Get a Free Estimate</Button>
        </div>
      </section>
    </>
  );
}