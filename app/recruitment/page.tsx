// app/recruitment/page.tsx
import { RecruitmentHero } from "./_components/RecruitmentHero";
import { RecruitmentIntro } from "./_components/RecruitmentIntro";
import { RecruitmentTracks } from "./_components/RecruitmentTracks";
import { RecruitmentProcess } from "./_components/RecruitmentProcess";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { RECRUITMENT_OPEN } from "@/lib/recruitment-config";

export default function RecruitmentPage() {
  return (
    <div className="flex w-full flex-col">
      <RecruitmentHero />
      <RecruitmentIntro />
      <RecruitmentTracks />
      <RecruitmentProcess />

      <Section className="bg-gx-surface text-center">
        <Container>
          <div className="mx-auto max-w-3xl border-y border-gx-border py-12 md:py-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gx-purple">
              {RECRUITMENT_OPEN ? "Applications are open" : "Applications are currently closed"}
            </p>
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">
              {RECRUITMENT_OPEN ? "Ready to build with us?" : "The next chapter is coming."}
            </h2>
            <p className="mb-10 text-lg text-gx-ink/80">
              {RECRUITMENT_OPEN
                ? "Recruitment has reopened. Explore the opportunities and send us your application whenever you're ready."
                : "Applications are paused for now. Keep an eye on GenXCode for the next update."}
            </p>
            {RECRUITMENT_OPEN && (
              <LinkButton href="/recruitment/apply" size="lg">
                Begin Application
              </LinkButton>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
