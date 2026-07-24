"use client";
import Link from "next/link";
import { ReactNode, useRef, useState, useCallback } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
  className = "",
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleRipple = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  }, []);

  const base = `
    relative overflow-hidden inline-flex items-center justify-center
    px-7 py-3.5 rounded-full font-medium text-sm tracking-wide
    transition-all duration-500 ease-out
    hover:scale-[1.03] active:scale-[0.97]
    focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2
  `;

  const styles = {
    primary: `
      bg-navy text-gold
      shadow-md hover:shadow-xl
      hover:bg-gradient-to-r hover:from-navy hover:to-royal
      border border-gold/20
    `,
    outline: `
      bg-transparent text-gold
      border border-gold/40
      hover:bg-gold/10 hover:border-gold
    `,
    light: `
      bg-white text-navy
      border border-graylight
      shadow-sm hover:shadow-lg hover:border-gold/30
    `,
  };

  const rippleEl = ripple && (
    <span
      className="absolute rounded-full bg-gold/20 animate-[ripple_0.6s_ease-out]"
      style={{
        left: ripple.x - 10,
        top: ripple.y - 10,
        width: 20,
        height: 20,
      }}
    />
  );

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleRipple}>
        {rippleEl}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={(e) => { handleRipple(e); onClick?.(); }}
      className={classes}
    >
      {rippleEl}
      <span className="relative z-10">{children}</span>
    </button>
  );
}