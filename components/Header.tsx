"use client";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      {/* HEADER ACTIONS (RIGHT SIDE ONLY) */}
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-3">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition shadow-lg"
            >
              👤 {user.name}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-black border border-gold/30 rounded-lg shadow-xl">
                <Link
                  href="/my-tickets"
                  className="block px-4 py-3 text-white hover:bg-gold/20 transition"
                >
                  🎟️ My Tickets
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gold/90 text-black px-6 py-3 rounded-full font-semibold hover:bg-gold transition shadow-lg"
            >
              Login
            </button>

            <button
              onClick={() => setShowSignup(true)}
              className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold border-2 border-gold/50 hover:bg-gold/20 hover:border-gold transition shadow-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(u) => {
            setUser(u);
            setShowLogin(false);
            window.dispatchEvent(new Event("userLoggedIn"));
          }}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={() => {
            setShowSignup(false);
            window.dispatchEvent(new Event("userLoggedIn"));
          }}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
