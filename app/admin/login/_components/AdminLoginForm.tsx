"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Sign-in failed. Check your credentials and try again.");
      setBusy(false);
      return;
    }
    const { data, error: roleError } = await supabase.rpc("is_admin");
    if (roleError || data !== true) {
      await supabase.auth.signOut();
      setError("This account has not been authorized for admin access.");
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gx-ink">Email</label>
        <input id="admin-email" type="email" autoComplete="username" required value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-gx-border bg-white px-3 py-3 text-gx-ink outline-none focus:border-gx-purple" />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-gx-ink">Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-gx-border bg-white px-3 py-3 text-gx-ink outline-none focus:border-gx-purple" />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy}
        className="w-full rounded-lg bg-gx-ink px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
