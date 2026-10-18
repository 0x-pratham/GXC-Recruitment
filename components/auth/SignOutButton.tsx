"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  async function signOut() {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/auth/login");
    router.refresh();
  }

  return <button type="button" onClick={signOut} disabled={isSigningOut} className="rounded-gx-md border border-gx-border px-4 py-2 text-sm font-semibold text-gx-ink transition hover:bg-gx-surface disabled:opacity-60">
    {isSigningOut ? "Signing out…" : "Sign out"}
  </button>;
}
