type WhatsAppPayload = {
  phone: string;
  name: string;
  reference: string;
};

export default async function sendWhatsApp({
  phone,
  name,
  reference,
}: WhatsAppPayload) {
  /**
   * 🔔 INTEGRATION NOTE
   * Replace this console.log with:
   * - Twilio WhatsApp API
   * - Meta Cloud WhatsApp API
   */

  console.log("📲 WhatsApp message queued:");
  console.log(`
Hi ${name} 👋

🎟 Your ticket for *The Red Carpet – New Year’s Eve* is confirmed!

🔑 Reference ID: ${reference}

📍 Venue: Amber by Sayaji, Bhopal
🗓 Date: 31st December 2025

✨ Get ready for an unforgettable night.
See you on the red carpet!

— Team Red Carpet
  `);

  return { success: true };
}
