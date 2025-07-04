import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const rooms = await prisma.animeRoom.findMany({
        select: { id: true, title: true, description: true }
      });
      res.status(200).json({ rooms });
    } catch (error) {
      res.status(500).json({ message: 'Odalar yüklenemedi', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
