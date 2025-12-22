"use client";

import { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({
  onClose,
  onSuccess,
  onSwitchToSignup,
}: LoginModalProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(data.user);
        onClose();
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="bg-gradient-to-br from-red-900 to-black border-2 border-gold p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white"
          />

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-gold font-semibold underline"
            >
              Sign up
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gold text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
