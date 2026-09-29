// app/recruitment/privacy/page.tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Privacy Policy | GenXCode",
  description: "How we handle your data during the recruitment process.",
};

export default function PrivacyPage() {
  return (
    <Section className="bg-gx-background pt-24 pb-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 border-b border-gx-border pb-8 text-center">
            <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight text-gx-ink">
              Privacy Policy
            </h1>
            <p className="text-gx-ink/60">Last updated: September 2026</p>
          </div>

          <div className="prose prose-gx max-w-none space-y-8 text-gx-ink/80">
            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">1. Data Collection</h2>
              <p className="leading-relaxed">
                When you apply to GenXCode, we collect personal information such as your name, email address, educational institution, and any links (like GitHub or portfolio URLs) you provide. We also collect the content of your application essays and technical submissions.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">2. Data Usage</h2>
              <p className="leading-relaxed">
                Your data is used strictly for recruitment and evaluation purposes. We use this information to assess your technical skills, communicate with you regarding your application status, and schedule interviews.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">3. Data Security & Retention</h2>
              <p className="leading-relaxed">
                Your application data is securely stored in our Supabase database with Row Level Security (RLS) enforced. Only authorized engineering leads and HR personnel have access to this data. We retain applicant data for up to 12 months for future opportunities, after which it is securely deleted, unless you request deletion sooner.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}