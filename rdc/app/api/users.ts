// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name, number } = req.body;
    try {
      const newUser = new User({ name, number });
      await newUser.save();
      res.status(200).json({ message: 'User saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user' });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}