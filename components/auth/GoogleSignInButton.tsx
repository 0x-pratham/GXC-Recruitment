"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function safeNextPath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/recruitment/apply";
}

export function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    setIsLoading(true);
    setError(null);
    const supabase = createClient();
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", safeNextPath(searchParams.get("next")));
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl.toString() },
    });
    if (signInError) {
      setError("Google sign-in couldn't start. Please try again.");
      setIsLoading(false);
    }
  }

  return <div className="flex flex-col gap-3">
    <button type="button" onClick={signIn} disabled={isLoading} className="flex min-h-12 w-full items-center justify-center gap-3 rounded-gx-md border border-gx-border bg-white px-5 py-3 text-sm font-semibold text-gx-ink transition hover:bg-gx-surface disabled:cursor-not-allowed disabled:opacity-60">
      <span aria-hidden="true" className="text-lg font-bold text-[#4285F4]">G</span>
      {isLoading ? "Connecting to Google..." : "Continue with Google"}
    </button>
    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
  </div>;
}
