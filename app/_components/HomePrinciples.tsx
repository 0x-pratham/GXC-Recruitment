// app/_components/HomePrinciples.tsx
"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    title: "Precision",
    description:
      "We care about the details that make software reliable. Clear architecture, thoughtful engineering and code that is built to last.",
  },
  {
    title: "Performance",
    description:
      "We build with speed in mind from the beginning. Efficient systems, responsive interfaces and infrastructure ready to grow.",
  },
  {
    title: "Design",
    description:
      "Technology should feel as good as it works. We bring engineering and design together to create experiences people enjoy using.",
  },
];

export function HomePrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([".principle", ".principle-title", ".principle-description"], { opacity: 1, y: 0 });
        return;
      }

      const principles =
        gsap.utils.toArray<HTMLElement>(".principle");

      principles.forEach((item) => {
        const title =
          item.querySelector<HTMLElement>(".principle-title");

        const description =
          item.querySelector<HTMLElement>(".principle-description");

        if (!title || !description) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        timeline
          .fromTo(
            item,
            {
              y: 45,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
          )
          .fromTo(
            title,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .fromTo(
            description,
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.35",
          );
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Section className="bg-gx-surface py-24 sm:py-32 md:py-40 lg:py-48">
      {/* Ref moved to a native div to fix the TypeScript error */}
      <div ref={containerRef} className="w-full">
        <Container>
          {/* =====================================================
              SECTION HEADING
              ===================================================== */}

          <div className="mb-20 max-w-3xl sm:mb-24 md:mb-32">
            <h2
              className="
                font-serif
                text-5xl
                font-normal
                leading-[0.95]
                tracking-[-0.04em]
                text-gx-ink
                sm:text-6xl
                md:text-7xl
              "
            >
              How we think.
            </h2>
          </div>

          {/* =====================================================
              PRINCIPLES
              ===================================================== */}

          <div className="flex flex-col gap-20 sm:gap-28 md:gap-36 lg:gap-44">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.title}
                className="
                  principle
                  opacity-0
                  grid
                  gap-7

                  md:grid-cols-[0.9fr_1.1fr]
                  md:items-end
                  md:gap-16

                  lg:grid-cols-2
                  lg:gap-24
                "
              >
                {/* -------------------------------------------------
                    TITLE
                    ------------------------------------------------- */}

                <div>
                  <h3
                    className="
                      principle-title
                      opacity-0
                      font-serif
                      text-5xl
                      font-normal
                      leading-[0.9]
                      tracking-[-0.04em]
                      text-gx-ink

                      sm:text-6xl
                      md:text-7xl
                      lg:text-[6.5rem]
                    "
                  >
                    {principle.title}
                  </h3>
                </div>

                {/* -------------------------------------------------
                    DESCRIPTION
                    ------------------------------------------------- */}

                <div className="max-w-xl">
                  <p
                    className="
                      principle-description
                      opacity-0
                      text-lg
                      leading-8
                      text-gx-ink/65

                      sm:text-xl
                      sm:leading-9
                    "
                  >
                    {principle.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}