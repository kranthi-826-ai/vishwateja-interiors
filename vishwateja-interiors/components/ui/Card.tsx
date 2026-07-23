import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-graylight bg-white rounded-2xl p-6 hover:border-gold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}