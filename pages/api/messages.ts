import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const roomId = parseInt(req.query.roomId as string);
    if (!roomId) return res.status(400).json({ message: "roomId gerekli" });

    try {
      const messages = await prisma.message.findMany({
        where: { roomId },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      });
      return res.status(200).json(messages);
    } catch {
      return res.status(500).json({ message: "Mesajlar alınamadı" });
    }
  } else if (req.method === "POST") {
    const { roomId, userId, content } = req.body;
    if (!roomId || !userId || !content) {
      return res.status(400).json({ message: "roomId, userId ve content gerekli" });
    }

    try {
      const message = await prisma.message.create({
        data: {
          content,
          roomId,
          userId,
        },
      });
      return res.status(201).json(message);
    } catch {
      return res.status(500).json({ message: "Mesaj gönderilemedi" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
