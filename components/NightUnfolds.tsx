"use client";

export default function NightUnfolds() {
  return (
    <section className="py-24 px-6 bg-black">
      <h2 className="text-4xl font-bold text-gold text-center mb-14">
        The Night Unfolds
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            title: "Live DJs & EDM",
            video: "/Techno Mix 2025   Nonstop  Only Techno Bangers.mp4",
          },
          {
            title: "Fire Performers",
            video: "/Giant fire poi.mp4",
          },
          {
            title: "Midnight Fireworks",
            video: "/_✨ Spectacular New Year Fireworks 2025 🎆 HappyNewYear Fireworks2025_.mp4",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl overflow-hidden border border-gold/20"
          >
            <video
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-56 w-full object-cover brightness-75"
            />
            <div className="p-6 text-center text-lg bg-black/70">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
