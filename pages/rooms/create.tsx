'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateRoomPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');

    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Oda başarıyla oluşturuldu!');
      setTimeout(() => router.push('/rooms'), 1500);
    } else {
      setMessage(data.message || 'Bir hata oluştu.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Yeni Sohbet Odası Oluştur</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Oda Başlığı"
          className="border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Açıklama"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Oluştur
        </button>
      </form>
      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </div>
  );
}
