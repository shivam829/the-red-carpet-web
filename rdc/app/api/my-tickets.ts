import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Booking from '../../models/Booking';
import jwt from 'jsonwebtoken';

interface MyJwtPayload {
  adminId: string;
  // add other properties if your token payload includes more
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authToken = req.headers.authorization?.replace("Bearer ", "");
  if (!authToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as MyJwtPayload;
    const userId = decoded.adminId; 
    await connectToDatabase();
    const bookings = await Booking.find({ user: userId });
    res.json(bookings);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}