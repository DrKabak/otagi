'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoom from 'src/app/components/ChatRoom';

export default function RoomPage() {
  const router = useRouter();
  const { id } = router.query;
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.userId);
    } catch (error) {
      console.error('Token çözümlenemedi:', error);
      router.push('/login');
    }
  }, [router]);

  if (!id || !userId) return <p>Yükleniyor...</p>;

  return (
    <div className="p-4">
      <ChatRoom userId={userId} roomId={parseInt(id as string)} />
    </div>
  );
}
