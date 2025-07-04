import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Geçersiz oda ID' });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { roomId: parseInt(id) },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return res.status(200).json({ messages });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: 'Mesajlar alınamadı', error: errorMessage });
  }
}
