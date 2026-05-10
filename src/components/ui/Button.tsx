"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:translate-y-[-1px] hover:bg-accent/90",
  secondary:
    "bg-surface text-primary border border-border hover:translate-y-[-1px] hover:border-primary/40",
  ghost:
    "text-primary hover:translate-y-[-1px] hover:bg-primary/5",
  outline:
    "border border-primary/20 text-primary hover:translate-y-[-1px] hover:border-primary/60",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-[15px] rounded-full",
  lg: "h-14 px-8 text-base rounded-full",
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200 ease-out-expo will-change-transform",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
