"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const STEPS = [
  {
    title: "Application",
    description:
      "Tell us about yourself, the things you have built and the kind of work you want to contribute to.",
  },
  {
    title: "Technical Assessment",
    description:
      "Work through a practical challenge related to the track you are applying for. We care about your approach as much as the final result.",
  },
  {
    title: "Technical Interview",
    description:
      "Walk us through your decisions, your technical thinking and the way you approach problems.",
  },
  {
    title: "Conversation",
    description:
      "Meet members of the team, understand how we work and discuss where you could contribute within GenXCode.",
  },
];

export function RecruitmentProcess() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="bg-gx-background py-24 sm:py-32 md:py-40 lg:py-48">
      <Container>
        <div className="mx-auto max-w-7xl">
          {/* =================================================
              INTRODUCTION
              ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <h2
              className="
                font-serif
                text-5xl
                font-normal
                leading-[0.92]
                tracking-[-0.045em]
                text-gx-ink

                sm:text-6xl
                md:text-7xl
                lg:text-[6.5rem]
              "
            >
              How we
              <br />
              <span className="italic text-gx-purple">
                work together.
              </span>
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-8
                text-gx-ink/65

                sm:mt-10
                sm:text-xl
                sm:leading-9

                md:ml-[18%]
              "
            >
              We respect your time. The process focuses on practical
              thinking, technical decisions and the way you approach
              real problems.
            </p>
          </motion.div>

          {/* =================================================
              PROCESS
              ================================================= */}

          <div
            className="
              mt-24
              grid
              gap-16

              sm:mt-32
              sm:gap-20

              md:mt-40
              md:grid-cols-2
              md:gap-x-16
              md:gap-y-24

              lg:gap-x-28
              lg:gap-y-32
            "
          >
            {STEPS.map((step, index) => (
              <motion.article
                key={step.title}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 45,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                {/* Large title */}

                <h3
                  className="
                    font-serif
                    text-4xl
                    font-normal
                    leading-[0.95]
                    tracking-[-0.04em]
                    text-gx-ink
                    transition-colors
                    duration-500

                    sm:text-5xl

                    md:text-6xl

                    lg:text-[4.5rem]

                    group-hover:text-gx-purple
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-6
                    max-w-lg
                    text-base
                    leading-7
                    text-gx-ink/60

                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {step.description}
                </p>

                {/* Minimal interaction */}

                <div
                  aria-hidden="true"
                  className="
                    mt-7
                    h-px
                    w-8
                    bg-gx-purple/30
                    transition-all
                    duration-500
                    ease-out

                    group-hover:w-16
                    group-hover:bg-gx-purple
                  "
                />
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}