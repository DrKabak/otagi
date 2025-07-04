'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Room = {
  id: number;
  title: string;
  description: string;
};

export default function RoomListPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        if (data.rooms) {
          setRooms(data.rooms);
        }
      });
  }, []);

  const goToRoom = (id: number) => {
    router.push(`/rooms/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sohbet Odaları</h2>
      {rooms.map(room => (
        <div
          key={room.id}
          onClick={() => goToRoom(room.id)}
          className="cursor-pointer border p-4 mb-4 rounded hover:bg-gray-100 transition"
        >
          <h3 className="text-xl font-semibold">{room.title}</h3>
          <p className="text-gray-600">{room.description}</p>
        </div>
      ))}
    </div>
  );
}
