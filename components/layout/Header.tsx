// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/recruitment", label: "Careers" },
  { href: "/recruitment/about", label: "About Us" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gx-border bg-gx-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo now points to Root and uses the SVG icon */}
          <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
            <Image 
              src="/icon.svg" 
              alt="GenXCode Logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto" 
              priority 
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm font-medium text-gx-ink/80 hover:text-gx-purple transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LinkButton href="/recruitment/apply" size="sm">
              Apply Now
            </LinkButton>
          </nav>

          <button 
            className="md:hidden p-2 -mr-2 text-gx-ink active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity, height" }}
            className="absolute top-16 left-0 w-full border-b border-gx-border bg-gx-background shadow-lg md:hidden overflow-hidden"
          >
            <Container className="py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-medium text-gx-ink block py-2 border-b border-gx-border/50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8">
                <LinkButton 
                  href="/recruitment/apply" 
                  size="lg"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Application
                </LinkButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}