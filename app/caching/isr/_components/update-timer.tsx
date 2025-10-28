"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  nextUpdate?: string;
}

export function UpdateTimer({ nextUpdate }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!nextUpdate) return;

    const updateTimer = () => {
      const now = new Date();
      const next = new Date();
      const [hours, minutes, seconds] = nextUpdate.split(":").map(Number);
      next.setHours(hours, minutes, seconds, 0);

      // If next update time has passed, add a day
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
        setTimeLeft("Updating...");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextUpdate]);

  if (!timeLeft) return null;

  return (
    <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-center">
      <p className="text-sm text-yellow-800">
        <strong>Next ISR update in:</strong> {timeLeft}
      </p>
      <p className="text-xs text-yellow-600 mt-1">
        The page will regenerate automatically when someone visits after this
        time
      </p>
    </div>
  );
}
