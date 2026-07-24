import Reveal from "@/components/ui/Reveal";

const services = [
  {
    name: "Modular Kitchens",
    desc: "Precision acrylic & laminate finishes with German soft-close hardware.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12a2.25 2.25 0 002.25-2.25V3m-16.5 0h16.5m-16.5 0l-1.5 16.5A2.25 2.25 0 004.5 21.75h15a2.25 2.25 0 002.25-2.25L20.25 3" />
      </svg>
    ),
  },
  {
    name: "Bedroom Wardrobes",
    desc: "Floor-to-ceiling sliding & floor hinged wardrobes with LED sensor profile lights.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.75a.75.75 0 00-.75-.75h-15a.75.75 0 00-.75.75V21h4.5m10.5 0H8.25" />
      </svg>
    ),
  },
  {
    name: "TV Units & Entertainment Panels",
    desc: "Fluted panel backdrops, concealed wiring, and floating marble-finish consoles.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-6-3v3m-6.9-6h13.8c.5 0 .9-.4.9-.9V6c0-.5-.4-.9-.9-.9H5.1c-.5 0-.9.4-.9.9v10.35c0 .5.4.9.9.9z" />
      </svg>
    ),
  },
  {
    name: "Crockery Units",
    desc: "Tinted glass doors, gold aluminum profiles, and ambient internal warm lighting.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.501.08-.75.128M9.75 3.104l6.096 17.794M14.25 3.104v5.714a2.25 2.25 0 00.659 1.591L19 14.5" />
      </svg>
    ),
  },
  {
    name: "Custom Furniture",
    desc: "Bespoke beds, study desks, and vanity counters tailored to room architecture.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m16.5 0h-16.5m16.5 0l-1.5-4.5h-13.5l-1.5 4.5" />
      </svg>
    ),
  },
  {
    name: "False Ceiling Works",
    desc: "Saint-Gobain gypsum ceilings with magnetic track lights and cove lighting.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 2.625a3.375 3.375 0 00-3.75-3.375m3.75 3.375A3.375 3.375 0 0112 12m0 0V3m0 0a6.01 6.01 0 001.5.189m-1.5-.189a6.01 6.01 0 01-1.5.189" />
      </svg>
    ),
  },
  {
    name: "Interior Designing",
    desc: "3D walkthrough renders, material board selection, and space optimization.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    name: "Complete Home Interiors",
    desc: "Turnkey execution for 2BHK to 5BHK villas & apartments across Hyderabad.",
    icon: (
      <svg className="w-7 h-7 stroke-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-28 bg-warmwhite relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fadeUp">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-[0.25em] text-xs uppercase mb-3">
              Craftsmanship & Capability
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Our Architectural Services
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-goldDark mx-auto mt-4 rounded-full" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} variant="fadeUp">
              <div className="group relative bg-white border border-graylight/80 rounded-2xl p-7 hover:border-gold/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full transition-all duration-500 group-hover:scale-125" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-warmwhite border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold transition-all duration-300 shadow-sm">
                    {s.icon}
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-goldDark transition-colors duration-300">
                    {s.name}
                  </h3>

                  <p className="text-xs text-navy/60 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-gold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}