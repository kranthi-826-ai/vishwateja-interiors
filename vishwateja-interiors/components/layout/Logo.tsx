"use client";

type LogoProps = {
  height?: number;
  className?: string;
};

export default function Logo({ height = 125, className = "" }: LogoProps) {
  return (
    <div className={`logo-reveal ${className}`}>
      <div className="logo-stage" style={{ height }}>
        <img
          src="/logo/vishwateja-logo.png"
          alt="Vishwateja Interiors"
          style={{ height }}
          className="logo-img"
        />
        {/* Shine layer: masked to the exact logo PNG shape, so it only
            lights up where the logo's actual pixels are — nothing beyond it */}
        <div
          className="shine-layer"
          style={{
            height,
            WebkitMaskImage: "url(/logo/vishwateja-logo.png)",
            maskImage: "url(/logo/vishwateja-logo.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      </div>

      <style jsx>{`
        .logo-reveal {
          display: inline-flex;
          align-items: center;
          opacity: 0;
          transform: translateY(10px) scale(0.96);
          animation: logoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .logo-stage {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .logo-img {
          width: auto;
          display: block;
          filter: drop-shadow(0 0 0 rgba(200, 155, 60, 0));
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .logo-reveal:hover .logo-img {
          filter: drop-shadow(0 6px 16px rgba(200, 155, 60, 0.4));
          transform: scale(1.04);
        }
        /* Shine layer sits exactly on top of the logo, clipped to its shape via mask */
        .shine-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(
            75deg,
            transparent 30%,
            rgba(255, 255, 255, 0.95) 48%,
            transparent 65%
          );
          background-size: 300% 100%;
          background-position: 200% 0;
          animation: shineSweep 5s ease-in-out infinite;
          animation-delay: 2s;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        @keyframes shineSweep {
          0% { background-position: 200% 0; }
          8% { background-position: 200% 0; }
          35% { background-position: -100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes logoIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}