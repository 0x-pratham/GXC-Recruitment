import { AdminLoginForm } from "./_components/AdminLoginForm";

export const metadata = {
  title: "Admin Sign In | GenXCode",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
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
