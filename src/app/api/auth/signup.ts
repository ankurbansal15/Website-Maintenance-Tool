import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the user to the database (this is just a placeholder)
    const user = { id: 1, username, password: hashedPassword };
    res.status(201).json({ message: 'User created', user });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}