"use client";

import { useState } from "react";

export function ClosedRecruitmentModal({ message }: { message: string }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gx-ink/60 px-4 py-6 backdrop-blur-sm" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="recruitment-closed-title" className="w-full max-w-lg rounded-gx-lg border border-gx-border bg-gx-background p-7 text-center shadow-2xl sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gx-purple/10 text-gx-purple" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gx-purple">GenXCode Recruitment</p>
            <h1 id="recruitment-closed-title" className="mt-3 font-serif text-3xl font-semibold text-gx-ink">Recruitment Applications Are Closed</h1>
            <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-gx-ink/70">{message}</p>
            <button type="button" onClick={() => setOpen(false)} className="mt-7 min-h-11 w-full rounded-gx-md bg-gx-purple px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">Got it</button>
          </section>
        </div>
      )}
    </>
  );
}
