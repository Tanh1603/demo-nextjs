"use client";

import { useState, useEffect } from "react";

interface RevalidationTimerProps {
  nextRevalidation?: string;
}

export function RevalidationTimer({
  nextRevalidation,
}: RevalidationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!nextRevalidation) return;

    const updateTimer = () => {
      const now = new Date();
      const next = new Date();
      const [hours, minutes, seconds] = nextRevalidation.split(":").map(Number);
      next.setHours(hours, minutes, seconds, 0);

      // If next revalidation time has passed, add a day
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }

      const diff = next.getTime() - now.getTime();

      if (diff > 0) {
        const secondsLeft = Math.floor(diff / 1000) % 60;
        const minutesLeft = Math.floor(diff / 60000) % 60;
        setTimeLeft(
          `${minutesLeft}:${secondsLeft.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("Revalidating...");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextRevalidation]);

  if (!timeLeft) return null;

  return (
    <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded text-center">
      <p className="text-sm text-yellow-800">
        <strong>Next revalidation in:</strong> {timeLeft}
      </p>
      <p className="text-xs text-yellow-600 mt-1">
        Refresh the page after this timer reaches zero to see updated content
      </p>
      <p className="text-xs text-yellow-600 mt-1">
        Multiple requests within 10 seconds will show the same cached data
      </p>
    </div>
  );
}
