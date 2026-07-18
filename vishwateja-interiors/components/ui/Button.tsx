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
  primary: "bg-navy text-white hover:bg-royal",
  outline: "border border-navy text-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-graylight",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const classes = `px-6 py-3 rounded-full font-medium transition-colors duration-300 ${styles[variant]}`;

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