"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const VALUES = [
  {
    title: "High Impact",
    description:
      "Work on products where the outcome matters. We care about meaningful work, practical solutions and what gets built.",
  },
  {
    title: "Fast Iteration",
    description:
      "Build, test, learn and improve. We value momentum without losing sight of engineering quality.",
  },
  {
    title: "Tight-Knit Team",
    description:
      "Work closely with people across engineering, design and product. Good ideas move through collaboration.",
  },
];

export function RecruitmentIntro() {
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
            className="
              max-w-5xl
            "
          >
            <h2
              className="
                max-w-5xl
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
              Build things
              <br />
              that{" "}
              <span className="italic text-gx-purple">
                matter.
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
              At GenXCode, we don't just write code. We craft digital
              experiences and create an environment where people can
              learn, contribute and build meaningful things together.
            </p>
          </motion.div>

          {/* =================================================
              VALUES
              ================================================= */}

          <div
            className="
              mt-24
              grid
              gap-16

              sm:mt-32
              sm:gap-20

              md:mt-40
              md:grid-cols-3
              md:gap-12

              lg:gap-20
            "
          >
            {VALUES.map((value, index) => (
              <motion.article
                key={value.title}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 40,
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
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                {/* Large value title */}

                <h3
                  className="
                    font-serif
                    text-4xl
                    font-normal
                    leading-[0.95]
                    tracking-[-0.035em]
                    text-gx-ink
                    transition-colors
                    duration-500

                    sm:text-5xl

                    md:text-[3.25rem]

                    lg:text-[4rem]

                    group-hover:text-gx-purple
                  "
                >
                  {value.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-6
                    max-w-sm
                    text-base
                    leading-7
                    text-gx-ink/60

                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {value.description}
                </p>

                {/* Subtle interaction */}

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