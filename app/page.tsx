import Passes from "@/components/Passes";
import VVIP from "@/components/VVIP";
import LayoutMap from "@/components/LayoutMap";

export default function HomePage() {
  return (
    <main>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-start text-center px-6 pt-48">

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="The Red Carpet Logo"
          className="w-52 md:w-64 mb-4"
        />

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4">
          THE RED CARPET
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg md:text-xl text-gray-200 mb-2">
          Central India’s Biggest Open-Air New Year Celebration
        </p>

        {/* DATE & VENUE */}
        <p className="text-gray-300 mb-8">
          31st December 2025 · Amber by Sayaji, Bhopal
        </p>

        {/* CTA */}
        <button className="px-10 py-4 bg-redcarpet rounded-xl text-lg hover:bg-gold hover:text-black transition">
          Reserve Your Entry
        </button>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-24 px-6 bg-transparent">
        <h2 className="text-4xl font-bold text-gold text-center mb-12">
          The Experience
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Floating Lantern Ceremony",
            "Synchronized Fireworks",
            "Live DJs & Band Performances",
            "Arabic Mask Dance",
            "Fire Jugglers & Fire Stunts",
            "Midnight Countdown Celebration"
          ].map((item) => (
            <div
              key={item}
              className="border border-gold/30 p-6 rounded-xl text-center bg-black/40"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PASSES */}
      <Passes />

      {/* VVIP */}
      <VVIP />

      {/* EVENT LAYOUT */}
      <LayoutMap />

      {/* FOOTER */}
      <footer className="py-12 text-center text-gray-300 bg-black/40">
        <p>📍 Amber by Sayaji, Bhopal</p>
        <p>📞 +91 7000443100</p>
        <p className="mt-4 text-sm">
          © 2025 THE RED CARPET. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
