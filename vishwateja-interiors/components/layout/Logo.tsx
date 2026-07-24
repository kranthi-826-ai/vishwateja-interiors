"use client";

type LogoProps = {
  height?: number;
  className?: string;
};

const logoStyles = `
  @keyframes logoIn {
    from { opacity: 0; transform: translateY(10px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .vt-logo-reveal {
    display: inline-flex;
    align-items: center;
    animation: logoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .vt-logo-img {
    filter: drop-shadow(0 0 0 rgba(200,155,60,0));
    transition: filter 0.5s ease, transform 0.5s ease;
  }
  .vt-logo-reveal:hover .vt-logo-img {
    filter: drop-shadow(0 6px 16px rgba(200,155,60,0.4));
    transform: scale(1.04);
  }
`;

export default function Logo({ height = 110, className = "" }: LogoProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: logoStyles }} />
      <div className={`vt-logo-reveal ${className}`}>
        <img
          src="/logo/vishwateja-logo.png"
          alt="Vishwateja Interiors"
          style={{ height, width: "auto" }}
          className="vt-logo-img"
        />
      </div>
    </>
  );
}