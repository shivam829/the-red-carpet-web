// app/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User, { IUser } from '../../models/User'; // import IUser

import { signToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { identifier, password } = req.body;

  await connectToDatabase();

  // Find by number or name with explicit type
  const user = await User.findOne({
    $or: [{ number: identifier }, { name: identifier }],
  }) as IUser | null; // cast result to IUser

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken(user._id.toString());
  res.status(200).json({ token, name: user.name });
}