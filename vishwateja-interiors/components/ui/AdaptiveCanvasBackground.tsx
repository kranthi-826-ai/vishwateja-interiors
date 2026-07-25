"use client";
import { useEffect, useRef, useState } from "react";

export default function AdaptiveCanvasBackground() {
  const [mounted, setMounted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaInstance = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Event listener to hide birds when typing, clicking, or focusing inputs
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isInputField = (element: Element | null) => {
      if (!element) return false;
      const tagName = element.tagName.toLowerCase();
      return (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        (element as HTMLElement).isContentEditable
      );
    };

    const triggerHide = (durationMs = 2500) => {
      setIsInteracting(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      hideTimerRef.current = setTimeout(() => {
        // Only show birds again if the user is not currently focused on a form input
        if (!isInputField(document.activeElement)) {
          setIsInteracting(false);
        } else {
          triggerHide(1500);
        }
      }, durationMs);
    };

    // Hide birds on mouse click, touch, or tap
    const handlePointerOrClick = () => {
      triggerHide(2000);
    };

    // Hide birds when typing or keypresses occur
    const handleKeyOrInput = () => {
      triggerHide(3000);
    };

    // Hide birds when focusing an input field
    const handleFocusIn = (e: FocusEvent) => {
      if (isInputField(e.target as Element)) {
        triggerHide(4000);
      }
    };

    const handleFocusOut = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (!isInputField(document.activeElement)) {
          setIsInteracting(false);
        }
      }, 500);
    };

    window.addEventListener("mousedown", handlePointerOrClick, { passive: true });
    window.addEventListener("touchstart", handlePointerOrClick, { passive: true });
    window.addEventListener("keydown", handleKeyOrInput, { passive: true });
    window.addEventListener("input", handleKeyOrInput, { passive: true });
    window.addEventListener("focusin", handleFocusIn, { passive: true });
    window.addEventListener("focusout", handleFocusOut, { passive: true });

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      window.removeEventListener("mousedown", handlePointerOrClick);
      window.removeEventListener("touchstart", handlePointerOrClick);
      window.removeEventListener("keydown", handleKeyOrInput);
      window.removeEventListener("input", handleKeyOrInput);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let isDestroyed = false;

    const loadScript = (src: string, globalCheck: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== "undefined" && (window as any)[globalCheck]) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          existingScript.addEventListener("error", (e) => reject(e));
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.head.appendChild(script);
      });
    };

    const startVanta = async () => {
      try {
        // 1. Load Three.js R134
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
          "THREE"
        );

        // 2. Load Vanta Birds script
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js",
          "VANTA"
        );

        if (isDestroyed || !containerRef.current) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const VANTA = (window as any).VANTA;
        if (!VANTA || typeof VANTA.BIRDS !== "function") {
          console.warn("VANTA.BIRDS script not available");
          return;
        }

        if (vantaInstance.current) {
          vantaInstance.current.destroy();
        }

        // 3. Initialize Vanta Birds with solid Navy background & Gold/Cyan gradient birds
        vantaInstance.current = VANTA.BIRDS({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x041b5e,     // Vishwateja Navy
          backgroundAlpha: 0.0,          // Transparent background so birds float everywhere across all sections
          color1: 0xd4af37,              // Luxury Gold
          color2: 0x38bdf8,              // Soft Sky Cyan
          colorMode: "varianceGradient",
          quantity: 4.0,                 // Elegant density
          birdSize: 0.85,                // Refined bird size for global viewing
          wingSpan: 24.0,                // Refined wingspan
          speedLimit: 4.2,               // Smooth graceful flight
          separation: 24.0,
          alignment: 20.0,
          cohesion: 20.0,
        });

        setTimeout(() => {
          if (vantaInstance.current && typeof vantaInstance.current.resize === "function") {
            vantaInstance.current.resize();
          }
        }, 150);
      } catch (err) {
        console.warn("Vanta Birds script loading error:", err);
      }
    };

    startVanta();

    return () => {
      isDestroyed = true;
      if (vantaInstance.current) {
        try {
          vantaInstance.current.destroy();
        } catch {
          // ignore
        }
        vantaInstance.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-20 w-full h-full pointer-events-none overflow-hidden transition-opacity duration-700 ${
        isInteracting ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      aria-hidden="true"
    />
  );
}
