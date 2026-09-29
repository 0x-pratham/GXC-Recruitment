// app/recruitment/apply/page.tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RecruitmentForm } from "./_components/RecruitmentForm";

export const metadata = {
  title: "Apply | GenXCode Recruitment",
  description: "Submit your application to join the GenXCode team.",
};

export default function ApplyPage() {
  return (
    <Section className="bg-gx-surface min-h-[calc(100vh-64px)]">
      <Container>
        <div className="mx-auto max-w-3xl rounded-gx-lg bg-gx-background p-6 shadow-sm border border-gx-border sm:p-10 md:p-12">
          <div className="mb-10">
            <h1 className="mb-4 font-serif text-4xl font-semibold text-gx-ink md:text-5xl">
              Apply Now
            </h1>
            <p className="text-lg text-gx-ink/80">
              Take the first step. Fill out the form below and we'll be in touch within 48 hours.
            </p>
          </div>
          
          <RecruitmentForm />
        </div>
      </Container>
    </Section>
  );
}