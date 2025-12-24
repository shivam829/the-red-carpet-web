"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-24 md:h-28 bg-black">
      {/* HEADER BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/sundown (3).jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        {/* AMBER */}
        <Image
          src="/amber.png"
          alt="Amber by Sayaji"
          width={100}
          height={50}
          className="h-auto w-[90px] md:w-[110px]"
          priority
        />

        {/* NAV */}
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

        {/* SAYAJI */}
        <Image
          src="/sayaji.png"
          alt="Sayaji"
          width={100}
          height={50}
          className="h-auto w-[90px] md:w-[110px]"
          priority
        />
      </div>
    </header>
  );
}
