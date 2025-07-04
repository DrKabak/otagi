"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();

  // Form verileri için state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [message, setMessage] = useState(""); // Başarı veya hata mesajı

  // Sayfa yüklendiğinde mevcut kullanıcı verilerini API'den veya localStorage'dan çekebilirsin
  useEffect(() => {
    // Örnek: localStorage'dan alalım
    const storedUsername = localStorage.getItem("username") || "zehra_cakmak";
    const storedEmail = localStorage.getItem("email") || "zehra@example.com";
    const storedBio = localStorage.getItem("bio") || "";

    setUsername(storedUsername);
    setEmail(storedEmail);
    setBio(storedBio);
  }, []);

  // Çıkış yap butonu
  const handleLogout = () => {
    localStorage.removeItem("token");
    // İstersen diğer kullanıcı bilgilerini de temizle
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("bio");
    router.push("/login");
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // Güncelleme için API çağrısı örneği:
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, bio }),
      });

      if (res.ok) {
        setMessage("Bilgiler başarıyla güncellendi.");
        // İstersen localStorage güncelle
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("bio", bio);
      } else {
        const data = await res.json();
        setMessage(data.message || "Güncelleme başarısız.");
      }
    } catch {
      setMessage("Sunucu hatası oluştu.");
    }
  };

  // Menü aç/kapa
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="wrapper">
        {/* Başlık */}
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
              <button onClick={() => router.push("/login")}>Giriş Yap</button>
            </div>
          </div>
        </header>

        {/* Menü */}
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

        {/* Profil İçeriği */}
        <main className="profile-main">
          <section className="profile-container">
            <h2>Profil Bilgilerim</h2>
            <button
              id="logoutBtn"
              style={{ float: "right", marginBottom: "1rem" }}
              onClick={handleLogout}
            >
              Çıkış Yap
            </button>
            <form id="profileForm" onSubmit={handleSubmit}>
              <label htmlFor="username">Kullanıcı Adı:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="email">E-posta:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="bio">Hakkımda:</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Kendinizden kısaca bahsedin..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>

              <button type="submit">Bilgileri Güncelle</button>
            </form>
            {message && (
              <p
                style={{
                  marginTop: "1rem",
                  color: message.includes("başarı") ? "green" : "red",
                }}
              >
                {message}
              </p>
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Otagi. Tüm hakları saklıdır.</p>
      </footer>
    </>
  );
}
