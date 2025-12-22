"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid admin credentials");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#0f172a] p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl text-gold font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          className="w-full p-3 mb-4 bg-black border text-white"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-black border text-white"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-gold text-black py-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
