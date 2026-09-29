// components/ui/Input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-gx-ink/90">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-gx-md border border-gx-border bg-gx-background px-4 py-2 text-base text-gx-ink placeholder:text-gx-ink/40 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gx-purple disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        <AnimatePresence mode="wait">
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
              className="text-sm font-medium text-red-500 overflow-hidden"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";