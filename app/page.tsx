"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import VideoReelBar from "@/components/VideoReelBar";
import PassesDisplay from "@/components/PassesDisplay";

const DISTRICT_URL =
  "https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets";

const targetDate = new Date("2025-12-31T23:59:59+05:30");

/* ===================== COUNTDOWN ===================== */
function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return clearInterval(timer);

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4 mt-4 flex-wrap justify-center text-center">
      {Object.entries(time).map(([key, value]) => (
        <div
          key={key}
          className="px-4 py-3 bg-black/60 rounded-xl backdrop-blur"
        >
          <div className="text-2xl md:text-3xl font-bold text-gold">
            {value}
          </div>
          <div className="text-[10px] md:text-xs uppercase text-gray-400">
            {key === "d"
              ? "Days"
              : key === "h"
              ? "Hours"
              : key === "m"
              ? "Minutes"
              : "Seconds"}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===================== PAGE ===================== */
export default function Page() {
  return (
    <>
      <Header />

      {/* MAIN CONTENT */}
      <main className="pt-20 md:pt-8 bg-black text-white">

        {/* ================= HERO ================= */}
        <section className="pt-2 pb-20 flex flex-col items-center text-center px-4 md:px-6">
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-gray-400 animate-pulse">
            SUNDOWN PRESENTS
          </p>

          <img
            src="/logo.png"
            alt="The Red Carpet"
            className="w-64 md:w-[380px] mt-1 md:mt-2"
          />

          <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-300">
            Central India’s Biggest Open-Air New Year Celebration
          </p>

          <p className="mt-1 text-sm md:text-base text-gray-400">
            Wed, 31 Dec · 7:30 PM – Thu, 1 Jan · 2:00 AM
          </p>

          <p className="mt-0.5 text-sm md:text-base text-gray-400">
            AMBER – A Unit of Sayaji, Bhopal
          </p>

          <Countdown />

          {/* DISTRICT CTA */}
          <div
            onClick={() => window.open(DISTRICT_URL, "_blank")}
            className="mt-6 flex flex-col items-center gap-2 cursor-pointer hover:opacity-90 transition"
          >
            <span className="text-sm md:text-lg text-gray-200">
              🎟 Book passes now on
            </span>

            <img
              src="/download.jpg"
              alt="District App"
              className="h-20 md:h-28 w-auto"
            />
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="section relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          <div className="relative z-10">
            <h2 className="section-title">What Awaits You</h2>
            <VideoReelBar />
          </div>
        </section>

        {/* ================= PASSES ================= */}
        <PassesDisplay />

        {/* ================= EVENT GUIDE ================= */}
        <section className="section bg-black/80">
          <h2 className="section-title">Event Guide</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto text-gray-300 text-sm md:text-base">
            <div>🌐 Language: Hindi, English</div>
            <div>⏱ Duration: 6 Hours 30 Minutes</div>
            <div>🎟 Tickets Needed For: 5 yrs & above</div>
            <div>👨‍👩‍👧 Entry Allowed For: All ages</div>
            <div>🌿 Layout: Outdoor</div>
            <div>🪑 Seating: Seated & Standing</div>
            <div>👶 Kid Friendly: Yes</div>
            <div>🐾 Pet Friendly: No</div>
          </div>
        </section>

        {/* ================= VENUE ================= */}
        <section id="venue" className="section bg-black/70">
          <h2 className="section-title">📍 Venue</h2>

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg md:text-xl text-gold font-semibold">
                AMBER – A Unit of Sayaji
              </h3>
              <p className="mt-2 text-gray-300 text-sm md:text-base">
                Hoshangabad Road, Bhopal, Madhya Pradesh
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-gold/30">
              <iframe
                src="https://maps.google.com/maps?q=23.1772918,77.45960269999999&z=15&output=embed"
                className="w-full h-64 md:h-72"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ================= TERMS ================= */}
        <section id="terms" className="section bg-black/80">
          <h2 className="section-title">Terms & Conditions</h2>
          <ul className="mt-6 max-w-4xl mx-auto text-left text-gray-300 list-disc list-inside space-y-3 text-sm md:text-base">
            <li>Please carry a valid ID proof.</li>
            <li>No refunds on purchased tickets.</li>
            <li>Security procedures including frisking apply.</li>
            <li>No hazardous or prohibited items allowed.</li>
            <li>Organisers not responsible for injury or loss.</li>
            <li>People in an inebriated state may be denied entry.</li>
            <li>Late entry may be denied.</li>
            <li>Venue rules apply.</li>
          </ul>
        </section>


        {/* ================= CONTACT ================= */}
<section
  id="contact"
  className="section bg-black/90 text-center"
>
  <h2 className="section-title">Contact Us</h2>

  <p className="mt-4 text-gray-400 text-sm md:text-base">
    Have questions or need assistance? Reach out to us directly.
  </p>

  <div className="mt-8 flex justify-center gap-10">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/theredcarpet2026"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition"
    >
      <img
        src="/instalogo.jpg"
        alt="Instagram"
        className="w-10 h-10 md:w-12 md:h-12"
      />
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/917000443100"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition"
    >
      <img
        src="/whatsapp.png"
        alt="WhatsApp"
        className="w-10 h-10 md:w-12 md:h-12"
      />
    </a>
  </div>
</section>


        <footer className="py-10 text-center text-gray-400 bg-black">
  <p className="text-xs md:text-sm">
    © 2025 Sundown Events · The Red Carpet
  </p>
</footer>


        {/* ================= FLOATING CTA ================= */}
        <button
          onClick={() => window.open(DISTRICT_URL, "_blank")}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
                     bg-gold text-black px-5 py-3 rounded-full
                     text-sm md:text-base font-semibold shadow-xl
                     animate-pulse hover:scale-110 transition"
        >
          🚨 Hurry! Book Now
        </button>
      </main>
    </>
  );
}
