"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <input name="name" onChange={handleChange} placeholder="Adınız" className="border p-2" />
      <input name="email" type="email" onChange={handleChange} placeholder="E-posta" className="border p-2" />
      <input name="password" type="password" onChange={handleChange} placeholder="Şifre" className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">Kayıt Ol</button>
    </form>
  );
}