export default function LayoutMap() {
  return (
    <section className="py-24 px-6 bg-transparent">
      <h2 className="text-4xl font-bold text-gold text-center mb-8">
        Event Layout
      </h2>

      <p className="text-center text-gray-400 mb-12">
        View the complete venue layout including VVIP, VIP, stage, buffet and bar areas.
      </p>

      <div className="max-w-5xl mx-auto">
        <img
          src="/layout.jpg"
          alt="Event Layout"
          className="rounded-2xl border border-gold/30"
        />
      </div>
    </section>
  );
}
