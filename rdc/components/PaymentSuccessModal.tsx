export default function PaymentSuccessModal({
  bookingId,
  onClose,
}: {
  bookingId: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">🎉 Booking Confirmed!</h2>

        <p className="text-gray-700 mb-4">
          Thanks for booking your ticket.
          <br />
          New Year’s Eve awaits you ✨
        </p>

        <div className="space-y-3">
          <a
            href={`/ticket/${bookingId}`}
            className="block w-full py-3 bg-black text-white rounded-lg"
          >
            Download Ticket
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 border rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
