"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Version the key so returning visitors can see the reopening announcement once.
    const hasSeenPopup = localStorage.getItem("gxc_reopening_announcement_v1");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsVisible(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("gxc_reopening_announcement_v1", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-labelledby="reopening-title"
          aria-describedby="reopening-description"
          className="fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-gx-md border border-gx-border bg-gx-surface p-6 shadow-2xl sm:bottom-6 sm:right-6"
        >
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 rounded-full p-2 text-gx-ink/60 transition-colors hover:bg-gx-background hover:text-gx-ink"
            aria-label="Dismiss recruitment announcement"
          >
            <X size={18} />
          </button>

          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-gx-lavender/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gx-purple">
            Recruitment reopened
          </span>
          <h2 id="reopening-title" className="mb-2 pr-5 font-serif text-2xl text-gx-ink">
            Your next chapter starts here.
          </h2>
          <p id="reopening-description" className="mb-5 text-sm leading-relaxed text-gx-ink/80">
            Applications to join GenXCode are open again. Find your track, bring your curiosity and build something meaningful with us.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/recruitment/apply"
              onClick={handleDismiss}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-gx-md bg-gx-purple px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply now <ArrowRight size={16} />
            </Link>
            <button
              onClick={handleDismiss}
              className="min-h-11 rounded-gx-md border border-gx-border px-4 py-2 text-sm font-medium text-gx-ink transition-colors hover:bg-gx-background"
            >
              Maybe later
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
