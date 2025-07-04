"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [view, setView] = useState<"home" | "register">("home");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  const aramaYap = () => {
    if (searchTerm.trim()) {
      alert(`"${searchTerm}" için arama yapılıyor...`);
    } else {
      alert("Lütfen bir şey yazın!");
    }
  };

  const populerKanallar = [
    {
      aktifKisi: 124,
      resim: "https://upload.wikimedia.org/wikipedia/en/9/9a/Attack_on_Titan_Season_4_Part_1_cover.jpg",
      ad: "Attack on Titan",
    },
    {
      aktifKisi: 58,
      resim: "https://upload.wikimedia.org/wikipedia/en/f/f5/Monster_DVD_box_set.jpg",
      ad: "Monster",
    },
    {
      aktifKisi: 58,
      resim: "https://upload.wikimedia.org/wikipedia/en/f/f9/No_Game_No_Life_Logo.png",
      ad: "No Game No Life",
    },
    {
      aktifKisi: 35,
      resim: "https://upload.wikimedia.org/wikipedia/en/6/62/One_Piece_Logo.svg",
      ad: "One Piece",
    },
  ];

  if (view === "home") {
    return (
      <>
        <div className="wrapper">
          {/* Başlık Kısmı */}
          <header>
            <div className="header-left">
              <button
                className="menu-button"
                aria-label="Menüyü aç/kapat"
                onClick={toggleMenu}
              >
                &#9776;
              </button>
            </div>

            <div className="header-center">
              <Image
                src="/otagi-logo.png"
                alt="Otagi Logo"
                width={150}
                height={50}
                className="logo"
              />
              <h1 className="site-adi">Otagi</h1>
            </div>

            <div className="header-right">
              <div className="giris-dropdown">
                <button onClick={() => setView("register")}>
                  Giriş Yap / Kayıt Ol
                </button>
              </div>
            </div>
          </header>

          {/* Açılır Menü */}
          <nav className={`menu ${menuOpen ? "" : "hidden"}`}>
            <ul>
              <li>
                <Link href="/tum-forumlar">
                  <a>Tüm Forumlar</a>
                </Link>
              </li>
              <li>
                <Link href="/anime">
                  <a>Anime</a>
                </Link>
              </li>
              <li>
                <Link href="/manga">
                  <a>Manga</a>
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda">
                  <a>Hakkımızda</a>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Menü Overlay */}
          <div
            className={`overlay ${menuOpen ? "" : "hidden"}`}
            onClick={toggleMenu}
          ></div>

          {/* ANA YAZI VE ARAMA */}
          <main>
            <section className="esenlik">
              <h2>Esenlikler!</h2>
              <input
                type="text"
                placeholder="Anime ara..."
                className="arama-kutusu"
                id="arama-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={aramaYap} className="arama-buton">
                Ara
              </button>
            </section>

            <section className="populer-kanallar">
              <h2>Popüler Kanallar</h2>
              <div className="kanal-container">
                {populerKanallar.map(({ aktifKisi, resim, ad }, i) => (
                  <div key={i} className="kanal-karti">
                    <span className="aktif-kisi">🟢 {aktifKisi} kişi aktif</span>
                    <div className="kanal-gorsel">
                      <Image
                        src={resim}
                        alt={ad}
                        width={150}
                        height={200}
                        objectFit="cover"
                      />
                    </div>
                    <p className="kanal-adi">{ad}</p>
                    <button className="katil-buton">Sohbete Katıl</button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* FOOTER */}
        <footer>
          <p>&copy; 2025 Otagi. Tüm hakları saklıdır.</p>
        </footer>
      </>
    );
  }

  if (view === "register") {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <button
          onClick={() => setView("home")}
          className="mb-4 text-blue-600 underline"
        >
          {"<"} Ana Sayfaya Dön
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Adınız"
            className="border p-2"
            value={formData.name}
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="E-posta"
            className="border p-2"
            value={formData.email}
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Şifre"
            className="border p-2"
            value={formData.password}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            Kayıt Ol
          </button>
        </form>
      </div>
    );
  }

  return null;
}
