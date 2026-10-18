"use client";

import { CheckCircle2, Sparkles } from "lucide-react";

export function RecruitmentCountdown() {
  return (
    <section
      aria-label="Recruitment announcement"
      className="sticky top-0 z-50 w-full border-b border-gx-purple/20 bg-gx-lavender/95 px-4 py-3 text-gx-ink shadow-sm backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <Sparkles aria-hidden="true" className="h-4 w-4 text-gx-purple" />
        <span className="text-sm font-semibold sm:text-base">
          GenXCode recruitment is open again!
        </span>
        <span className="text-sm text-gx-ink/75">
          Applications are open until further notice.
        </span>
      </div>
    </section>
  );
}
