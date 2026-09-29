// app/_components/HomeHero.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .from(".hero-title-line", { y: 90, opacity: 0, duration: 1.1, stagger: 0.12 })
        .from(".hero-description", { y: 30, opacity: 0, duration: 0.8 }, "-=0.55")
        .from(".hero-actions", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-orb", { scale: 0.7, opacity: 0, duration: 1.4, ease: "power2.out" }, "-=1");

      gsap.to(".hero-orb", {
        x: 35,
        y: -25,
        scale: 1.08,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className="relative flex min-h-[92svh] items-center overflow-hidden bg-gx-surface py-24 sm:py-28 lg:min-h-screen lg:py-32">
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <h1 className="max-w-6xl font-serif text-[3.8rem] font-normal leading-[0.9] tracking-[-0.055em] text-gx-ink sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem]">
            <span className="hero-title-line block">We build</span>
            <span className="hero-title-line block"><span className="italic text-gx-purple">digital</span> reality.</span>
          </h1>

          <p className="hero-description mt-8 max-w-2xl text-base leading-7 text-gx-ink/70 sm:mt-10 sm:text-lg sm:leading-8 md:text-xl">
            GenXCode is a technology community where developers, designers and builders come together to create meaningful products and solve real problems.
          </p>

          <div className="hero-actions mt-9 sm:mt-11">
            <LinkButton href="/recruitment" size="lg" className="group min-w-[190px] transition-all duration-300 hover:-translate-y-0.5">
              <span>Join GenXCode</span>
              <span aria-hidden="true" className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </LinkButton>
          </div>
        </div>
      </Container>

      <div aria-hidden="true" className="hero-orb pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gx-lavender/60 blur-[120px] sm:h-[600px] sm:w-[600px] lg:h-[760px] lg:w-[760px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-gx-ink/10" />
    </Section>
  );
}