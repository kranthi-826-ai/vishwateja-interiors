import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  type?: "button" | "submit";
};

const styles = {
  primary: "bg-navy text-gold hover:bg-goldDark hover:text-white",
  outline: "border border-gold/50 text-gold hover:bg-gold/10",
  light: "bg-white text-navy hover:bg-graylight",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const classes = `px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${styles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}