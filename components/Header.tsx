// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";


export default function Header() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold text-gold">The Red Carpet</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Hello, {user.name}</span>
          <button onClick={handleLogout} className="btn bg-gold p-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLoginClick}
          className="btn bg-gold p-2 rounded"
        >
          Login / Sign Up
        </button>
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setShowLogin(false);
          }}
        />
      )}
    </header>
  );
}