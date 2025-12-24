"use client";

import { useState, useEffect } from "react";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
  onSwitchToSignup: () => void;
}

type Mode = "login" | "forgot";

export default function LoginModal({
  onClose,
  onSuccess,
  onSwitchToSignup,
}: LoginModalProps) {
  const [mode, setMode] = useState<Mode>("login");

  // LOGIN STATE
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // FORGOT PASSWORD STATE
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // OTP TIMER
  const [timer, setTimer] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= OTP TIMER ================= */
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ================= LOGIN ================= */
  const handleLogin = async (e: React.FormEvent) => {
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
        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        onSuccess(data.user);
        onClose();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */

  const sendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setStep(2);
      setTimer(30); // ⏱️ start resend timer
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setStep(3);
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password: newPassword }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      alert("Password reset successful. Please login.");
      setMode("login");
      setStep(1);
      setOtp("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
      <div className="bg-gradient-to-br from-red-900 to-black border-2 border-gold p-6 sm:p-8 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gold text-center mb-6">
          {mode === "login" ? "Login" : "Forgot Password"}
        </h2>

        {/* ================= LOGIN ================= */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full p-4 rounded-lg bg-black/50 border border-gold/30 text-white text-base"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg bg-black/50 border border-gold/30 text-white text-base"
            />

            {error && <p className="text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setStep(1);
                setError("");
              }}
              className="w-full text-gold text-sm underline"
            >
              Forgot Password?
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
          </form>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {mode === "forgot" && (
          <div className="space-y-4">
            {step === 1 && (
              <>
                <input
                  type="tel"
                  placeholder="Registered phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full p-4 rounded-lg bg-black/50 border border-gold/30 text-white"
                />
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-4 rounded-lg bg-black/50 border border-gold/30 text-white"
                />

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
                >
                  Verify OTP
                </button>

                {timer > 0 ? (
                  <p className="text-center text-gray-400 text-sm">
                    Resend OTP in {timer}s
                  </p>
                ) : (
                  <button
                    onClick={sendOtp}
                    className="w-full text-gold underline text-sm"
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 rounded-lg bg-black/50 border border-gold/30 text-white"
                />
                <button
                  onClick={resetPassword}
                  disabled={loading}
                  className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
                >
                  Reset Password
                </button>
              </>
            )}

            {error && <p className="text-red-400 text-center">{error}</p>}

            <button
              type="button"
              onClick={() => setMode("login")}
              className="w-full border border-gold text-white py-2 rounded-lg"
            >
              Back to Login
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full border border-gold text-white py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
