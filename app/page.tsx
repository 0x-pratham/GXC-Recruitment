// app/page.tsx
import { HomeHero } from "./_components/HomeHero";
import { HomePhilosophy } from "./_components/HomePhilosophy";
import { HomePrinciples } from "./_components/HomePrinciples";
import { HomeCTA } from "./_components/HomeCTA";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden bg-gx-background text-gx-ink">
      <HomeHero />
      <HomePhilosophy />
      <HomePrinciples />
      <HomeCTA />
    </main>
  );
}