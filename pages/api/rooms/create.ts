import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({ message: 'Sadece admin kullanıcılar oda oluşturabilir.' });
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Başlık ve açıklama gerekli.' });
    }

    try {
      const newRoom = await prisma.animeRoom.create({
        data: {
          title,
          description,
        },
      });
      return res.status(200).json({ message: 'Oda oluşturuldu', room: newRoom });
    } catch (error) {
      return res.status(500).json({ message: 'Sunucu hatası', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
