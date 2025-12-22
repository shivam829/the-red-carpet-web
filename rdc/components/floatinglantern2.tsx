"use client";

export default function FloatingLanterns() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-[-20%] animate-lantern"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
          }}
        >
          <img src="/lantern.png" className="w-24 opacity-60" />
          <p className="text-gold text-sm text-center">
            Book Now · Limited Passes
          </p>
        </div>
      ))}
    </div>
  );
}
