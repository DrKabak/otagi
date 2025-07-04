import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setFormData({
            name: data.user.name,
            email: data.user.email,
            bio: data.user.bio || "",
          });
        }
      })
      .catch(() => {
        setMessage("Profil bilgileri alınamadı.");
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Yetkilendirme hatası. Lütfen tekrar giriş yapınız.");
      router.push("/login");
      return;
    }

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message || "Güncelleme tamamlandı.");
    } else {
      setMessage(data.message || "Güncelleme başarısız.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Profil Bilgilerim</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Adınız"
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-posta"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Hakkımda"
          className="border p-2 rounded"
          rows={4}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
        >
          Bilgileri Güncelle
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
