"use client";

import { useEffect } from "react";

export default function InstagramReels() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed right-4 top-24 w-80 h-[600px] bg-black/80 border border-gold/30 rounded-xl p-4 overflow-y-auto z-40 hidden lg:block">
      <h3 className="text-gold font-bold text-lg mb-4 text-center">
        📸 Latest Updates
      </h3>

      <div className="space-y-4">
        {/* Instagram embed - Replace POST_ID with actual Instagram post IDs */}
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/reel/YOUR_REEL_ID/"
          data-instgrm-version="14"
        ></blockquote>

        {/* Add more reels as needed */}
        {/* 
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/reel/ANOTHER_REEL_ID/"
          data-instgrm-version="14"
        ></blockquote>
        */}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Follow us for more updates!
      </p>
    </div>
  );
}

// Alternative: Custom Reels Component (if Instagram embed doesn't work)
export function CustomReelsSection() {
  return (
    <div className="fixed right-4 top-24 w-80 max-h-[600px] bg-black/80 border border-gold/30 rounded-xl p-4 overflow-y-auto z-40 hidden lg:block">
      <h3 className="text-gold font-bold text-lg mb-4 text-center">
        📸 Latest Updates
      </h3>

      <a
        href="https://www.instagram.com/theredcarpet2026"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-4"
      >
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg text-center hover:scale-105 transition">
          <svg
            className="w-12 h-12 mx-auto mb-2 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
          </svg>
          <p className="text-white font-semibold">@theredcarpet2026</p>
          <p className="text-white/80 text-sm">View Our Reels →</p>
        </div>
      </a>

      <div className="text-xs text-gray-500 text-center">
        Click to view our latest Instagram reels and stories
      </div>
    </div>
  );
}