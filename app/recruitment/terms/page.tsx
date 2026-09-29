// app/recruitment/terms/page.tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Terms of Service | GenXCode",
  description: "Terms and conditions for applying to GenXCode.",
};

export default function TermsPage() {
  return (
    <Section className="bg-gx-background pt-24 pb-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 border-b border-gx-border pb-8 text-center">
            <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight text-gx-ink">
              Terms of Service
            </h1>
            <p className="text-gx-ink/60">Last updated: September 2026</p>
          </div>

          <div className="prose prose-gx max-w-none space-y-8 text-gx-ink/80">
            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By submitting an application through the GenXCode recruitment portal, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not submit an application.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">2. Application Process</h2>
              <p className="leading-relaxed">
                We reserve the right to review, accept, or reject any application at our sole discretion. Submitting an application does not guarantee an interview or an offer of employment/internship. All information provided must be accurate and truthful.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">3. Intellectual Property</h2>
              <p className="leading-relaxed">
                Any code, designs, or materials submitted as part of a technical assessment remain your intellectual property. However, by submitting them, you grant GenXCode a temporary license to review and evaluate the materials for recruitment purposes.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}