import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../../lib/auth";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token yok" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Geçersiz token" });
  }

  const { content, roomId } = req.body;
  if (!content || !roomId) {
    return res.status(400).json({ message: "Mesaj içeriği ve oda ID zorunlu" });
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        room: { connect: { id: Number(roomId) } },
        user: { connect: { id: payload.userId } },
      },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });

    return res.status(201).json({ message });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: "Mesaj gönderilemedi", error: errorMessage });
  }
}
