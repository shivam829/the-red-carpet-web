import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, number } = req.body as { name: string; number: string };

    try {
      await connectToDatabase();

      // Save user info
      const newUser = new User({ name, number });
      await newUser.save();

      res.status(200).json({ message: 'User saved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}