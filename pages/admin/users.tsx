"use client";

import { useEffect, useState, useCallback } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getCurrentUserId = (): number => {
    if (!token) return 0;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  };

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setError("");  // Başarılı ise hatayı temizle
      } else {
        setError("Kullanıcılar yüklenemedi");
      }
    } catch (err) {
      // err herhangi bir tip olabilir, o yüzden stringe çevirelim
      const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(errorMessage);
    }
  }, [token]);

  // Diğer fonksiyonlarda da error handling yapabilirsin, örneğin:
  const handleDelete = async (id: number) => {
    if (!token) return;

    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchUsers();
        setError("");
      } else {
        setError("Silme işlemi başarısız");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(errorMessage);
    }
  };

  // role değiştirme fonksiyonuna da benzer şekilde error handling ekleyebilirsin
  const handleRoleChange = async (id: number, role: string) => {
    if (!token) return;

    const newRole = role === "admin" ? "user" : "admin";

    if (id === getCurrentUserId()) {
      alert("Kendi rolünüzü değiştiremezsiniz");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (res.ok) {
        fetchUsers();
        setError("");
      } else {
        setError("Rol güncelleme başarısız");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin - Kullanıcı Yönetimi</h1>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Ad</th>
            <th className="border border-gray-300 p-2">E-posta</th>
            <th className="border border-gray-300 p-2">Rol</th>
            <th className="border border-gray-300 p-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="mr-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Sil
                </button>
                <button
                  onClick={() => handleRoleChange(user.id, user.role)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  {user.role === "admin" ? "User Yap" : "Admin Yap"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
