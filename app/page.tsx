// app/page.tsx
import { HomeHero } from "./_components/HomeHero";
import { HomePhilosophy } from "./_components/HomePhilosophy";
import { HomePrinciples } from "./_components/HomePrinciples";
import { HomeCTA } from "./_components/HomeCTA";
import { RecruitmentCountdown } from "./_components/RecruitmentCountdown";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden bg-gx-background text-gx-ink relative">
      {/* The countdown will inject itself at the top, or take over the screen if closed */}
      <RecruitmentCountdown />
      <HomeHero />
      <HomePhilosophy />
      <HomePrinciples />
      <HomeCTA />
    </main>
  );
}