"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import VideoReelBar from "@/components/VideoReelBar";
import PassesDisplay from "@/components/PassesDisplay";

const DISTRICT_URL =
  "https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets";

const targetDate = new Date("2025-12-31T23:59:59+05:30");

function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      const diff = targetDate.getTime() - new Date().getTime();
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
    <div className="flex gap-6 mt-8 flex-wrap justify-center text-center">
      {Object.entries(time).map(([key, value]) => (
        <div
          key={key}
          className="px-5 py-4 bg-black/60 rounded-xl backdrop-blur"
        >
          <div className="text-3xl font-bold text-gold">{value}</div>
          <div className="text-xs uppercase text-gray-400">
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

export default function Page() {
  return (
    <>
      <Header />

      {/* HERO – STARTS AFTER HEADER */}
      <section className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-6 bg-black">
        <p className="text-xs tracking-[0.35em] text-gray-400 animate-pulse">
          SUNDOWN PRESENTS
        </p>

        <img
          src="/logo.png"
          alt="The Red Carpet"
          className="w-72 md:w-[380px] mt-6"
        />

        <p className="mt-6 text-lg text-gray-300">
          Central India’s Biggest Open-Air New Year Celebration
        </p>

        <p className="mt-2 text-gray-400">
          Wed, 31 Dec · 7:30 PM – Thu, 1 Jan · 2:00 AM
        </p>

        <p className="mt-1 text-gray-400">
          AMBER – A Unit of Sayaji, Bhopal
        </p>

        <Countdown />

        <button
          onClick={() => window.open(DISTRICT_URL, "_blank")}
          className="mt-10 bg-gold text-black px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition"
        >
          🎟 Book Passes Now
        </button>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section bg-black/70">
        <h2 className="section-title">What Awaits You</h2>
        <VideoReelBar />
      </section>

      {/* PASSES */}
      <PassesDisplay />

      {/* EVENT GUIDE */}
      <section className="section bg-black/80">
        <h2 className="section-title">Event Guide</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto text-gray-300">
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

      {/* VENUE */}
      <section id="venue" className="section bg-black/70">
        <h2 className="section-title">📍 Venue</h2>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-xl text-gold font-semibold">
              AMBER – A Unit of Sayaji
            </h3>
            <p className="mt-2 text-gray-300">
              Hoshangabad Road, Bhopal, Madhya Pradesh
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-gold/30">
            <iframe
              src="https://maps.google.com/maps?q=23.1772918,77.45960269999999&z=15&output=embed"
              className="w-full h-72"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" className="section bg-black/80">
        <h2 className="section-title">Terms & Conditions</h2>
        <ul className="mt-10 max-w-4xl mx-auto text-left text-gray-300 list-disc list-inside space-y-3">
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

      {/* FLOATING CTA */}
      <button
        onClick={() => window.open(DISTRICT_URL, "_blank")}
        className="fixed bottom-6 right-6 z-50 bg-gold text-black px-6 py-4 rounded-full font-semibold shadow-xl animate-pulse hover:scale-110 transition"
      >
        🎟 Book Now – Limited Passes
      </button>

      {/* FOOTER */}
<footer className="py-12 text-center text-gray-400 bg-black">
  <div className="flex justify-center items-center gap-8 mb-6">
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
        className="w-8 h-8"
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
        className="w-8 h-8"
      />
    </a>
  </div>

  <p className="text-sm">
    © 2025 Sundown Events · The Red Carpet
  </p>
</footer>

    </>
  );
}
