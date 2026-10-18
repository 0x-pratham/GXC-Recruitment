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

export default async function ApplyPage() {
  if (!RECRUITMENT_OPEN) {
    return <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
      <Container>
        <div className="mx-auto max-w-3xl rounded-gx-lg border border-gx-border bg-gx-background p-6 text-center shadow-sm sm:p-10 md:p-12">
          <h1 className="mb-4 font-serif text-4xl font-semibold text-gx-ink md:text-5xl">Applications are paused.</h1>
          <p className="text-lg leading-relaxed text-gx-ink/80">Recruitment is currently closed. Please check back for the next announcement.</p>
        </div>
      </Container>
    </Section>;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?next=%2Frecruitment%2Fapply");

  return <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
    <Container>
      <div className="mx-auto max-w-3xl rounded-gx-lg border border-gx-border bg-gx-background p-6 shadow-sm sm:p-10 md:p-12">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gx-purple">Recruitment reopened</p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-gx-ink md:text-5xl">Your GenXCode journey starts here.</h1>
          <p className="text-lg text-gx-ink/80">Applications are open until further notice. Fill out the form below and our team will be in touch.</p>
          <p className="mt-4 text-sm text-gx-ink/55">Signed in with Google as <span className="font-medium text-gx-ink">{user.email}</span>.</p>
        </div>
        <RecruitmentForm />
      </div>
    </Container>
  </Section>;
}
