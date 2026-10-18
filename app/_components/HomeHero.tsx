// app/_components/HomeHero.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Activity, Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";

type SeatCounts = { girls: number; boys: number; updatedAt?: string };

function SeatProgress({
  label,
  filled,
  capacity,
  color,
}: {
  label: string;
  filled: number;
  capacity: number;
  color: "purple" | "blue";
}) {
  const safeFilled = Math.min(Math.max(filled, 0), capacity);
  const available = Math.max(capacity - safeFilled, 0);
  const percent = (safeFilled / capacity) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-gx-ink">{label}</span>
        <span className={color === "purple" ? "font-semibold text-gx-purple" : "font-semibold text-sky-700"}>
          {available} available <span className="font-normal text-gx-ink/45">/ {capacity}</span>
        </span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-gx-ink/5"
        role="progressbar"
        aria-label={`${label} seats filled`}
        aria-valuemin={0}
        aria-valuemax={capacity}
        aria-valuenow={safeFilled}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${color === "purple" ? "bg-gx-purple" : "bg-sky-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gx-ink/50">{safeFilled} of {capacity} seats filled</p>
    </div>
  );
}

function LiveSeatTracker() {
  const [counts, setCounts] = useState<SeatCounts>({ girls: 0, boys: 0 });
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;

    async function refreshCounts() {
      try {
        const response = await fetch("/api/recruitment/seats", { cache: "no-store" });
        if (!response.ok) throw new Error("Seat count request failed");
        const result = (await response.json()) as SeatCounts;
        if (!active) return;
        setCounts({
          girls: Math.max(0, Number(result.girls) || 0),
          boys: Math.max(0, Number(result.boys) || 0),
          updatedAt: result.updatedAt,
        });
        setUnavailable(false);
      } catch {
        if (active) setUnavailable(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    void refreshCounts();
    const intervalId = window.setInterval(() => void refreshCounts(), 30_000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const total = counts.girls + counts.boys;
  const remaining = Math.max(41 - total, 0);
  const percent = Math.min((total / 41) * 100, 100);
  const updated = counts.updatedAt
    ? new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date(counts.updatedAt))
    : null;

  return (
    <aside aria-label="Live GenXCode recruitment seat availability" className="w-full max-w-xl rounded-[1.75rem] border border-white/80 bg-white/75 p-6 text-left shadow-[0_24px_80px_rgba(63,28,105,0.09)] backdrop-blur-xl sm:p-8 lg:p-9">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gx-ink/45">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live seat tracking
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl leading-none tracking-[-0.05em] text-gx-ink sm:text-6xl">{loading ? "—" : total}</span>
            <span className="text-sm text-gx-ink/45">/ 41 seats</span>
          </div>
          <p className="mt-2 text-sm text-gx-ink/60">Applications received</p>
        </div>
        <div className="rounded-xl bg-gx-purple/5 px-3 py-2 text-right">
          <p className="font-serif text-2xl text-gx-purple">{loading ? "—" : `${Math.round(percent)}%`}</p>
          <p className="text-[11px] text-gx-ink/50">filled</p>
        </div>
      </div>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gx-ink/5">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-300 via-gx-purple to-indigo-500 transition-[width] duration-700 ease-out" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-7 space-y-6">
        <SeatProgress label="Girls" filled={counts.girls} capacity={25} color="purple" />
        <SeatProgress label="Boys" filled={counts.boys} capacity={16} color="blue" />
      </div>

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-gx-ink/5 pt-5 text-xs text-gx-ink/50">
        <span className="inline-flex items-center gap-1.5"><Activity size={14} />{unavailable ? "Live counts unavailable" : updated ? `Updated ${updated}` : loading ? "Loading latest counts…" : "Counts up to date"}</span>
        <span className="inline-flex items-center gap-1.5"><Users size={14} />{loading ? "—" : `${remaining} left`}</span>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-gx-ink/40">Counts refresh every 30 seconds and reflect submitted applications.</p>
    </aside>
  );
}

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([".hero-title-line", ".hero-description", ".hero-actions", ".hero-atmosphere", ".hero-scroll-cue"], {
          opacity: 1, y: 0, scale: 1,
        });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".hero-title-line", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 })
        .fromTo(".hero-description", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.45")
        .fromTo(".hero-actions", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-atmosphere", { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power2.out" }, "-=0.9");

      gsap.to(".hero-atmosphere", { x: 18, y: -12, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-scroll-arrow", { y: 4, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="relative flex min-h-[100svh] items-center overflow-hidden bg-gx-surface px-0 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-24 lg:pt-24">
      <div ref={containerRef} className="relative z-10 flex w-full items-center">
        <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,208,253,0.62)_0%,rgba(225,208,253,0.22)_42%,transparent_70%)] opacity-0 blur-[6px] will-change-transform sm:h-[620px] sm:w-[620px] lg:h-[760px] lg:w-[760px]" />
        <Container>
          <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 text-center lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:text-left xl:gap-20">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="max-w-[850px] font-serif text-[3.6rem] font-normal leading-[0.88] tracking-[-0.055em] text-gx-ink sm:text-[5rem] md:text-[6.2rem] lg:text-[5.5rem] xl:text-[6.8rem]">
                <span className="hero-title-line block opacity-0">We build</span>
                <span className="hero-title-line block opacity-0"><span className="italic text-gx-purple">digital</span>{" "}reality.</span>
              </h1>
              <p className="hero-description mt-6 max-w-2xl text-base leading-7 text-gx-ink/65 opacity-0 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
                GenXCode is a technology community where developers, designers and builders come together to create meaningful products and solve real problems.
              </p>
              <div className="hero-actions mt-8 opacity-0 sm:mt-9">
                <LinkButton href="/recruitment" size="lg" className="group min-h-12 min-w-[190px] px-7 transition-transform duration-300 hover:-translate-y-0.5">
                  <span>Join GenXCode</span><span aria-hidden="true" className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </LinkButton>
              </div>
            </div>
            <div className="flex w-full justify-center lg:justify-end">
              <LiveSeatTracker />
            </div>
          </div>
        </Container>
        <div className="hero-scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-wide text-gx-ink/40 opacity-0 sm:bottom-10">
          <span aria-hidden="true" className="hero-scroll-arrow text-sm text-gx-purple">↓</span>
        </div>
      </div>
    </Section>
  );
}
