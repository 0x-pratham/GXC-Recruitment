import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminLoginForm } from "./_components/AdminLoginForm";

export const metadata = {
  title: "Admin Sign In | GenXCode",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Reuse an existing Supabase session. Google-authenticated admins should
  // land directly in the dashboard instead of being asked for a password.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: isAdmin, error } = await (supabase.rpc as any)("is_admin");
    if (!error && isAdmin === true) {
      redirect("/admin");
    }
  }

  return (
    <main className="min-h-[70vh] bg-gx-surface px-4 py-16">
      <div className="mx-auto max-w-md rounded-gx-lg border border-gx-border bg-gx-background p-8 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gx-purple">Restricted access</p>
        <h1 className="mb-3 text-3xl font-semibold text-gx-ink">Admin sign in</h1>
        <p className="mb-8 text-sm leading-6 text-gx-ink/70">Sign in with an account that has been granted the admin role.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
