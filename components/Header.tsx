"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-28 bg-black">
      {/* HEADER BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/sundown (3).jpg')",
          opacity: 0.7,
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Image
          src="/amber.png"
          alt="Amber by Sayaji"
          width={110}
          height={60}
          priority
          className="h-auto w-[110px]"
        />

        <nav className="hidden md:flex gap-8 text-sm tracking-wide text-white">
          {["Experience", "Passes", "Venue", "Terms"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-gold transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Image
          src="/sayaji.png"
          alt="Sayaji"
          width={110}
          height={60}
          priority
          className="h-auto w-[110px]"
        />
      </div>
    </header>
  );
}
