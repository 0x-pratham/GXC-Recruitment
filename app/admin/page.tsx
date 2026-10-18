import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin | GenXCode",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=%2Fadmin");

  // Only trusted app_metadata can grant admin privileges. user_metadata is user-editable.
  if (user.app_metadata?.role !== "admin") {
    return <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
      <Container>
        <div className="mx-auto max-w-xl rounded-gx-lg border border-gx-border bg-gx-background p-8 text-center sm:p-12">
          <h1 className="font-serif text-4xl font-semibold text-gx-ink">Admin access required</h1>
          <p className="mt-4 leading-7 text-gx-ink/65">You are signed in, but this Google account has not been granted administrator access.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/recruitment" className="text-sm font-semibold text-gx-purple hover:underline">Back to site</Link>
            <SignOutButton />
          </div>
        </div>
      </Container>
    </Section>;
  }

  return <Section className="min-h-[calc(100vh-64px)] bg-gx-surface">
    <Container>
      <div className="mx-auto max-w-3xl rounded-gx-lg border border-gx-border bg-gx-background p-8 sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gx-purple">Restricted area</p>
            <h1 className="font-serif text-4xl font-semibold text-gx-ink">Admin access verified.</h1>
          </div>
          <SignOutButton />
        </div>
        <p className="mt-5 leading-7 text-gx-ink/65">Signed in as {user.email ?? "an authenticated administrator"}.</p>
        <p className="mt-4 rounded-gx-md border border-gx-border bg-gx-surface p-4 text-sm leading-6 text-gx-ink/70">
          The repository currently has no recruitment-management dashboard. This page establishes the protected admin entry point; application review tools can be added separately.
        </p>
      </div>
    </Container>
  </Section>;
}
