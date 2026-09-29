// app/recruitment/about/page.tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "About Us | GenXCode Recruitment",
  description: "Learn about our mission, culture, and what drives us at GenXCode.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <Section className="bg-gx-surface pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-gx-ink md:text-6xl">
              Engineering <span className="text-gx-purple">Excellence</span>
            </h1>
            <p className="text-lg text-gx-ink/80 md:text-xl leading-relaxed">
              We are a collective of developers, designers, and problem solvers dedicated to pushing the boundaries of what's possible on the web.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-gx-background">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12 text-lg text-gx-ink/80 leading-relaxed">
            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">Our Mission</h2>
              <p>
                At GenXCode, our mission is simple: build software that matters. We believe that great products are born from a deep understanding of user needs, paired with uncompromising technical execution. We don't just assemble frameworks; we craft experiences that are fast, accessible, and beautiful.
              </p>
            </div>
            
            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">The Culture</h2>
              <p>
                We operate on high trust and high autonomy. You won't find micromanagement here. Instead, you'll find a team that expects you to take ownership of your work, voice your ideas, and challenge the status quo. We value clear communication, continuous learning, and a willingness to step outside your comfort zone.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gx-ink">Why Join Us?</h2>
              <p>
                Because you want to do the best work of your career. You'll be surrounded by peers who care about the craft just as much as you do. We provide the tools, the environment, and the challenges necessary for you to grow exponentially.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}