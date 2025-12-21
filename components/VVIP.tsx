"use client";

import { useState } from "react";
import VVIPContactModal from "@/components/VVIPContactModal";

export default function VVIP() {
  const [showVVIPModal, setShowVVIPModal] = useState(false);

  return (
    <>
      <section className="py-28 px-6 bg-transparent">
        <div className="max-w-6xl mx-auto border-2 border-gold rounded-3xl p-12 bg-black/40">

          <h2 className="text-4xl font-bold text-gold text-center mb-6">
            VVIP Experience
          </h2>

          <p className="text-center text-gray-300 mb-10">
            An exclusive luxury experience for elite guests.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              "Personal Butler Service",
              "Premium Seating Near Stage",
              "Unlimited Premium Mixers",
              "Luxury Table Décor",
              "Dedicated Photographer",
              "Private Heater Setup",
              "Personalized Lanterns",
              "Priority Entry",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-white">
                <span className="text-gold">★</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            {/* 🚨 MUST BE A BUTTON, NOT <a> */}
            <button
              onClick={() => setShowVVIPModal(true)}
              className="px-10 py-4 bg-gold text-black rounded-xl font-semibold hover:bg-white transition"
            >
              Contact for VVIP Booking
            </button>
          </div>
        </div>
      </section>

      {showVVIPModal && (
        <VVIPContactModal onClose={() => setShowVVIPModal(false)} />
      )}
    </>
  );
}
