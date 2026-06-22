import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-ink text-ivory hover:bg-ink-soft",
      secondary: "bg-gold text-ivory hover:bg-gold-light",
      outline: "border border-black/15 text-ink hover:bg-ivory-muted",
      ghost: "text-stone hover:bg-ivory-muted hover:text-ink",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-[10px] tracking-[0.15em]",
      md: "px-4 py-2 text-[10px] tracking-[0.2em]",
      lg: "px-6 py-3 text-[10px] tracking-[0.25em]",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 uppercase transition disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
