import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function BrandLogo({
  variant = "horizontal",
  className,
  href,
}: {
  variant?: "horizontal" | "stacked" | "monogram";
  className?: string;
  href?: string;
}) {
  const content =
    variant === "monogram" ? (
      <Image
        src={BRAND.assets.monogram}
        alt={BRAND.fullName}
        width={48}
        height={48}
        className={cn("h-10 w-10 object-contain", className)}
      />
    ) : variant === "stacked" ? (
      <Image
        src={BRAND.assets.logoPrimary}
        alt={BRAND.fullName}
        width={200}
        height={200}
        className={cn("h-28 w-auto object-contain", className)}
      />
    ) : (
      <div className={cn("flex items-center gap-3", className)}>
        <Image
          src={BRAND.assets.monogram}
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 object-contain"
          aria-hidden
        />
        <div className="leading-tight">
          <p className="font-serif text-base font-medium tracking-[0.15em] text-brand-brown md:text-lg">
            {BRAND.name.toUpperCase()}
          </p>
          <p className="text-[10px] font-light uppercase tracking-[0.25em] text-brand-taupe-dark md:text-xs">
            {BRAND.tagline}
          </p>
        </div>
      </div>
    );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
