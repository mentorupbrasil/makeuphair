import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function BrandLogo({
  variant = "horizontal",
  className,
  href,
}: {
  variant?: "horizontal" | "stacked" | "monogram" | "seal" | "metallic";
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
    ) : variant === "seal" ? (
      <Image
        src={BRAND.assets.seal}
        alt={BRAND.fullName}
        width={160}
        height={160}
        className={cn("h-36 w-36 object-contain", className)}
      />
    ) : variant === "metallic" ? (
      <Image
        src={BRAND.assets.logoMetallic}
        alt={BRAND.fullName}
        width={280}
        height={280}
        className={cn("h-48 w-48 object-contain", className)}
      />
    ) : variant === "stacked" ? (
      <Image
        src={BRAND.assets.logoPrimary}
        alt={BRAND.fullName}
        width={280}
        height={280}
        className={cn("h-40 w-auto object-contain md:h-48", className)}
      />
    ) : (
      <Image
        src={BRAND.assets.logoHorizontal}
        alt={BRAND.fullName}
        width={220}
        height={64}
        className={cn("h-11 w-auto object-contain md:h-12", className)}
        priority
      />
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
