"use client";

import Passes from "@/components/Passes";
import EventHero from "@/components/event/EventFooter";
import EventAbout from "@/components/event/EventAbout";
import EventWhyAttend from "@/components/event/EventWhyAttend";
import EventOffers from "@/components/event/EventOffers";
import EventGuide from "@/components/event/EventGuide";
import EventPassDetails from "@/components/event/EventPassDetails";

import EventVenue from "@/components/event/EventVenue";
import EventTerms from "@/components/event/EventTerms";
import EventFooter from "@/components/event/EventFooter";
import EventVideoBackground from "@/components/event/EventVideoBackground";
import EventInstructions from "@/components/event/EventInstructions"

export default function RedCarpetEventPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <EventHero />

      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[420px_1fr] gap-8">
        {/* LEFT — TICKETS */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-black/70 border border-gold/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gold mb-4">
              Choose Tickets
            </h2>
            <Passes />
          </div>
        </aside>

        {/* RIGHT — CONTENT */}
        <div className="space-y-10">
          <EventAbout />
          <EventWhyAttend />
          <EventOffers />
          <EventGuide />
          <EventPassDetails />
           <EventInstructions/>
          <EventVenue />
          <EventTerms />
          <EventVideoBackground />

        </div>
      </section>

      <EventFooter />
    </main>
  );
}
