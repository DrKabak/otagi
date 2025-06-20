import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "Eksik bilgi" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "Kullanıcı oluşturuldu" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kayıt başarısız" });
  }
}
