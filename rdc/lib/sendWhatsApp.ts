export default async function sendWhatsApp({
  phone,
  message,
}: {
  phone: string;
  message: string;
}) {
  console.log("📲 WhatsApp sent to:", phone);
}
