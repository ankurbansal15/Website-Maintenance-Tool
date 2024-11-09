import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../middleware/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticate(req, res, () => {
    // Protected route logic here
    res.status(200).json({ message: 'Authenticated' });
  });
}