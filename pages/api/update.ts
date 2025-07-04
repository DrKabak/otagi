// pages/api/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Güncelleme işlemini burada yap
    return res.status(200).json({ message: 'Güncellendi!' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
