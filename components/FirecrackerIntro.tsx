"use client";

import { useEffect, useState } from "react";

export default function FirecrackerIntro({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [stage, setStage] = useState<
    "ignite" | "explode" | "logo" | "countdown"
  >("ignite");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("explode"), 1200);
    const t2 = setTimeout(() => setStage("logo"), 2200);
    const t3 = setTimeout(() => {
      setStage("countdown");
      onFinish();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Rising Firecracker */}
      {stage === "ignite" && (
        <div className="firecracker-rise" />
      )}

      {/* Explosion */}
      {stage === "explode" && (
        <div className="firecracker-explode" />
      )}

      {/* Logo Reveal */}
      {stage === "logo" && (
        <img
          src="/logo.png"
          alt="The Red Carpet"
          className="w-72 md:w-[380px] animate-logo-reveal"
        />
      )}

      {/* Countdown placeholder animation */}
      {stage === "countdown" && (
        <div className="dynamite-pop">💣</div>
      )}
    </div>
  );
}
