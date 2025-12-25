"use client";
import { useEffect, useState } from "react";

const videos = [
  "/fire-Performers.mp4",
  "/fireworks.mp4",
  "/reel1.mp4",
  "/reel2.mp4",
  "/reel3.mp4",
  "/techno-dj.mp4",
];

export default function VideoReelBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % videos.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mt-10 max-w-7xl mx-auto animate-fade-up">
      <video
        key={videos[index]}
        src={videos[index]}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[520px] object-contain rounded-2xl border border-gold/30 video-glow"
      />

      <button
        onClick={() => setIndex((i) => (i - 1 + videos.length) % videos.length)}
        className="absolute left-6 top-1/2 bg-black/60 text-gold px-4 py-2 rounded-full hover:scale-110 transition"
      >
        ‹
      </button>

      <button
        onClick={() => setIndex((i) => (i + 1) % videos.length)}
        className="absolute right-6 top-1/2 bg-black/60 text-gold px-4 py-2 rounded-full hover:scale-110 transition"
      >
        ›
      </button>
    </div>
  );
}
