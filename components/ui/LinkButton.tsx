// components/ui/LinkButton.tsx
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

interface LinkButtonProps extends LinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gx-purple rounded-gx-md";
    
    const variants = {
      primary: "bg-gx-purple text-white hover:bg-[#4a1d75]",
      secondary: "bg-gx-lavender text-gx-ink hover:bg-[#d0bcfc]",
      outline: "border border-gx-border bg-transparent hover:bg-gx-surface text-gx-ink",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <Link
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "LinkButton";