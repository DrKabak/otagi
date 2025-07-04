import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../lib/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. JWT Token kontrolü
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }

  const userId = payload.userId;

  // 2. Yönteme göre işlem
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      res.json({ user });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Bilinmeyen hata";
      res.status(500).json({ message: "Veri alınamadı", error: errorMessage });
    }
  } else if (req.method === "PUT") {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Ad ve e-posta zorunlu" });
    }
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email},
      });
      res.json({ message: "Profil güncellendi", user: updatedUser });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Bilinmeyen hata";
      res.status(500).json({ message: "Güncelleme başarısız", error: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
