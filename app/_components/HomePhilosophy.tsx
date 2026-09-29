// app/_components/HomePhilosophy.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

gsap.registerPlugin(ScrollTrigger);

export function HomePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-title", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
        y: 70, opacity: 0, duration: 1, ease: "power3.out",
      });

      gsap.from(".philosophy-copy", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%", once: true },
        y: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className="bg-gx-background py-24 sm:py-32 md:py-40 lg:py-48">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20 lg:gap-32">
          <div>
            <h2 className="philosophy-title max-w-xl font-serif text-4xl font-normal leading-[1] tracking-[-0.035em] text-gx-ink sm:text-5xl md:text-6xl lg:text-7xl">
              Technology is better when people build it together.
            </h2>
          </div>
          <div>
            <p className="philosophy-copy max-w-xl text-lg leading-8 text-gx-ink/65 sm:text-xl sm:leading-9">
              GenXCode brings together people who want to go beyond tutorials and build things that actually work. We learn through experimentation, collaboration and shipping.
            </p>
            <p className="philosophy-copy mt-6 max-w-xl text-lg leading-8 text-gx-ink/65 sm:text-xl sm:leading-9">
              The goal is simple: create an environment where good engineering, curiosity and contribution can grow together.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}