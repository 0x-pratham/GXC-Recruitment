// app/recruitment/_components/RecruitmentTracks.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const TRACKS = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Craft fluid, responsive interfaces using React, Next.js and modern CSS architectures.",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "Architect scalable APIs, manage databases and build reliable systems with strong engineering fundamentals.",
  },
  {
    id: "design",
    title: "Product Design",
    description:
      "Design intuitive experiences, build thoughtful systems and turn ideas into clear product interactions.",
  },
  {
    id: "fullstack",
    title: "Full Stack",
    description:
      "Connect frontend and backend engineering to deliver complete features from interface to infrastructure.",
  },
];

export function RecruitmentTracks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="tracks"
      className="bg-gx-surface py-24 sm:py-32 md:py-40 lg:py-48"
    >
      <Container>
        {/* Section introduction */}
        <div className="mb-20 max-w-3xl sm:mb-24 md:mb-32">
          <motion.h2
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 32 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              font-serif
              text-5xl
              font-normal
              leading-[0.95]
              tracking-[-0.035em]
              text-gx-ink
              sm:text-6xl
              md:text-7xl
              lg:text-[6.5rem]
            "
          >
            Find your
            <br />
            <span className="italic text-gx-purple">place to build.</span>
          </motion.h2>

          <motion.p
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.75,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-gx-ink/70
              sm:mt-10
              sm:text-xl
            "
          >
            Choose the area where you want to contribute, learn and solve
            meaningful technical problems with the community.
          </motion.p>
        </div>

        {/* Tracks */}
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-20 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">
          {TRACKS.map((track, index) => (
            <motion.article
              key={track.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="flex min-h-full flex-col">
                <h3
                  className="
                    max-w-[14rem]
                    font-serif
                    text-3xl
                    font-normal
                    leading-[1.05]
                    tracking-[-0.025em]
                    text-gx-ink
                    transition-colors
                    duration-300
                    group-hover:text-gx-purple
                    sm:text-[2rem]
                  "
                >
                  {track.title}
                </h3>

                <p
                  className="
                    mt-5
                    max-w-[18rem]
                    text-base
                    leading-7
                    text-gx-ink/65
                    transition-colors
                    duration-300
                    group-hover:text-gx-ink/80
                  "
                >
                  {track.description}
                </p>

                {/* Minimal interaction accent */}
                <div
                  className="
                    mt-7
                    h-px
                    w-8
                    origin-left
                    bg-gx-purple
                    transition-all
                    duration-500
                    ease-out
                    group-hover:w-16
                  "
                  aria-hidden="true"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}