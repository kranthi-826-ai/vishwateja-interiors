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
      className={`border border-graylight rounded-2xl p-6 hover:border-royal hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}