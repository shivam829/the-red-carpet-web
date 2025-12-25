const passes = [
  { name: "Classic Carpet - Stag", price: "₹1,999" },
  { name: "Classic Carpet - Couple", price: "₹2,999" },
  { name: "VIP Grand Gala - Stag", price: "₹5,999" },
  { name: "VIP Grand Gala - Couple", price: "₹10,999" },
  { name: "VIP + Drinks - Stag", price: "₹6,999" },
  { name: "VIP + Drinks - Couple", price: "₹12,999" },
  { name: "VIP Group - 5 Pax", price: "₹29,499" },
  { name: "VIP Group - 10 Pax", price: "₹54,999" },
  { name: "Limited VVIP - 5 Pax", price: "₹42,499" },
  { name: "Limited VVIP - 7 Pax", price: "₹58,499" },
  { name: "Limited VVIP - 9 Pax", price: "₹74,499" },
  { name: "Limited VVIP - 12 Pax", price: "₹97,999" },
];

const DISTRICT_URL =
  "https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets";

export default function PassesDisplay() {
  return (
    <section id="passes" className="section bg-black/80 animate-fade-up">
      <h2 className="section-title">Choose Tickets</h2>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {passes.map((p) => (
          <div
            key={p.name}
            onClick={() => window.open(DISTRICT_URL, "_blank")}
            className="
              cursor-pointer
              border border-gold/30
              rounded-xl
              p-6
              bg-black/60
              transition
              hover:scale-[1.06]
              hover:shadow-[0_0_30px_rgba(255,215,0,0.25)]
            "
          >
            <h3 className="text-lg font-semibold text-gold">{p.name}</h3>
            <p className="text-2xl mt-2">{p.price}</p>
            <p className="text-xs text-gray-500 mt-4">
              Click to book via District
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
