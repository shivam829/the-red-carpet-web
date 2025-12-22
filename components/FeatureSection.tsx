"use client";

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-black/60">
      <h2 className="text-4xl font-bold text-gold text-center mb-12">
        What to Expect
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Live DJs & EDM */}
        <div className="bg-black/50 border border-gold/30 rounded-xl overflow-hidden hover:scale-105 transition">
          <div className="relative h-64">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/techno-mix.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gold mb-2">
              🎧 Live DJs & EDM
            </h3>
            <p className="text-gray-300">
              Dance to electrifying beats from top DJs spinning all night
            </p>
          </div>
        </div>

        {/* Fire Performers */}
        <div className="bg-black/50 border border-gold/30 rounded-xl overflow-hidden hover:scale-105 transition">
          <div className="relative h-64">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/fire-poi.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gold mb-2">
              🔥 Fire Performers
            </h3>
            <p className="text-gray-300">
              Mesmerizing fire shows that light up the night sky
            </p>
          </div>
        </div>

        {/* Midnight Fireworks */}
        <div className="bg-black/50 border border-gold/30 rounded-xl overflow-hidden hover:scale-105 transition">
          <div className="relative h-64">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/fireworks.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gold mb-2">
              🎆 Midnight Fireworks
            </h3>
            <p className="text-gray-300">
              Spectacular countdown with breathtaking fireworks display
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}