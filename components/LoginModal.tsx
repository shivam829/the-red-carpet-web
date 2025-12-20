// components/LoginModal.tsx
"use client";

export default function LoginModal({ onClose, onSuccess }) {
  const handleLogin = () => {
    // Mock user data
    const userData = { name: "Test User" };
    onSuccess(userData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded">
        <h2 className="mb-4 text-xl font-semibold">Login / Sign Up</h2>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mock Login
        </button>
        <button
          onClick={onClose}
          className="ml-4 bg-gray-300 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}