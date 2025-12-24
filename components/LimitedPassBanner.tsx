"use client";

export default function LimitedPassBanner() {
  return (
    <div className="fixed top-52 left-10 z-40">
      <div className="w-28 h-28 rounded-full bg-redcarpet text-white flex items-center justify-center text-center text-xs font-bold shadow-xl animate-urgent">
        <div>
          Hurry Up<br />
          <span className="text-gold">Limited Passes</span>
        </div>
      </div>
    </div>
  );
}
