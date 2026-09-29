// app/_components/HomeCTA.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Use fromTo to strictly define the end state, preventing invisible text
      gsap.fromTo(".final-cta-content", 
        { y: 80, opacity: 0 },
        {
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 75%", 
            once: true 
          },
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
        }
      );
    }, containerRef.current); // Pass the physical element directly

    return () => ctx.revert();
  }, []);

  return (
    <Section className="bg-gx-ink py-24 sm:py-32 md:py-40 lg:py-48">
      {/* Moved the ref to a native div to bypass the TypeScript error */}
      <div ref={containerRef} className="w-full">
        <Container>
          <div className="final-cta-content flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end lg:gap-20">
            <div>
              <h2 className="max-w-5xl font-serif text-5xl font-normal leading-[0.9] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Come build<br />something<br /><span className="italic text-gx-lavender">meaningful.</span>
              </h2>
            </div>
            <div className="w-full max-w-sm lg:pb-2">
              <p className="mb-8 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                If you enjoy building, learning and contributing, there is a place for you at GenXCode.
              </p>
              <LinkButton href="/recruitment" size="lg" className="group w-full bg-gx-lavender text-gx-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto">
                <span>Join GenXCode</span>
                <span aria-hidden="true" className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </LinkButton>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}