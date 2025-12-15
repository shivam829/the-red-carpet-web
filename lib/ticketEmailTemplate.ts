type TicketEmailProps = {
  name: string;
  passName: string;
  qrCode: string;
};

export function ticketEmailTemplate({
  name,
  passName,
  qrCode,
}: TicketEmailProps) {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #000;
    color: #fff;
    padding: 24px;
    max-width: 600px;
    margin: auto;
    border-radius: 12px;
  ">

    <h1 style="color:#d4af37; text-align:center;">
      THE RED CARPET 2025
    </h1>

    <p>Hi <strong>${name}</strong>,</p>

    <p>
      🎉 Your <strong>${passName}</strong> ticket is <strong>CONFIRMED</strong>.
    </p>

    <hr style="border:1px solid #333; margin:20px 0;" />

    <p><strong>📍 Venue:</strong> Amber by Sayaji, Bhopal</p>
    <p><strong>📅 Date:</strong> 31st December 2025</p>
    <p><strong>⏰ Entry:</strong> From 6:00 PM onwards</p>

    <hr style="border:1px solid #333; margin:20px 0;" />

    <p style="text-align:center;">
      Please show this QR code at the entry gate
    </p>

    <div style="text-align:center; margin:20px 0;">
      <img src="${qrCode}" width="220" />
    </div>

    <p style="text-align:center; font-size:14px; color:#aaa;">
      This QR code is valid for one-time entry only.
    </p>

    <p style="margin-top:30px;">
      See you on the red carpet ✨
    </p>

    <p style="font-size:12px; color:#777;">
      © 2025 THE RED CARPET. All rights reserved.
    </p>

  </div>
  `;
}
