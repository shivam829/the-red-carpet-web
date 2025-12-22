export default function EventWhyAttend() {
  const points = [
    "Central India’s largest open-air NYE celebration",
    "Premium crowd & luxury ambience",
    "Unlimited lavish gala dinner",
    "Unlimited premium drinks",
    "Heater-equipped winter venue",
    "First-of-its-kind lantern ceremony",
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-gold mb-4">
        Why Attend
      </h2>
      <ul className="list-disc pl-6 text-gray-300 space-y-2">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
