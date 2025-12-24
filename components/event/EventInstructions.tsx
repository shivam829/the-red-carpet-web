export default function EventInstructions() {
  return (
    <section className="bg-black/40 p-6 rounded-xl border border-gold/30">
      <h2 className="text-2xl font-bold text-gold mb-4">Instructions</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
        <li>Please carry a valid ID proof.</li>
        <li>Security checks are mandatory.</li>
        <li>No re-entry allowed.</li>
        <li>No weapons, fireworks, bottles, or sharp objects.</li>
        <li>Drunk or misbehaving guests may be denied entry.</li>
        <li>Organisers reserve right of admission.</li>
      </ul>
    </section>
  );
}