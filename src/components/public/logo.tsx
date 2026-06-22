import { cn } from "@/lib/utils";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Logo({
  variant = "dark",
  className,
  href = "/",
}: {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  const color = variant === "light" ? "#FAF8F5" : "#0A0A0A";
  const subColor = variant === "light" ? "rgba(250,248,245,0.7)" : "#6B6560";

  const svg = (
    <div className={cn("flex items-center gap-4", className)}>
      <svg
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto shrink-0 md:h-11"
        aria-hidden
      >
        <path
          d="M14 4V44M26 4V44M14 4C14 4 8 4 8 14C8 24 14 24 14 24M14 24C14 24 8 24 8 34C8 44 14 44 14 44M26 4C26 4 32 4 32 14C32 24 26 24 26 24M26 24C26 24 32 24 32 34C32 44 26 44 26 44"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <div className="leading-none">
        <p
          className="font-display text-lg font-light tracking-[0.22em] md:text-xl"
          style={{ color }}
        >
          {BRAND.name.toUpperCase()}
        </p>
        <p
          className="mt-1.5 text-[9px] font-normal tracking-[0.4em] md:text-[10px]"
          style={{ color: subColor }}
        >
          {BRAND.tagline.toUpperCase()}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex transition-opacity hover:opacity-80">
        {svg}
      </Link>
    );
  }
  return svg;
}
