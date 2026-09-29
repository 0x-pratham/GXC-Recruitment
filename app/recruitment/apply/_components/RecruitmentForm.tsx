// app/recruitment/apply/_components/RecruitmentForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";

import {
  applicationSchema,
  type ApplicationFormValues,
} from "@/lib/validations/recruitment";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

import { submitApplication } from "../actions";

export function RecruitmentForm() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Call the Next.js Server Action.
      const result = await submitApplication(data);

      if (!result.success) {
        setServerError(
          result.error || "An unexpected error occurred."
        );
        setIsSubmitting(false);
        return;
      }

      // Redirect to the confirmation route.
      router.push("/recruitment/apply/success");
    } catch {
      setServerError(
        "Something went wrong while submitting your application. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const fieldMotion = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-20 sm:gap-24 md:gap-32"
    >
      {/* =========================================================
          PERSONAL INFORMATION
      ========================================================= */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fieldMotion}
        className="flex flex-col gap-10"
      >
        <div className="max-w-2xl">
          <h2
            className="
              font-serif
              text-4xl
              font-normal
              leading-[1]
              tracking-[-0.03em]
              text-gx-ink
              sm:text-5xl
              md:text-6xl
            "
          >
            Tell us about
            <br />
            <span className="italic text-gx-purple">yourself.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gx-ink/60 sm:text-lg">
            Start with a few details so we know who you are and where
            you&apos;re coming from.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="e.g. Prathamesh Bhil"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Institution / University"
            placeholder="e.g. JSPM University"
            {...register("institution")}
            error={errors.institution?.message}
          />

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="year"
              className="text-sm font-medium text-gx-ink/80"
            >
              Year of Study
            </label>

            <select
              id="year"
              {...register("year")}
              className="
                h-12
                w-full
                border-0
                border-b
                border-gx-ink/15
                bg-transparent
                px-0
                py-2
                text-base
                text-gx-ink
                outline-none
                transition-colors
                duration-300
                focus:border-gx-purple
                focus:ring-0
              "
            >
              <option value="">Select your year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Final Year">Final Year</option>
              <option value="Graduated">Graduated</option>
            </select>

            {errors.year && (
              <span className="text-sm font-medium text-red-500">
                {errors.year.message}
              </span>
            )}
          </div>
        </div>
      </motion.section>

      {/* =========================================================
          TECHNICAL PROFILE
      ========================================================= */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fieldMotion}
        className="flex flex-col gap-10"
      >
        <div className="max-w-2xl">
          <h2
            className="
              font-serif
              text-4xl
              font-normal
              leading-[1]
              tracking-[-0.03em]
              text-gx-ink
              sm:text-5xl
              md:text-6xl
            "
          >
            Show us how
            <br />
            <span className="italic text-gx-purple">you build.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gx-ink/60 sm:text-lg">
            Tell us where your technical interests lie and what you
            would like to contribute to GenXCode.
          </p>
        </div>

        <div className="flex flex-col gap-7">
          {/* Primary Track */}

          <div className="flex w-full flex-col gap-2 md:max-w-xl">
            <label
              htmlFor="track"
              className="text-sm font-medium text-gx-ink/80"
            >
              Primary Track
            </label>

            <select
              id="track"
              {...register("track")}
              className="
                h-12
                w-full
                border-0
                border-b
                border-gx-ink/15
                bg-transparent
                px-0
                py-2
                text-base
                text-gx-ink
                outline-none
                transition-colors
                duration-300
                focus:border-gx-purple
                focus:ring-0
              "
            >
              <option value="">Select a track</option>
              <option value="frontend">
                Frontend Engineering
              </option>
              <option value="backend">
                Backend Engineering
              </option>
              <option value="design">
                Product Design
              </option>
              <option value="fullstack">
                Full Stack Engineering
              </option>
            </select>

            {errors.track && (
              <span className="text-sm font-medium text-red-500">
                {errors.track.message}
              </span>
            )}
          </div>

          {/* Portfolio */}

          <div className="md:max-w-2xl">
            <Input
              label="Portfolio / GitHub URL"
              placeholder="https://github.com/yourusername"
              {...register("portfolioUrl")}
              error={errors.portfolioUrl?.message}
            />

            <p className="mt-2 text-sm text-gx-ink/45">
              Optional — share something that represents your work.
            </p>
          </div>

          {/* Why GenXCode */}

          <Textarea
            label="Why GenXCode?"
            placeholder="Tell us what excites you about joining the community and what you hope to build..."
            {...register("whyJoin")}
            error={errors.whyJoin?.message}
          />
        </div>
      </motion.section>

      {/* =========================================================
          SERVER ERROR
      ========================================================= */}

      {serverError && (
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 10 }
          }
          animate={{ opacity: 1, y: 0 }}
          className="
            max-w-2xl
            border-l-2
            border-red-500
            bg-red-50/70
            px-5
            py-4
          "
          role="alert"
        >
          <p className="text-sm font-medium leading-6 text-red-600">
            {serverError}
          </p>
        </motion.div>
      )}

      {/* =========================================================
          SUBMIT
      ========================================================= */}

      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col items-start gap-5"
      >
        <motion.div
          whileTap={
            shouldReduceMotion
              ? undefined
              : { scale: 0.98 }
          }
        >
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="
              min-h-12
              min-w-[190px]
              px-7
              transition-transform
              duration-300
              hover:-translate-y-0.5
            "
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}
          </Button>
        </motion.div>

        <p className="max-w-md text-sm leading-6 text-gx-ink/45">
          By submitting this application, you confirm that the
          information provided is accurate.
        </p>
      </motion.div>
    </form>
  );
}