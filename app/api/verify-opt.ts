// pages/api/verify-otp.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { otp, phoneNumber } = req.body;

  // For testing: if OTP is '1234', log in directly
  if (otp === '1234') {
    const token = 'dummy-auth-token';
    return res.status(200).json({
      message: 'OTP verified (test mode). User logged in.',
      token,
      phoneNumber,
    });
  }

  // Uncomment and implement Twilio verification here
  /*
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

  const client = new Twilio(accountSid, authToken);

  try {
    const verificationCheck = await client.verify
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    if (verificationCheck.status === 'approved') {
      // OTP verified successfully, generate your auth token here
      const token = 'your-generated-jwt-or-token';

      return res.status(200).json({
        message: 'OTP verified.',
        token,
        phoneNumber,
      });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Twilio verification error:', error);
    return res.status(500).json({ message: 'Verification failed', error: error.message });
  }
  */

  // If OTP is not '1234', return invalid
  return res.status(400).json({ message: 'Invalid OTP' });
}