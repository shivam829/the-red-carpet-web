"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = ["Experience", "Passes", "Venue", "Terms","Contact Us"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-24 bg-black">
      {/* HEADER BACKGROUND IMAGE */}
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
        {/* LEFT – AMBER */}
        <Image
          src="/amber.png"
          alt="Amber by Sayaji"
          width={110}
          height={60}
          priority
          style={{ width: "110px", height: "auto" }}
        />

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide text-white">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-gold transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* RIGHT – SAYAJI (DESKTOP ONLY) */}
        <div className="hidden md:block">
          <Image
            src="/sayaji.png"
            alt="Sayaji"
            width={110}
            height={60}
            priority
            style={{ width: "110px", height: "auto" }}
          />
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-black/95 backdrop-blur border-t border-gold/20">
          <nav className="flex flex-col items-center gap-6 py-6 text-white text-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="hover:text-gold transition"
              >
                {item}
              </Link>
            ))}

            {/* SAYAJI LOGO (MOBILE) */}
            <Image
              src="/sayaji.png"
              alt="Sayaji"
              width={120}
              height={60}
              style={{ width: "120px", height: "auto" }}
            />
          </nav>
        </div>
      )}
    </header>
  );
}
