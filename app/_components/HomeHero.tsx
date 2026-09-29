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
    const container = containerRef.current;

    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            ".hero-title-line",
            ".hero-description",
            ".hero-actions",
            ".hero-atmosphere",
            ".hero-scroll-cue",
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );

        return;
      }

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          ".hero-title-line",
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
          }
        )
        .fromTo(
          ".hero-description",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
          },
          "-=0.45"
        )
        .fromTo(
          ".hero-actions",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
          },
          "-=0.35"
        )
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.2"
        )
        .fromTo(
          ".hero-atmosphere",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.9"
        );

      // Very lightweight ambient movement.
      gsap.to(".hero-atmosphere", {
        x: 18,
        y: -12,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Small scroll cue animation.
      gsap.to(".hero-scroll-arrow", {
        y: 4,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      className="
        relative
        flex
        min-h-[100svh]
        items-center
        overflow-hidden
        bg-gx-surface
        pt-16
        pb-20
        sm:pt-20
        sm:pb-24
        lg:pt-24
        lg:pb-28
      "
    >
      <div
        ref={containerRef}
        className="
          relative
          z-10
          flex
          w-full
          items-center
        "
      >
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="
            hero-atmosphere
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -z-0
            h-[480px]
            w-[480px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(225,208,253,0.62)_0%,rgba(225,208,253,0.22)_42%,transparent_70%)]
            opacity-0
            blur-[6px]
            will-change-transform
            sm:h-[620px]
            sm:w-[620px]
            lg:h-[760px]
            lg:w-[760px]
          "
        />

        <Container>
          <div className="hero-content relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
            <h1
              className="
                max-w-[1400px]
                font-serif
                text-[3.6rem]
                font-normal
                leading-[0.88]
                tracking-[-0.055em]
                text-gx-ink
                sm:text-[5rem]
                md:text-[6.7rem]
                lg:text-[8.2rem]
                xl:text-[9.5rem]
              "
            >
              <span className="hero-title-line block opacity-0">
                We build
              </span>

              <span className="hero-title-line block opacity-0">
                <span className="italic text-gx-purple">
                  digital
                </span>{" "}
                reality.
              </span>
            </h1>

            <p
              className="
                hero-description
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-gx-ink/65
                opacity-0
                sm:mt-8
                sm:text-lg
                sm:leading-8
                md:text-xl
              "
            >
              GenXCode is a technology community where developers,
              designers and builders come together to create meaningful
              products and solve real problems.
            </p>

            <div className="hero-actions mt-8 opacity-0 sm:mt-9">
              <LinkButton
                href="/recruitment"
                size="lg"
                className="
                  group
                  min-h-12
                  min-w-[190px]
                  px-7
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                <span>Join GenXCode</span>
                <span
                  aria-hidden="true"
                  className="
                    ml-3
                    inline-block
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </LinkButton>
            </div>
          </div>
        </Container>

        {/* Scroll cue */}
        <div
          className="
            hero-scroll-cue
            absolute
            bottom-8
            left-1/2
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            text-xs
            tracking-wide
            text-gx-ink/40
            opacity-0
            sm:bottom-10
          "
        >

          <span
            aria-hidden="true"
            className="hero-scroll-arrow text-sm text-gx-purple"
          >
            ↓
          </span>
        </div>
      </div>
    </Section>
  );
}