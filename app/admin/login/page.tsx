"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) window.location.href = "/admin/scan";
    else alert("Invalid admin credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 bg-gray-900 rounded-lg">
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
