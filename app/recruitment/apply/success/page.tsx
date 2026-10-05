// app/recruitment/apply/success/page.tsx

"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

export default function SuccessPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Automatically redirect to the WhatsApp group after 4.5 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://chat.whatsapp.com/D0f8B8hCLx6FmpgGsXJfuS";
    }, 4500);

    // Cleanup the timer if the component unmounts early
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <Section className="flex min-h-[calc(100vh-64px)] items-center bg-gx-surface py-20 sm:py-24">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Visual acknowledgement */}
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
            className="mt-4 text-sm text-gx-ink/45 sm:text-base"
          >
            We typically get back to applicants within 48 hours.
          </motion.p>

          {/* Mandatory WhatsApp Group */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: shouldReduceMotion ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-10 
              flex 
              w-full 
              max-w-lg 
              flex-col 
              items-center 
              rounded-2xl 
              border 
              border-red-500/20 
              bg-red-50/50 
              p-6 
              sm:mt-12 
              sm:p-8
            "
          >
            <span className="mb-3 rounded-full bg-red-100 px-3 py-1 text-xs font-bold tracking-wider text-red-600">
              ACTION REQUIRED
            </span>
            
            <p className="text-lg font-medium text-gx-ink">
              Join the GXC GC 2026-27 Batch
            </p>

            <p className="mt-2 text-center text-sm leading-6 text-gx-ink/65">
              It is <strong>compulsory</strong> to join this WhatsApp group. All further task assignments, interview schedules, and next steps for the recruitment process will be shared exclusively here.
            </p>

            <a
              href="https://chat.whatsapp.com/D0f8B8hCLx6FmpgGsXJfuS"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-6
                inline-flex
                min-h-11
                items-center
                justify-center
                rounded-gx-md
                bg-[#25D366]
                px-7
                text-sm
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#20bd5a]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#25D366]
                focus-visible:ring-offset-2
              "
            >
              Join WhatsApp Group
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            
            <p className="mt-4 text-xs font-medium text-gx-ink/60 animate-pulse">
              Redirecting automatically in a few seconds...
            </p>
          </motion.div>

          {/* Back to recruitment */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.55,
            }}
            className="mt-8"
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