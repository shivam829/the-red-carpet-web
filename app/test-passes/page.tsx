"use client";

import { useEffect, useState } from "react";

export default function TestPasses() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    console.log("🔥 TEST FETCH RUNNING");

    fetch("/api/admin/passes")
      .then(res => res.json())
      .then(d => {
        console.log("🔥 TEST DATA", d);
        setData(d);
      });
  }, []);

  return (
    <div style={{ color: "white", padding: 40 }}>
      <h1>TEST PASSES</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
