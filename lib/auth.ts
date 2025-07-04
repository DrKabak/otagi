import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sifredegistir';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
  } catch {
    return null;
  }
}

async function updateData() {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Zehra' }),
    });

    const data = await res.json();
    console.log(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Hata:', error.message);
    } else {
      console.error('Beklenmeyen hata:', error);
    }
  }
}

updateData();
