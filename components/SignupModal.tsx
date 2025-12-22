"use client";

import { useState } from "react";

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);

        // Auto switch to login after short delay
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-900 to-black border-2 border-gold p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-gold text-center mb-6">
          Sign Up
        </h2>

        {success ? (
          <div className="text-center text-green-400 text-lg font-semibold animate-pulse">
            ✅ Account created successfully<br />
            Redirecting to login…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white"
            />

            <input
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white"
            />

            {error && (
              <p className="text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gold text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
