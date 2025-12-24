"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-28 z-50">
      {/* HEADER BACKGROUND ONLY */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/sundown (3).jpg')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* HEADER CONTENT */}
      <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* LEFT – AMBER */}
        <Image
          src="/amber.png"
          alt="Amber by Sayaji"
          width={110}
          height={60}
          priority
        />

        {/* CENTER – NAV */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide text-gray-200">
          {["About", "Experience", "Passes", "Venue", "Terms"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-gold transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT – SAYAJI */}
        <Image
          src="/sayaji.png"
          alt="Sayaji"
          width={110}
          height={60}
          priority
        />
      </div>
    </header>
  );
}
