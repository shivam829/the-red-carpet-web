"use client";

import { useEffect, useRef, useState } from "react";

const reels = [
  "/reel1.mp4",
  "/reel2.mp4",
  "/reel3.mp4",
];

const updates = [
  { emoji: "🎉", text: "Book your passes now!" },
  { emoji: "🔥", text: "Limited VIP seats available" },
  { emoji: "🎵", text: "Live DJ performances" },
  { emoji: "✨", text: "Spectacular fireworks at midnight" },
  { emoji: "🍾", text: "Premium open bar" },
  { emoji: "🎊", text: "Central India's biggest celebration" },
];

export default function InstagramReelsWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentReel, setCurrentReel] = useState(0);

  // When a reel ends → play next
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnd = () => {
      setCurrentReel((prev) => (prev + 1) % reels.length);
    };

    video.addEventListener("ended", onEnd);
    return () => video.removeEventListener("ended", onEnd);
  }, []);

  // Reload video on change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentReel]);

  return (
    <div className="fixed right-0 top-24 w-80 h-[calc(100vh-120px)] bg-black/90 backdrop-blur-md border-l border-gold/30 shadow-2xl z-40 hidden lg:flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 border-b border-gold/30">
        <h3 className="text-white font-bold text-lg text-center">
          Latest Updates
        </h3>
      </div>

      {/* Reels Player */}
      <div className="p-4">
        <video
          ref={videoRef}
          className="w-full h-56 rounded-xl object-cover shadow-xl"
          muted
          autoPlay
          playsInline
        >
          <source src={reels[currentReel]} type="video/mp4" />
        </video>

        {/* Reel Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {reels.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentReel ? "bg-pink-500" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scrolling Updates */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {updates.map((item, index) => (
          <div
            key={index}
            className="bg-black/60 border border-gold/20 rounded-lg p-4 hover:border-gold/50 transition"
          >
            <p className="text-white text-center">
              <span className="text-3xl mr-2">{item.emoji}</span>
              <span className="text-sm">{item.text}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-4 bg-gradient-to-t from-black to-transparent">
        <a
          href="#passes"
          className="block w-full bg-gold text-black text-center py-3 rounded-full font-bold hover:bg-yellow-600 transition"
        >
          Book Now
        </a>

        <a
          href="https://www.instagram.com/theredcarpet2026"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-3 bg-pink-600 text-white text-center py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          View on Instagram →
        </a>
      </div>
    </div>
  );
}
