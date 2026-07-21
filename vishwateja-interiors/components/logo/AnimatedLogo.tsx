"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./AnimatedLogo.module.css";

type AnimatedLogoProps = {
  /** If true, this instance sits in the Hero and shrinks into the navbar on scroll */
  heroMode?: boolean;
  className?: string;
};

export default function AnimatedLogo({ heroMode = false, className = "" }: AnimatedLogoProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<SVGCircleElement>(null);
  const shineRef = useRef<SVGRectElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // CSS handles the simple-fade fallback

    const isMobile = window.innerWidth < 768;
    const totalDuration = isMobile ? 2.2 : 3.8;

    const strokePaths = svgWrapRef.current
      ? Array.from(svgWrapRef.current.querySelectorAll<SVGPathElement>("path.animated-stroke"))
      : [];

    // Sort paths top-to-bottom, left-to-right by bounding box so the draw
    // order follows the natural shape rather than raw file order.
    strokePaths.sort((a, b) => {
      const ba = a.getBBox();
      const bb = b.getBBox();
      return ba.y - bb.y || ba.x - bb.x;
    });

    strokePaths.forEach((p) => {
      const length = p.getTotalLength();
      p.style.strokeDasharray = `${length}`;
      p.style.strokeDashoffset = `${length}`;
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Scene 1 — ambient pause
    tl.to({}, { duration: 0.3 });

    // Scene 2 — sparkle
    if (sparkleRef.current) {
      tl.to(sparkleRef.current, { opacity: 1, duration: 0.25 }, ">")
        .to(sparkleRef.current, { opacity: 0, duration: 0.3 }, ">0.1");
    }

    // Scene 3 — draw the mark, sorted order, natural pacing
    const drawDuration = totalDuration * 0.5;
    tl.to(
      strokePaths,
      {
        strokeDashoffset: 0,
        duration: drawDuration,
        stagger: drawDuration / Math.max(strokePaths.length, 1),
        ease: "power1.inOut",
      },
      ">"
    );

    // Scene 4 — gold shine sweep, single pass
    if (shineRef.current) {
      tl.fromTo(
        shineRef.current,
        { opacity: 0, x: -60 },
        { opacity: 0.8, x: 220, duration: 0.9, ease: "power2.inOut" },
        ">-0.2"
      ).to(shineRef.current, { opacity: 0, duration: 0.3 }, ">-0.2");
    }

    // Scene 6/7 — wordmark
    if (word1Ref.current) {
      tl.fromTo(
        word1Ref.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        ">-0.3"
      );
    }
    if (word2Ref.current) {
      tl.fromTo(
        word2Ref.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        ">-0.35"
      );
    }

    // Scene 8 — tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power1.out" },
        ">-0.1"
      );
    }

    // Scene 9 — infinite breathing, near-imperceptible
    if (svgWrapRef.current) {
      tl.to(
        svgWrapRef.current,
        {
          scale: 1.006,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "center center",
        },
        ">"
      );
    }

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Scroll behaviour — hero logo shrinks smoothly as user scrolls (heroMode only)
  useEffect(() => {
    if (!heroMode || reducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shrink = Math.max(0.55, 1 - scrollY / 600);
      const translate = Math.min(scrollY / 4, 40);
      gsap.to(stageRef.current, {
        scale: shrink,
        y: -translate,
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroMode, reducedMotion]);

  return (
    <div
      ref={stageRef}
      className={`${styles.stage} ${className}`}
      style={{ transformOrigin: "left center" }}
    >
      <div ref={svgWrapRef} className={styles.svgWrap}>
        <svg
          className={styles.svg}
          viewBox="0 0 260 300"
          height={heroMode ? 130 : 60}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vtGoldGradCine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E3C17A" />
              <stop offset="50%" stopColor="#D4AF6A" />
              <stop offset="100%" stopColor="#8A6A3F" />
            </linearGradient>
            <linearGradient id="vtShineCine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Crown */}
          <path
            className={`${styles.goldStroke} animated-stroke`}
            d="M 95 55 L 108 28 L 122 50 L 135 15 L 148 50 L 162 28 L 175 55"
          />
          {/* Ears */}
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 68 105 C 40 95, 25 125, 40 150 C 52 168, 75 160, 80 140"
          />
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 200 103 C 230 91, 248 122, 232 150 C 219 169, 194 160, 188 140"
          />
          {/* Face */}
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 68 105 C 72 68, 195 65, 200 103 C 203 124, 183 138, 162 140"
          />
          {/* Trunk */}
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 162 140 C 174 150, 150 165, 138 185 C 126 205, 145 225, 165 213 C 178 205, 170 192, 156 195"
          />
          {/* Hand */}
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 55 175 L 50 130 M 60 175 L 58 128 M 68 175 L 68 130 M 76 175 L 78 132 M 48 190 C 45 175, 55 168, 68 168 C 80 168, 88 178, 82 195"
          />
          {/* Seated body */}
          <path
            className={`${styles.navyStroke} animated-stroke`}
            d="M 95 220 C 65 235, 50 270, 70 295 C 90 318, 130 310, 140 285 M 185 220 C 215 235, 230 270, 210 295 C 190 318, 150 310, 140 285 M 140 285 C 140 300, 140 310, 140 315"
          />

          {/* Sparkle accent (scene 2) */}
          <circle ref={sparkleRef} className={styles.sparkle} cx="135" cy="10" r="3.5" fill="#D4AF6A" />

          {/* Modak */}
          <ellipse cx="200" cy="205" rx="13" ry="9" fill="url(#vtGoldGradCine)" />

          {/* Gold shine sweep (scene 4) */}
          <rect ref={shineRef} className={styles.shineRect} x="0" y="0" width="26" height="300" fill="url(#vtShineCine)" />
        </svg>
      </div>

      <div className={styles.textCol}>
        <span
          ref={word1Ref}
          className={styles.word1}
          style={{ fontSize: heroMode ? 32 : 18 }}
        >
          VISHWATEJA
        </span>
        <span
          ref={word2Ref}
          className={styles.word2}
          style={{ fontSize: heroMode ? 24 : 13 }}
        >
          INTERIORS
        </span>
        {heroMode && (
          <span ref={taglineRef} className={styles.tagline} style={{ fontSize: 12 }}>
            Machine-Crafted Precision. Timeless Interior Excellence.
          </span>
        )}
      </div>
    </div>
  );
}