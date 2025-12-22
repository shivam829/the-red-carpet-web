"use client";

import { useState } from "react";

export default function AdminSetupPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, message: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-black/80 border border-gold/30 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gold text-center mb-6">
          ⚠️ Admin Setup (ONE-TIME USE)
        </h1>

        <p className="text-gray-300 mb-6 text-center">
          This will create your first admin account using the credentials from your environment variables.
        </p>

        <button
          onClick={createAdmin}
          disabled={loading || result?.success}
          className="w-full py-3 bg-gold text-black rounded font-semibold hover:bg-yellow-600 transition disabled:opacity-50 mb-4"
        >
          {loading ? "Creating..." : result?.success ? "✅ Admin Created" : "Create Admin Account"}
        </button>

        {result && (
          <div
            className={`p-4 rounded ${
              result.success
                ? "bg-green-600/20 border border-green-600 text-green-400"
                : "bg-red-600/20 border border-red-600 text-red-400"
            }`}
          >
            <p className="font-semibold mb-2">
              {result.success ? "✅ Success" : "❌ Error"}
            </p>
            <p className="text-sm">{result.message}</p>
            {result.admin && (
              <div className="mt-3 text-sm">
                <p><strong>Email:</strong> {result.admin.email}</p>
                <p><strong>Role:</strong> {result.admin.role}</p>
              </div>
            )}
            {result.error && (
              <p className="mt-2 text-sm">Details: {result.error}</p>
            )}
          </div>
        )}

        {result?.success && (
          <div className="mt-6">
            <a
              href="/admin/login"
              className="block w-full py-3 bg-green-600 text-white text-center rounded font-semibold hover:bg-green-700 transition"
            >
              Go to Login →
            </a>
            
            <p className="text-red-400 text-sm mt-4 text-center">
              ⚠️ Delete this page and /api/admin/create after use!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}