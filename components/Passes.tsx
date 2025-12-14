export default function Passes() {
  const passes = [
    {
      title: "VIP COUPLE",
      price: "₹10,999",
      note: "Early Bird",
      features: [
        "Entry for 2",
        "VIP Zone Access",
        "Unlimited Buffet",
        "Unlimited Premium Drinks",
        "Dedicated Seating"
      ],
      highlight: true
    },
    {
      title: "VIP STAG",
      price: "₹5,999",
      note: "Early Bird",
      features: [
        "Entry for 1",
        "VIP Zone Access",
        "Unlimited Buffet",
        "Unlimited Drinks"
      ]
    },
    {
      title: "CLASSIC COUPLE",
      price: "₹2,999",
      note: "Early Bird",
      features: [
        "Entry for 2",
        "Open Floor Access",
        "Live Performances"
      ]
    },
    {
      title: "CLASSIC STAG",
      price: "₹1,699",
      note: "Early Bird",
      features: [
        "Entry for 1",
        "Open Floor Access",
        "Live DJs"
      ]
    }
  ];

  return (
    <section className="py-24 px-6 bg-transparent">
      <h2 className="text-4xl font-bold text-gold text-center mb-12">
        Passes & Pricing
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {passes.map((pass) => (
          <div
            key={pass.title}
            className={`rounded-2xl p-6 text-center border ${
              pass.highlight
                ? "border-gold bg-gold/10 scale-105"
                : "border-gold/30 bg-black/40"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-2">{pass.title}</h3>
            <p className="text-gold text-3xl font-bold">{pass.price}</p>
            <p className="text-sm text-gray-400 mb-4">{pass.note}</p>

            <ul className="text-sm text-gray-300 mb-6 space-y-2">
              {pass.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-xl bg-redcarpet hover:bg-gold hover:text-black transition">
              Booking Opens Soon
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
