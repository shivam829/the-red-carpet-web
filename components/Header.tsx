// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";

export default function Header() {
  const [user, setUser] = useState<null | { name: string }>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
      setShowLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSuccess = (userData: { name: string }) => {
    setUser(userData);
    setShowLogin(false);
  };

  useEffect(() => {
    // Fetch user info if logged in
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      {user ? (
        <div>
          <span className="mr-4">Hello, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
      )}
    </header>
  );
}