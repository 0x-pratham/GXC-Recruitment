import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export const metadata = {
  title: "Sign in | GenXCode",
  description: "Sign in securely with Google to continue to GenXCode.",
};

function SignInContent() {
  return (
    <div className="mx-auto max-w-lg rounded-gx-lg border border-gx-border bg-gx-background p-7 shadow-sm sm:p-10">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gx-purple">
        GenXCode account
      </p>
      <h1 className="font-serif text-4xl font-semibold text-gx-ink sm:text-5xl">
        Welcome aboard.
      </h1>
      <p className="mt-4 mb-8 leading-7 text-gx-ink/65">
        Sign in with Google to continue. Applicants can use their Google account
        to start an application. Administrator access is checked separately on
        the server.
      </p>
      <GoogleSignInButton />
      <p className="mt-6 text-center text-xs leading-5 text-gx-ink/50">
        By continuing, you agree to use your own account and provide accurate
        application information.
      </p>
      <div className="mt-8 text-center">
        <Link href="/recruitment" className="text-sm font-medium text-gx-purple hover:underline">
          Back to recruitment
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
      <Container>
        <Suspense fallback={<div className="mx-auto max-w-lg p-10 text-center">Loading sign-in…</div>}>
          <SignInContent />
        </Suspense>
      </Container>
    </Section>
  );
}
