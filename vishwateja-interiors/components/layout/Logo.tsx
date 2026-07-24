"use client";

type LogoProps = {
  height?: number;
  className?: string;
};

/* ── Styles injected via dangerouslySetInnerHTML ──
   styled-jsx (<style jsx>) does NOT work in the Next.js App Router.
   Using a regular <style> tag with unique class prefixes instead. */
const logoStyles = `
  @keyframes vtLogoIn {
    from { opacity: 0; transform: translateY(10px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  /* Shine sweep: ~2s sweep then fully off-screen for ~6s pause.
     -200% ensures the gradient band completely exits the logo area. */
  @keyframes vtShineSweep {
    0%   { background-position: 200% 0; }
    25%  { background-position: -200% 0; }
    100% { background-position: -200% 0; }
  }

  .vt-logo-reveal {
    display: inline-flex;
    align-items: center;
    animation: vtLogoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .vt-logo-stage {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .vt-logo-img {
    width: auto;
    display: block;
    filter: drop-shadow(0 0 0 rgba(200, 155, 60, 0));
    transition: filter 0.5s ease, transform 0.5s ease;
  }
  .vt-logo-reveal:hover .vt-logo-img {
    filter: drop-shadow(0 6px 16px rgba(200, 155, 60, 0.4));
    transform: scale(1.04);
  }

  /* Shine overlay – clipped to logo shape via CSS mask */
  .vt-shine-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(
      75deg,
      transparent 30%,
      rgba(255, 255, 255, 0.85) 48%,
      transparent 65%
    );
    background-size: 300% 100%;
    background-position: -200% 0;
    animation: vtShineSweep 8s linear 2s infinite;
    pointer-events: none;
    mix-blend-mode: screen;
  }
`;

export default function Logo({ height = 125, className = "" }: LogoProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: logoStyles }} />
      <div className={`vt-logo-reveal ${className}`}>
        <div className="vt-logo-stage" style={{ height }}>
          <img
            src="/logo/vishwateja-logo.png"
            alt="Vishwateja Interiors"
            style={{ height }}
            className="vt-logo-img"
          />
          {/* Shine layer: masked to the exact logo PNG shape */}
          <div
            className="vt-shine-layer"
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
      </div>
    </>
  );
}