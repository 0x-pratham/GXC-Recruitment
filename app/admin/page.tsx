import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { adminSignOut, updateApplicationStatus } from "./actions";

export const metadata = {
  title: "Recruitment Admin | GenXCode",
  robots: { index: false, follow: false },
};

const statuses = ["pending", "reviewed", "accepted", "rejected"] as const;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin, error: roleError } = await (supabase.rpc as any)("is_admin");
  if (roleError || isAdmin !== true) redirect("/admin/login?error=unauthorized");

  const { data, error } = await (supabase.from("applications") as any)
    .select("id, created_at, first_name, last_name, email, phone, institution, year_of_study, track, portfolio_url, why_join, status")
    .order("created_at", { ascending: false });

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-gx-surface px-4 py-10 text-gx-ink sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gx-purple">Private workspace</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Recruitment applications</h1>
            <p className="mt-2 text-sm text-gx-ink/65">Signed in as {user.email}</p>
          </div>
          <form action={adminSignOut}>
            <button className="rounded-lg border border-gx-border px-4 py-2 text-sm font-medium hover:bg-gx-background">Sign out</button>
          </form>
        </header>

        {params.updated && <p className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">Application status updated.</p>}
        {params.error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900">We couldn't complete that action. Please try again.</p>}
        {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">Applications could not be loaded. Check the database migration and admin role assignment.</p>}

        {!error && (
          <>
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gx-border bg-gx-background p-5">
                <p className="text-sm text-gx-ink/65">Total applications</p>
                <p className="mt-2 text-3xl font-semibold">{data?.length ?? 0}</p>
              </div>
              <div className="rounded-xl border border-gx-border bg-gx-background p-5">
                <p className="text-sm text-gx-ink/65">Pending review</p>
                <p className="mt-2 text-3xl font-semibold">{data?.filter((item: any) => item.status === "pending").length ?? 0}</p>
              </div>
              <div className="rounded-xl border border-gx-border bg-gx-background p-5">
                <p className="text-sm text-gx-ink/65">Accepted</p>
                <p className="mt-2 text-3xl font-semibold">{data?.filter((item: any) => item.status === "accepted").length ?? 0}</p>
              </div>
            </div>

            <div className="space-y-4">
              {(data ?? []).map((application: any) => (
                <article key={application.id} className="rounded-xl border border-gx-border bg-gx-background p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{application.first_name} {application.last_name}</h2>
                      <p className="mt-1 text-sm text-gx-ink/70">{application.email} · {application.phone}</p>
                      <p className="mt-1 text-sm text-gx-ink/70">{application.institution} · {application.year_of_study} · {application.track}</p>
                      <p className="mt-2 text-xs text-gx-ink/55">Submitted {new Date(application.created_at).toLocaleString("en-IN")}</p>
                    </div>
                    <form action={updateApplicationStatus} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="id" value={application.id} />
                      <label className="sr-only" htmlFor={`status-${application.id}`}>Application status</label>
                      <select id={`status-${application.id}`} name="status" defaultValue={application.status} className="rounded-lg border border-gx-border bg-white px-3 py-2 text-sm">
                        {statuses.map((status) => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
                      </select>
                      <button className="rounded-lg bg-gx-ink px-3 py-2 text-sm font-medium text-white hover:opacity-90">Save status</button>
                    </form>
                  </div>
                  {application.portfolio_url && <p className="mt-4 text-sm">Portfolio: <a className="text-gx-purple underline" href={application.portfolio_url} target="_blank" rel="noreferrer">Open link</a></p>}
                  <div className="mt-4 rounded-lg bg-gx-surface p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gx-ink/55">Why they want to join</p>
                    <p className="whitespace-pre-wrap text-sm leading-6">{application.why_join}</p>
                  </div>
                </article>
              ))}
              {data?.length === 0 && <div className="rounded-xl border border-gx-border bg-gx-background p-8 text-center text-gx-ink/65">No applications yet.</div>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
