// app/_components/RecruitmentCountdown.tsx
"use client";

import { useEffect, useState } from "react";
import { AlarmClock, Loader2 } from "lucide-react";

export function RecruitmentCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isClosed, setIsClosed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Target Date: Oct 7, 2026, 12:40 AM IST (26 hours from current time)
    const targetDate = new Date("2026-10-07T00:40:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsClosed(true);

        // Wait 3.5 seconds so they can read the message before redirecting
        setTimeout(() => {
          window.location.href = "https://genxcode.cosmolix.co.in";
        }, 3500); 
      } else {
        setTimeLeft({
          // Removed the 24h modulo so it correctly shows 26 hours instead of 2
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null; 

  if (isClosed) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gx-surface text-gx-ink px-6">
        <div className="flex flex-col items-center space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl text-gx-purple text-center tracking-tight">
            Recruitment Closed
          </h1>
          <p className="text-lg text-center text-gx-ink/80 leading-relaxed">
            Thank you for your overwhelming support and response. You are being redirected to our main portal...
          </p>
          <Loader2 className="w-8 h-8 text-gx-purple animate-spin mt-4" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-gx-lavender/95 backdrop-blur-sm text-gx-ink py-2.5 px-4 flex items-center justify-center gap-3 border-b border-gx-purple/20 shadow-sm transition-all">
        <AlarmClock className="w-5 h-5 text-red-600 animate-pulse" />
        <span className="text-sm md:text-base font-medium">
          Recruitment closes in:
        </span>
        {/* Added 'animate-timebomb' to the numbers for the red blinking effect */}
        <span className="animate-timebomb font-bold tracking-wider tabular-nums bg-gx-background/60 px-2.5 py-0.5 rounded-md border border-red-500/20 text-sm md:text-base shadow-sm">
          {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* Inline styles for the specific hard-blink timebomb effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes timebomb-blink {
            0%, 49% { color: #ef4444; text-shadow: 0 0 10px rgba(239, 68, 68, 0.6); }
            50%, 100% { color: #220849; text-shadow: none; }
          }
          .animate-timebomb {
            animation: timebomb-blink 1s infinite;
          }
        `
      }} />
    </>
  );
}