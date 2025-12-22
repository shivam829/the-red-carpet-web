// app/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, number, password } = req.body;

  await connectToDatabase();

  const existingUser = await User.findOne({ number });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const newUser = new User({ name, number, password });
  await newUser.save();

  res.status(200).json({ message: 'Signup successful' });
}