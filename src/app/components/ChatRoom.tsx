"use client";

import { useEffect, useState, useCallback } from "react";

type ChatRoomProps = {
  userId: number;
  roomId: number;
};

type Message = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export default function ChatRoom({ userId, roomId }: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ useCallback ile sarmalanmış versiyon
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/messages/${roomId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Mesajlar alınamadı:", error);
    }
  }, [roomId]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message, userId, roomId }),
      });

      if (res.ok) {
        setMessage("");
        await fetchMessages();
      }
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Anime Odası #{roomId}</h2>

      <div className="h-80 overflow-y-auto border p-3 mb-4 bg-gray-50 rounded space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-400">Henüz mesaj yok.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded ${
                msg.user.id === userId
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100"
              }`}
            >
              <p className="text-sm text-gray-600">{msg.user.name}</p>
              <p className="text-base">{msg.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı yazın..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
