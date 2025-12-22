"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import FloatingLanterns from "@/components/FloatingLanterns";
import Passes from "@/components/Passes";
import VVIP from "@/components/VVIP";
import LayoutMap from "@/components/LayoutMap";
import Header from "@/components/Header";
import InstagramReelsWidget from "@/components/InstagramReelsWidget";
import DistrictAppBadge from "@/components/DistrictAppBadge";

export default function App() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Instagram Reels Widget */}
      <InstagramReelsWidget />

      {/* Main Content */}
      <main className="relative text-white lg:pr-80">

        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

          {/* Background Image (NON-INTERACTIVE) */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1541532713592-79a0317b6b77)",
            }}
          />

          {/* Dark Overlay (NON-INTERACTIVE) */}
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />

          {/* Floating Lanterns (NON-INTERACTIVE) */}
          <div className="pointer-events-none">
            <FloatingLanterns />
          </div>

          {/* ===== INTERACTIVE CONTENT LAYER ===== */}
          <div className="relative z-30 flex flex-col items-center">

            <motion.img
              src="/logo.png"
              alt="The Red Carpet Logo"
              className="w-120 mb-0"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gold -mt-96"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              THE RED CARPET
            </motion.h1>

            <motion.p
              className="mt-2 text-lg md:text-xl text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Central India's Biggest Open-Air New Year Celebration
            </motion.p>

            <motion.p
              className="mt-2 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              31st December 2025 · Amber by Sayaji, Bhopal
            </motion.p>

            {/* CTA ROW (FULLY CLICKABLE) */}
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
              <motion.a
                href="#passes"
                className="px-10 py-4 bg-redcarpet rounded-xl text-lg hover:bg-gold hover:text-black transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Reserve Your Entry
              </motion.a>

              <DistrictAppBadge />
            </div>
          </div>
        </section>
        {/* ================= END HERO ================= */}


        {/* NIGHT UNFOLDS */}
        <section className="py-24 px-6 bg-black">
          <h2 className="text-4xl font-bold text-gold text-center mb-14">
            The Night Unfolds
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { title: "Live DJs & EDM", video: "/techno-dj.mp4" },
              { title: "Fire Performers", video: "/fire-performers.mp4" },
              { title: "Midnight Fireworks", video: "/fireworks.mp4" },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="rounded-xl overflow-hidden bg-black/60 border border-gold/20"
                whileHover={{ scale: 1.03 }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-56 w-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="p-6 text-center text-lg">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PASSES */}
        <Passes />

        {/* VVIP */}
        <VVIP />

        {/* EVENT MAP */}
        <LayoutMap />

        {/* FOOTER */}
        <footer className="py-12 px-6 text-center text-gray-300 bg-black/90 border-t border-gold/20">
          <div className="max-w-4xl mx-auto">
            <p className="mb-2">📍 Amber by Sayaji, Bhopal</p>
            <p className="mb-2">📞 +91 7000443100</p>
            <p className="text-sm text-gray-500 mt-4">
              © 2025 THE RED CARPET. All rights reserved.
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}
