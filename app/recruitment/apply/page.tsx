// app/recruitment/apply/page.tsx
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RecruitmentForm } from "./_components/RecruitmentForm";
import { RECRUITMENT_OPEN } from "@/lib/recruitment-config";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Apply | GenXCode Recruitment",
  description: "Submit your application to join the GenXCode team.",
};

const applicationStatusCopy = {
  pending: {
    label: "Under Review",
    title: "You've already applied!",
    message:
      "Your application has been submitted successfully and is currently under review. There's no need to submit another application. We'll share updates when your status changes.",
    style: "border-amber-500/30 bg-amber-50 text-amber-800",
  },
  reviewed: {
    label: "Reviewed",
    title: "Your application has been reviewed",
    message:
      "Our team has reviewed your application. Please keep an eye out for further updates about the recruitment process.",
    style: "border-gx-purple/30 bg-gx-purple/5 text-gx-purple",
  },
  accepted: {
    label: "Accepted",
    title: "Congratulations!",
    message:
      "Your application has been accepted. Please keep an eye on the official GenXCode communication channels for next steps.",
    style: "border-emerald-500/30 bg-emerald-50 text-emerald-800",
  },
  rejected: {
    label: "Not Selected",
    title: "Thank you for applying",
    message:
      "Thank you for your interest in GenXCode. Unfortunately, your application wasn't selected this time.",
    style: "border-red-500/30 bg-red-50 text-red-800",
  },
} as const;

function StatusCard({
  title,
  message,
  label,
  style,
}: {
  title: string;
  message: string;
  label?: string;
  style?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-gx-lg border border-gx-border bg-gx-background p-6 text-center shadow-sm sm:p-10 md:p-12">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gx-purple/10 text-2xl text-gx-purple" aria-hidden="true">
        ✓
      </div>
      {label && (
        <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${style ?? ""}`}>
          {label}
        </span>
      )}
      <h1 className="mt-5 font-serif text-4xl font-semibold text-gx-ink md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gx-ink/70 sm:text-lg">
        {message}
      </p>
      <a
        href="/recruitment"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-gx-md border border-gx-border px-6 py-3 text-sm font-medium text-gx-ink transition-colors hover:bg-gx-surface"
      >
        Back to GenXCode
      </a>
    </div>
  );
}

export default async function ApplyPage() {
  if (!RECRUITMENT_OPEN) {
    return (
      <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
        <Container>
          <StatusCard
            title="Applications are paused."
            message="Recruitment is currently closed. Please check back for the next announcement."
          />
        </Container>
      </Section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=%2Frecruitment%2Fapply");

  const { data: application, error: lookupError } = await supabase
    .from("applications")
    .select("status")
    .ilike("email", user.email ?? "")
    .maybeSingle();

  if (lookupError) {
    console.error("Application status lookup failed:", lookupError.message);
    return (
      <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
        <Container>
          <StatusCard
            title="We couldn't check your application yet."
            message="To protect your application, the form is temporarily unavailable while we verify whether you've already applied. Please refresh this page in a moment."
          />
        </Container>
      </Section>
    );
  }

  if (application) {
    const status =
      applicationStatusCopy[
        application.status as keyof typeof applicationStatusCopy
      ];

    if (status) {
      return (
        <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
          <Container>
            <StatusCard
              title={status.title}
              message={status.message}
              label={status.label}
              style={status.style}
            />
          </Container>
        </Section>
      );
    }

    return (
      <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
        <Container>
          <StatusCard
            title="You've already submitted an application."
            message="Your application is on record. Please contact the recruitment team if you need help with its status."
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
      <Container>
        <div className="mx-auto max-w-3xl rounded-gx-lg border border-gx-border bg-gx-background p-6 shadow-sm sm:p-10 md:p-12">
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gx-purple">
              Recruitment reopened
            </p>
            <h1 className="mb-4 font-serif text-4xl font-semibold text-gx-ink md:text-5xl">
              Your GenXCode journey starts here.
            </h1>
            <p className="text-lg text-gx-ink/80">
              Applications are open until further notice. Fill out the form below and our team will be in touch.
            </p>
            <p className="mt-4 text-sm text-gx-ink/55">
              Signed in with Google as{" "}
              <span className="font-medium text-gx-ink">{user.email}</span>.
            </p>
          </div>
          <RecruitmentForm email={user.email ?? ""} />
        </div>
      </Container>
    </Section>
  );
}
