"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

export function RecruitmentHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-title-line", {
          y: 70,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
        })
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.55",
        )
        .from(
          ".hero-actions",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Section
      className="
        relative
        flex
        min-h-[88svh]
        items-center
        overflow-hidden
        bg-gx-surface
        py-24

        sm:py-28
        md:py-36
        lg:min-h-screen
        lg:py-32
      "
    >
      <Container>
        <div
          ref={containerRef}
          className="
            mx-auto
            flex
            w-full
            max-w-6xl
            flex-col
            items-center
            text-center
          "
        >
          {/* =================================================
              HERO HEADING
              ================================================= */}

          <h1
            className="
              max-w-6xl
              font-serif
              text-[3.8rem]
              font-normal
              leading-[0.9]
              tracking-[-0.055em]
              text-gx-ink

              sm:text-[5rem]
              md:text-[6.5rem]
              lg:text-[8rem]
              xl:text-[9rem]
            "
          >
            <span className="hero-title-line block">
              Build with
            </span>

            <span className="hero-title-line block">
              <span className="italic text-gx-purple">
                GenXCode.
              </span>
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className="
              hero-desc
              mt-8
              max-w-2xl
              text-base
              leading-7
              text-gx-ink/70

              sm:mt-10
              sm:text-lg
              sm:leading-8

              md:text-xl
              md:leading-9
            "
          >
            Join a community of developers, designers and builders
            working together to learn, experiment and create things
            that matter.
          </p>

          {/* =================================================
              ACTIONS
              ================================================= */}

          <div
            className="
              hero-actions
              mt-10
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-3

              sm:mt-12
              sm:w-auto
              sm:flex-row
              sm:gap-4
            "
          >
            {/* Primary CTA */}

            <LinkButton
              href="/recruitment/apply"
              size="lg"
              className="
                hero-cta
                group
                flex
                min-h-12
                w-full
                items-center
                justify-center
                px-7
                transition-all
                duration-300
                hover:-translate-y-0.5

                sm:w-auto
                sm:min-w-[170px]
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

            {/* Secondary CTA */}

            <LinkButton
              href="#tracks"
              variant="outline"
              size="lg"
              className="
                hero-cta
                flex
                min-h-12
                w-full
                items-center
                justify-center
                px-7
                transition-all
                duration-300
                hover:-translate-y-0.5

                sm:w-auto
                sm:min-w-[190px]
              "
            >
              Explore Opportunities
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}