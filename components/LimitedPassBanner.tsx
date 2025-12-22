"use client";

import { usePathname } from "next/navigation";

export default function LimitedPassBanner() {
  const pathname = usePathname();

  // ❌ Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed top-5 left-5 z-40 pointer-events-none">
      <div className="animate-blink bg-red-600/90 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold tracking-wide">
        🚨 Hurry Up – Limited Passes
      </div>
    </div>
  );
}
