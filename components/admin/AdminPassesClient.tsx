"use client";

import { useEffect, useState } from "react";

type PassType = {
  name: string;
  price: number;
  phase: number;
  visible: boolean;
};

export default function AdminPassesClient() {
  const [passes, setPasses] = useState<PassType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/passes")
      .then(res => res.json())
      .then(data => {
        setPasses(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-white">Loading passes…</p>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-gold mb-8">
        Pass & Phase Management
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {passes.map(pass => (
          <div
            key={pass.name}
            className="p-6 bg-black/60 border border-gold/30 rounded-xl rounded-xl"
          >
            <h2 className="text-xl font-semibold text-gold mb-4">
              {pass.name}
            </h2>

            <p>Price: ₹{pass.price}</p>
            <p>Phase: {pass.phase}</p>
            <p>Status: {pass.visible ? "Visible" : "Hidden"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
