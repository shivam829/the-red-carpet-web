"use client";

import { useEffect, useState } from "react";

export default function LiveEditorPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/site")
      .then(res => res.json())
      .then(setData);
  }, []);

  function updateField(key: string, value: string | boolean) {
    setData({ ...data, [key]: value });
  }

  async function save() {
    await fetch("/api/admin/site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Live site updated");
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl text-gold">Live Page Editor</h2>

      <input
        className="w-full p-3 bg-black border"
        value={data.heroTitle}
        onChange={e => updateField("heroTitle", e.target.value)}
      />

      <input
        className="w-full p-3 bg-black border"
        value={data.heroSubtitle}
        onChange={e => updateField("heroSubtitle", e.target.value)}
      />

      <textarea
        className="w-full p-3 bg-black border"
        value={data.eventDescription}
        onChange={e => updateField("eventDescription", e.target.value)}
      />

      <label className="flex gap-3 items-center">
        <input
          type="checkbox"
          checked={data.animationsEnabled}
          onChange={e =>
            updateField("animationsEnabled", e.target.checked)
          }
        />
        Enable animations
      </label>

      <button
        onClick={save}
        className="px-6 py-3 bg-gold text-black rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
