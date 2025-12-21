"use client";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<null | { id: string; name: string; phone: string }>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setShowMenu(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-3 items-center">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
            >
              <span className="text-lg">👤</span>
              {user.name}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-black/95 border border-gold/30 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-gold/20">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.phone}</p>
                </div>
                
                <Link
                  href="/my-tickets"
                  className="block px-4 py-3 text-white hover:bg-gold/20 transition"
                  onClick={() => setShowMenu(false)}
                >
                  🎟️ My Tickets
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white/10 backdrop-blur-sm border border-gold/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition"
            >
              Login
            </button>
            
            <button
              onClick={() => setShowSignup(true)}
              className="bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={handleSignupSuccess}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
