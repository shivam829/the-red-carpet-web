"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-gold font-bold text-xl">
            THE RED CARPET
          </Link>

          <div className="flex gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-gold text-black rounded-lg font-semibold"
            >
              Login
            </button>

            <button
              onClick={() => alert("Signup coming next")}
              className="px-4 py-2 border border-gold text-gold rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
          onSwitchToSignup={() => alert("Signup flow next")}
        />
      )}
    </>
  );
}
