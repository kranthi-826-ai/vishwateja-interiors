"use client";
import { useEffect, useRef, useState } from "react";

type Bird = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  size: number;
  wingPhase: number;
  wingSpeed: number;
  colorIdx: number;
  alpha: number;
};

// Gold, Cyan, White shimmer palettes — visible on both navy & warmwhite backgrounds
const PALETTE = [
  { body: "#D4AF37", wing: "#FDE68A", glow: "rgba(212,175,55,0.35)" },   // Rich Gold
  { body: "#38BDF8", wing: "#BAE6FD", glow: "rgba(56,189,248,0.30)" },    // Sky Cyan
  { body: "#F5F5F5", wing: "#E0E7FF", glow: "rgba(255,255,255,0.30)" },   // Pearl White
  { body: "#F59E0B", wing: "#FCD34D", glow: "rgba(245,158,11,0.30)" },    // Amber
  { body: "#818CF8", wing: "#C7D2FE", glow: "rgba(129,140,248,0.28)" },   // Soft Violet
  { body: "#34D399", wing: "#6EE7B7", glow: "rgba(52,211,153,0.25)" },    // Emerald
];

export default function AdaptiveCanvasBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    if (typeof window === "undefined") return;

    let animFrameId: number;
    let birds: Bird[] = [];
    let W = 0;
    let H = 0;
    let isMobile = false;

    // ── Pointer (mouse + touch) ──
    const ptr = { x: -9999, y: -9999, active: false, radius: 400 };
    let tiltX = 0, tiltY = 0;

    const getBirdCount = () => {
      const w = window.innerWidth;
      isMobile = w < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent || "");
      // MOBILE-FIRST: lots of birds on phone, even more on desktop
      return isMobile ? 100 : 180;
    };

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBirds();
    };

    const initBirds = () => {
      birds = [];
      const count = getBirdCount();
      for (let i = 0; i < count; i++) {
        birds.push({
          x: Math.random() * (W || 1200),
          y: Math.random() * (H || 800),
          z: Math.random() * 180 + 60,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          ax: 0,
          ay: 0,
          size: Math.random() * 1.8 + 2.8, // Small: 2.8px – 4.6px
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: Math.random() * 0.035 + 0.025, // Slow graceful flap
          colorIdx: i % PALETTE.length,
          alpha: Math.random() * 0.25 + 0.55, // 0.55 – 0.80 (clearly visible)
        });
      }
    };

    // ── Event handlers (on window — canvas is pointer-events:none) ──
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      ptr.active = true;
      if ("touches" in e && e.touches.length > 0) {
        ptr.x = e.touches[0].clientX;
        ptr.y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        ptr.x = (e as MouseEvent).clientX;
        ptr.y = (e as MouseEvent).clientY;
      }
    };
    const onPointerLeave = () => { ptr.active = false; ptr.x = ptr.y = -9999; };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma != null && e.beta != null) {
        tiltX = (e.gamma / 45) * 0.35;
        tiltY = (e.beta / 45) * 0.35;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);
    if (window.DeviceOrientationEvent && isMobile) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    resize();

    // ═══ BOIDS FLOCKING ═══
    const MAX_SPEED = 1.4;
    const MAX_FORCE = 0.055;
    const NEIGHBOR = 110;
    const SEP_DIST = 25; // Tight flocking — birds fly CLOSE together in bunches

    const render = () => {
      if (document.hidden) { animFrameId = requestAnimationFrame(render); return; }

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        let sx = 0, sy = 0, sc = 0;
        let ax = 0, ay = 0, ac = 0;
        let cx = 0, cy = 0, cc = 0;

        for (let j = 0; j < birds.length; j++) {
          if (i === j) continue;
          const o = birds[j];
          const dx = b.x - o.x, dy = b.y - o.y;
          const d2 = dx * dx + dy * dy;

          // Separation
          if (d2 < SEP_DIST * SEP_DIST && d2 > 0) {
            const d = Math.sqrt(d2);
            sx += (dx / d) * (SEP_DIST / d);
            sy += (dy / d) * (SEP_DIST / d);
            sc++;
          }
          // Alignment + Cohesion
          if (d2 < NEIGHBOR * NEIGHBOR) {
            ax += o.vx; ay += o.vy; ac++;
            cx += o.x; cy += o.y; cc++;
          }
        }

        if (sc > 0) { sx /= sc; sy /= sc; }
        if (ac > 0) { ax = ax / ac - b.vx; ay = ay / ac - b.vy; }
        if (cc > 0) { cx = (cx / cc - b.x) * 0.004; cy = (cy / cc - b.y) * 0.004; }

        b.ax += sx * 2.5 + ax * 0.12 + cx * 0.18;
        b.ay += sy * 2.5 + ay * 0.12 + cy * 0.18;

        // ── Touch / Mouse attraction — STRONG pull toward finger/cursor ──
        if (ptr.active && ptr.x > 0) {
          const dx = ptr.x - b.x, dy = ptr.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < ptr.radius && d > 0) {
            const f = ((ptr.radius - d) / ptr.radius) * 0.18;
            b.ax += (dx / d) * f;
            b.ay += (dy / d) * f;
          }
        }

        // Boundary
        const M = 70;
        if (b.x < M) b.ax += MAX_FORCE;
        if (b.x > W - M) b.ax -= MAX_FORCE;
        if (b.y < M) b.ay += MAX_FORCE;
        if (b.y > H - M) b.ay -= MAX_FORCE;

        b.vx += b.ax + tiltX * 0.03;
        b.vy += b.ay + tiltY * 0.03;

        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }
        if (spd < 0.25) { b.vx += (Math.random() - 0.5) * 0.12; b.vy += (Math.random() - 0.5) * 0.12; }

        b.x += b.vx;
        b.y += b.vy;
        b.ax = 0;
        b.ay = 0;

        // Wrap
        if (b.x < -40) b.x = W + 40;
        if (b.x > W + 40) b.x = -40;
        if (b.y < -40) b.y = H + 40;
        if (b.y > H + 40) b.y = -40;

        // ── Wing animation ──
        b.wingPhase += b.wingSpeed;
        const wing = Math.sin(b.wingPhase) * 0.65;
        const heading = Math.atan2(b.vy, b.vx);
        const depth = (260 - b.z) / 200;
        const sz = Math.max(2.2, b.size * depth);

        const pal = PALETTE[b.colorIdx];

        // ── Draw bird ──
        ctx.save();
        ctx.globalAlpha = b.alpha * Math.max(0.5, depth);
        ctx.translate(b.x, b.y);
        ctx.rotate(heading);

        // Glow
        ctx.shadowColor = pal.glow;
        ctx.shadowBlur = 6;

        // Left wing
        ctx.fillStyle = pal.wing;
        ctx.beginPath();
        ctx.moveTo(sz * 1.5, 0);
        ctx.quadraticCurveTo(sz * 0.2, -sz * (1.5 + wing), -sz * 0.9, -sz * (0.4 + wing * 0.5));
        ctx.lineTo(-sz * 0.35, 0);
        ctx.fill();

        // Right wing
        ctx.beginPath();
        ctx.moveTo(sz * 1.5, 0);
        ctx.quadraticCurveTo(sz * 0.2, sz * (1.5 + wing), -sz * 0.9, sz * (0.4 + wing * 0.5));
        ctx.lineTo(-sz * 0.35, 0);
        ctx.fill();

        // Body
        ctx.shadowBlur = 0;
        ctx.fillStyle = pal.body;
        ctx.beginPath();
        ctx.ellipse(sz * 0.3, 0, sz * 0.7, sz * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchstart", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", onOrientation);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
