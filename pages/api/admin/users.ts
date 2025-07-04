import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token yok" });
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return res.status(200).json({ users });

  } else if (req.method === 'DELETE') {
    // Kullanıcı sil
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Silinecek kullanıcı ID\'si gerekli' });
    }
    
    try {
      await prisma.user.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Kullanıcı silindi' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message: 'Kullanıcı silinemedi', error: errorMessage });
    }

  } else if (req.method === 'PUT') {
    const { id, role } = req.body;
    if (!id || !role) {
      return res.status(400).json({ message: 'Kullanıcı ID ve rol gerekli' });
    }

    try {
      if (payload.userId === Number(id)) {
        return res.status(403).json({ message: 'Kendi rolünüzü değiştiremezsiniz' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { role },
      });
      return res.status(200).json({ message: 'Rol güncellendi', user: updatedUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message: 'Kullanıcı güncellenemedi', error: errorMessage });
    }

  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
