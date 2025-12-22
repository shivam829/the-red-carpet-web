"use client";
export const dynamic = "force-dynamic";

import FloatingLanterns from "@/components/FloatingLanterns";
import Passes from "@/components/Passes";
import VVIP from "@/components/VVIP";
import LayoutMap from "@/components/LayoutMap";
import Header from "@/components/Header";

export default function App() {
  return (
    <div>
      <Header />

      <main className="relative text-white">
        {/* HERO SECTION */}
        <section
          className="relative min-h-screen flex items-center justify-center text-center px-6"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1541532713592-79a0317b6b77)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0" />

          <FloatingLanterns />

          {/* BLINKING BADGE */}
          <div className="absolute top-6 left-6 z-50">
            <div className="animate-blink bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-lg">
              ⚡ Hurry Up! Limited Passes
            </div>
          </div>

          {/* HERO CONTENT (TIGHT STACK) */}
          <div className="relative z-20 flex flex-col items-center leading-none">
            <img src="/logo.png" className="w-120" />

            <h1 className="text-5xl md:text-7xl font-bold text-gold -mt-3">
              THE RED CARPET
            </h1>

            <p className="text-base md:text-lg text-gray-200 mt-1">
              Central India's Biggest Open-Air New Year Celebration
            </p>

            <p className="text-sm md:text-base text-gray-300 mt-0.5">
              31st December 2025 · Amber by Sayaji, Bhopal
            </p>

            <a
              href="#passes"
              className="mt-4 px-10 py-4 bg-redcarpet rounded-xl text-lg hover:bg-gold hover:text-black transition"
            >
              Reserve Your Entry
            </a>
          </div>
        </section>

        {/* EVENT LINEUP */}
        <section className="py-24 px-6 bg-black">
          <h2 className="text-4xl font-bold text-gold text-center mb-14">
            The Night Unfolds
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { src: "/videos/techno-mix.mp4", label: "🎧 Live DJs & EDM" },
              { src: "/videos/fire-poi.mp4", label: "🔥 Fire Performers" },
              { src: "/videos/fireworks.mp4", label: "🎆 Midnight Fireworks" },
            ].map((v) => (
              <div
                key={v.src}
                className="rounded-xl overflow-hidden bg-black/60 border border-gold/20 hover:scale-105 transition"
              >
                <video autoPlay loop muted playsInline className="h-56 w-full object-cover">
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="p-6 text-center text-lg">{v.label}</div>
              </div>
            ))}
          </div>
        </section>

        <Passes />
        <VVIP />
        <LayoutMap />

        {/* FOOTER */}
        <footer className="py-12 text-center text-gray-300 bg-black/90">
          <p>📍 Amber by Sayaji, Bhopal</p>
          <p>📞 +91 7000443100</p>

          <a
            href="https://www.instagram.com/theredcarpet2026"
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 hover:opacity-80"
          >
            <img src="/instalogo.jpg" className="w-5 h-5 rounded-sm" />
            <span className="text-sm">@theredcarpet2026</span>
          </a>

          <p className="mt-4 text-sm">
            © 2025 THE RED CARPET. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
