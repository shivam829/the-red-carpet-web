"use client";

import { useState } from "react";

interface SignupModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ onClose, onSuccess, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        alert("Account created successfully! Please login.");
        onSwitchToLogin();
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-900 to-black border-2 border-gold p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2 text-sm">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
              placeholder="Re-enter password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-gold hover:underline font-semibold"
            >
              Login
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 border border-gold/40 text-white py-3 rounded-lg hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}