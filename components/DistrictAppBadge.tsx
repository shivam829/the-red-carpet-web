"use client";

export default function DistrictAppBadge() {
  return (
    <a
      href="https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
    >
      <span className="text-xs text-gray-200 font-medium">
        Book tickets on
      </span>

      <img
        src="/download.jpg"
        alt="District App"
        className="w-32 rounded-lg shadow-lg hover:scale-105 transition"
      />
    </a>
  );
}
