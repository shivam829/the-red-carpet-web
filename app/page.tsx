"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import VideoReelBar from "@/components/VideoReelBar";
import PassesDisplay from "@/components/PassesDisplay";
import FirecrackerIntro from "@/components/FirecrackerIntro";

const DISTRICT_URL =
  "https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets";

const targetDate = new Date("2025-12-31T23:59:59+05:30");

/* ===================== COUNTDOWN ===================== */
function Countdown({ visible }: { visible: boolean }) {
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

  if (!mounted || !visible) return null;

  return (
    <div className="flex gap-4 mt-6 flex-wrap justify-center text-center animate-fade-in-up">
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
  const [showIntro, setShowIntro] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);

  return (
    <>
      {/* 🔥 INTRO SCREEN */}
      {showIntro && (
        <FirecrackerIntro
          onFinish={() => {
            setShowIntro(false);
            setTimeout(() => setShowCountdown(true), 600);
          }}
        />
      )}

      {!showIntro && (
        <>
          <Header />

          <main className="pt-20 bg-black text-white overflow-x-hidden">

            {/* ================= HERO ================= */}
            <section className="pt-6 pb-24 flex flex-col items-center text-center px-4">
              <p className="text-[10px] tracking-[0.35em] text-gray-400 animate-pulse">
                SUNDOWN PRESENTS
              </p>

              <img
                src="/logo.png"
                alt="The Red Carpet Logo"
                className="w-64 md:w-[380px] mt-3 animate-logo-reveal"
              />

              <p className="mt-4 text-gray-300">
                Central India’s Biggest Open-Air New Year Celebration
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Wed, 31 Dec · 7:30 PM – Thu, 1 Jan · 2:00 AM
              </p>

              <p className="text-gray-400 text-sm">
                AMBER – A Unit of Sayaji, Bhopal
              </p>

              <Countdown visible={showCountdown} />

              <div
                onClick={() => window.open(DISTRICT_URL, "_blank")}
                className="mt-8 cursor-pointer flex flex-col items-center hover:scale-105 transition"
              >
                <span className="text-gray-200 text-sm">
                  🎟 Book passes now on
                </span>
                <img
                  src="/download.jpg"
                  alt="District App"
                  className="h-24 mt-2"
                />
              </div>
            </section>

            {/* ================= EXPERIENCE ================= */}
            <section className="section relative overflow-hidden">
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
              <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto text-gray-300 text-sm">
                <div>🌐 Language: Hindi, English</div>
                <div>⏱ Duration: 6 Hours 30 Minutes</div>
                <div>🎟 Tickets Needed: 5 yrs & above</div>
                <div>👨‍👩‍👧 Entry: All ages</div>
                <div>🌿 Layout: Outdoor</div>
                <div>🪑 Seating: Seated & Standing</div>
                <div>👶 Kid Friendly: Yes</div>
                <div>🐾 Pet Friendly: No</div>
              </div>
            </section>

            {/* ================= VENUE ================= */}
            <section id="venue" className="section bg-black/70">
              <h2 className="section-title">📍 Venue</h2>

              <div className="rounded-xl overflow-hidden border border-gold/30 relative group">
  <a
    href="https://www.google.com/maps?q=23.179256383673852,77.45350135484892"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute inset-0 z-10"
    aria-label="Open location in Google Maps"
  />

  <iframe
    src="https://www.google.com/maps?q=23.179256383673852,77.45350135484892&z=16&output=embed"
    className="w-full h-64 md:h-72 pointer-events-none"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />

  {/* Optional hover hint */}
  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition z-20">
    Open in Google Maps
  </div>
</div>

            </section>

            {/* ================= TERMS ================= */}
            <section id="terms" className="section bg-black/80">
              <h2 className="section-title">Terms & Conditions</h2>
              <ul className="mt-6 max-w-4xl mx-auto text-gray-300 list-disc list-inside space-y-3 text-sm">
                <li>Please carry a valid ID proof.</li>
                <li>No refunds on purchased tickets.</li>
                <li>Security checks apply.</li>
                <li>No hazardous items allowed.</li>
                <li>Organisers not responsible for injury or loss.</li>
                <li>Entry may be denied if intoxicated.</li>
                <li>Late entry may be denied.</li>
                <li>Venue rules apply.</li>
              </ul>
            </section>

            {/* ================= CONTACT ================= */}
            <section id="contact" className="section bg-black/90 text-center">
              <h2 className="section-title">Contact Us</h2>
              <p className="mt-4 text-gray-400 text-sm">
                Reach out to us on WhatsApp or Instagram
              </p>

              <div className="mt-8 flex justify-center gap-10">
                <a
                  href="https://www.instagram.com/theredcarpet2026"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/instalogo.jpg" alt="Instagram" className="w-12 h-12" />
                </a>

                <a
                  href="https://wa.me/917000443100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-12 h-12" />
                </a>
              </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="py-10 text-center text-gray-400 bg-black">
              <p className="text-xs">
                © 2025 Sundown Events · The Red Carpet
              </p>
            </footer>

            {/* ================= FLOATING CTA ================= */}
            <button
              onClick={() => window.open(DISTRICT_URL, "_blank")}
              className="fixed bottom-4 right-4 z-50
                         bg-gold text-black px-5 py-3 rounded-full
                         text-sm font-semibold shadow-xl
                         animate-pulse hover:scale-110 transition"
            >
              🚨 Hurry! Book Now
            </button>

          </main>
        </>
      )}
    </>
  );
}
