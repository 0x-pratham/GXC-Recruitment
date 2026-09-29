// app/recruitment/apply/success/page.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

export default function SuccessPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="flex min-h-[calc(100vh-64px)] items-center bg-gx-surface py-24 sm:py-32">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Small visual acknowledgement */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10 h-px w-16 origin-center bg-gx-purple sm:mb-14"
            aria-hidden="true"
          />

          {/* Main message */}
          <motion.h1
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 28 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-4xl
              font-serif
              text-5xl
              font-normal
              leading-[0.95]
              tracking-[-0.04em]
              text-gx-ink
              sm:text-6xl
              md:text-7xl
              lg:text-[7rem]
            "
          >
            You&apos;re on
            <br />
            <span className="italic text-gx-purple">
              our radar.
            </span>
          </motion.h1>

          {/* Supporting message */}
          <motion.p
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 22 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-xl
              text-base
              leading-7
              text-gx-ink/65
              sm:mt-10
              sm:text-lg
              sm:leading-8
            "
          >
            Your application has been submitted successfully.
            We&apos;ll take some time to review your profile and
            the work you shared with us.
          </motion.p>

          {/* Response expectation */}
          <motion.p
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.32,
            }}
            className="
              mt-4
              text-sm
              text-gx-ink/45
              sm:text-base
            "
          >
            We typically get back to applicants within 48 hours.
          </motion.p>

          {/* Action */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: shouldReduceMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 sm:mt-12"
          >
            <LinkButton
              href="/recruitment"
              variant="outline"
              size="lg"
              className="
                min-h-12
                min-w-[180px]
                justify-center
                transition-transform
                duration-300
                hover:-translate-y-0.5
              "
            >
              Back to GenXCode
            </LinkButton>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}