"use client";

import { useEffect, useState } from "react";

export default function FloatingLanterns() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-orange-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 14}px`,
          }}
        >
          🏮
        </div>
      ))}
    </div>
  );
}
