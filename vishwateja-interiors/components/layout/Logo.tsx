"use client";

type LogoProps = {
  height?: number;
  className?: string;
};

export default function Logo({ height = 70, className = "" }: LogoProps) {
  return (
    <div className={`logo-reveal ${className}`}>
      <img
        src="/logo/vishwateja-logo.png"
        alt="Vishwateja Interiors"
        style={{ height, width: "auto" }}
        className="logo-img"
      />
      <style jsx>{`
        .logo-reveal {
          display: inline-flex;
          align-items: center;
          opacity: 0;
          transform: translateY(10px) scale(0.96);
          animation: logoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .logo-img {
          filter: drop-shadow(0 0 0 rgba(200, 155, 60, 0));
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .logo-reveal:hover .logo-img {
          filter: drop-shadow(0 6px 16px rgba(200, 155, 60, 0.4));
          transform: scale(1.04);
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