"use client";

import { motion } from "framer-motion";
import FloatingLanterns from "@/components/FloatingLanterns";
import Passes from "@/components/Passes";
import VVIP from "@/components/VVIP";
import LayoutMap from "@/components/LayoutMap";

export default function HomePage() {
  return (
    <main className="relative text-white">

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541532713592-79a0317b6b77)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <FloatingLanterns />

        <motion.img
          src="/logo.png"
          alt="The Red Carpet Logo"
          className="w-60 mb-6 z-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gold z-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          THE RED CARPET
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Central India’s Biggest Open-Air New Year Celebration
        </motion.p>

        <motion.p
          className="mt-2 text-gray-300 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          31st December 2025 · Amber by Sayaji, Bhopal
        </motion.p>

        <motion.a
          href="#passes"
          className="mt-10 px-10 py-4 bg-redcarpet rounded-xl text-lg hover:bg-gold hover:text-black transition z-10"
          whileHover={{ scale: 1.05 }}
        >
          Reserve Your Entry
        </motion.a>
      </section>

      {/* EVENT LINEUP */}
      <section className="py-24 px-6 bg-black">
        <h2 className="text-4xl font-bold text-gold text-center mb-14">
          The Night Unfolds
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Live DJs & EDM",
              img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
            },
            {
              title: "Fire Performers",
              img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
            },
            {
              title: "Midnight Fireworks",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RichB_N8T-Fnhz6j3B6rqqx7LH_WUGNbYWOnTn-7ssQXAI4kaK8UzyFnWwQBBusvtwtduw&s",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="rounded-xl overflow-hidden bg-black/60 border border-gold/20"
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.img} className="h-56 w-full object-cover" />
              <div className="p-6 text-center text-lg">{item.title}</div>
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
      <footer className="py-12 text-center text-gray-300 bg-black/90">
        <p>📍 Amber by Sayaji, Bhopal</p>
        <p>📞 +91 7000443100</p>
        <p className="mt-4 text-sm">
          © 2025 THE RED CARPET. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
