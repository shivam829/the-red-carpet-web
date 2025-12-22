"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import FloatingLanterns from "@/components/FloatingLanterns";
import Passes from "@/components/Passes";
import VVIP from "@/components/VVIP";
import LayoutMap from "@/components/LayoutMap";
import Header from "@/components/Header";
import InstagramReelsWidget from "@/components/InstagramReelsWidget";

export default function App() {
  return (
    <div>
      {/* Header with Login/Sign Up Buttons */}
      <Header />

      {/* 🔥 ISSUE 6: Instagram Reels Widget on Right Side */}
      <InstagramReelsWidget />

      {/* Main content - adds right padding on large screens to avoid Instagram widget overlap */}
      <main className="relative text-white lg:pr-80">

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

          {/* ✅ ISSUE 5 FIXED: Removed all bottom margin */}
          <motion.img
            src="/logo.png"
            alt="The Red Carpet Logo"
            className="w-120 mb-0 z-20 animate-fadeInScale"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* ✅ ISSUE 5 FIXED: Negative margin to pull text UP closer to logo */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gold z-10 -mt-96"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            THE RED CARPET
          </motion.h1>

          <motion.p
            className="mt-2 text-lg md:text-xl text-gray-200 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Central India's Biggest Open-Air New Year Celebration
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
        

        {/* ✅ ISSUE 4 FIXED: Replaced images with videos */}
        <section className="py-24 px-6 bg-black">
          <h2 className="text-4xl font-bold text-gold text-center mb-14">
            The Night Unfolds
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "Live DJs & EDM",
                video: "/techno-dj.mp4",
              },
              {
                title: "Fire Performers",
                video: "/fire-performers.mp4",
              },
              {
                title: "Midnight Fireworks",
                video: "/fireworks.mp4",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="rounded-xl overflow-hidden bg-black/60 border border-gold/20"
                whileHover={{ scale: 1.03 }}
              >
                {/* Videos auto-play, loop, and are muted */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-56 w-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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

        {/* FOOTER WITH INSTAGRAM */}
        <footer className="py-12 px-6 text-center text-gray-300 bg-black/90 border-t border-gold/20">
          <div className="max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="mb-6">
              <p className="mb-2">📍 Amber by Sayaji, Bhopal</p>
              <p className="mb-2">📞 +91 7000443100</p>
            </div>

            {/* Instagram Button */}
            <div className="mb-6">
              <a
                href="https://www.instagram.com/theredcarpet2026?igsh=MWdsNXQ4ZWVIcDU1Yg=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {/* Instagram Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@theredcarpet2026</span>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2025 THE RED CARPET. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}