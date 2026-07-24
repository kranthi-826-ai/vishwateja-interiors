"use client";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useState, MouseEvent } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative bg-navy text-white min-h-[90vh] pt-32 pb-24 overflow-hidden flex items-center"
    >
      {/* Background Architectural Patterns & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal rounded-full blur-[140px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
        />
        <div
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold/15 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
        />
        <svg className="absolute inset-0 w-full h-full stroke-white/5" width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column Text Content */}
        <div className="md:col-span-7">
          <Reveal variant="fadeUp">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold font-medium tracking-[0.25em] text-xs uppercase">
                Vishwateja Interiors Hyderabad
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              Machine-Crafted Precision.
              <br />
              <span className="text-gold italic font-normal">Timeless Interior Excellence.</span>
            </h1>

            <p className="text-white/75 text-base sm:text-lg mb-10 max-w-xl leading-relaxed font-light">
              Premium modular kitchens, wardrobes, and complete home interiors —
              engineered with German & Italian automated machinery, not just manual labor.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Button href="tel:9885034309" variant="primary" className="text-base px-8 py-4">
                Call Now (9885034309)
              </Button>
              <Button href="/get-quote" variant="outline" className="text-base px-8 py-4">
                Get Free Estimate →
              </Button>
            </div>

            {/* Counter Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-4xl font-bold text-gold"
                >
                  500+
                </motion.p>
                <p className="text-xs text-white/60 tracking-wider uppercase mt-1">Projects Delivered</p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-3xl sm:text-4xl font-bold text-gold"
                >
                  10+
                </motion.p>
                <p className="text-xs text-white/60 tracking-wider uppercase mt-1">Years of Craft</p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-gold"
                >
                  100%
                </motion.p>
                <p className="text-xs text-white/60 tracking-wider uppercase mt-1">Machine Finish</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column Image Stage with 3D Depth */}
        <div className="md:col-span-5 relative">
          <Reveal variant="scaleIn" delay={200}>
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold/30 transition-transform duration-700 ease-out group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Premium modular interior by Vishwateja Interiors"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-lg">
                    ✨
                  </div>
                  <div>
                    <p className="text-xs text-gold font-medium uppercase tracking-wider">Hyderabad Luxury Homes</p>
                    <p className="text-sm text-white font-medium">100% Factory Finished Modular Units</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}