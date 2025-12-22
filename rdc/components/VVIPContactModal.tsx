"use client";

export default function VVIPContactModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-black p-8 text-center shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-gold">
          VVIP Bookings
        </h2>

        <p className="mb-6 text-gray-300">
          For exclusive VVIP tables, premium seating & special arrangements,
          please contact:
        </p>

        {/* Contact Details */}
        <div className="space-y-4">
          <div>
            <p className="text-white font-semibold">📞 Phone</p>
            <a
              href="tel:+919876543210"
              className="text-gold hover:underline"
            >
              +91 98765 43210
            </a>
          </div>

          <div>
            <p className="text-white font-semibold">💬 WhatsApp</p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="text-gold hover:underline"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <p className="text-white font-semibold">📧 Email</p>
            <a
              href="mailto:vvip@theredcarpet.com"
              className="text-gold hover:underline"
            >
              vvip@theredcarpet.com
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          * VVIP bookings are subject to availability
        </p>
      </div>
    </div>
  );
}
