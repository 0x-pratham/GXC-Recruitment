"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("gxc_welcome_dismissed");
    
    if (!hasSeenPopup) {
      // Add a slight 1.5s delay so it doesn't interrupt the initial page load animation
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Save to local storage so they don't see it again on future visits
    localStorage.setItem("gxc_welcome_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-gx-md border border-gx-border bg-gx-surface p-6 shadow-2xl"
        >
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 text-gx-ink/50 transition-colors hover:text-gx-ink"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Uses your global CSS Times New Roman h3 styling */}
          <h3 className="mb-3 text-2xl">Don&apos;t Miss Out</h3>
          
          <p className="mb-4 text-sm leading-relaxed text-gx-ink/80">
            Limited seats are available. Hurry up team, don&apos;t miss this opportunity to build with us!
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold italic text-gx-purple">
              ~ From Pratham
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}