// app/recruitment/page.tsx
import { RecruitmentHero } from "./_components/RecruitmentHero";
import { RecruitmentIntro } from "./_components/RecruitmentIntro";
import { RecruitmentTracks } from "./_components/RecruitmentTracks";
import { RecruitmentProcess } from "./_components/RecruitmentProcess";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export default function RecruitmentPage() {
  return (
    <div className="flex flex-col w-full">
      <RecruitmentHero/>
      <RecruitmentIntro/>
      <RecruitmentTracks/>
      <RecruitmentProcess/>
      
      {/* Final CTA to apply */}
      <Section className="bg-gx-surface text-center">
        <Container>
          <div className="mx-auto max-w-3xl py-12 md:py-20 border-y border-gx-border">
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">Ready to build?</h2>
            <p className="mb-10 text-lg text-gx-ink/80">
              Applications close soon. Submit your profile and let's shape the future together.
            </p>
            <LinkButton href="/recruitment/apply" size="lg">
              Begin Application
            </LinkButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}