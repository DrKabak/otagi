"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.passwordConfirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Kayıt başarısız.");
      }
    } catch {
      setError("Sunucu hatası oluştu.");
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* Başlık */}
        <header>
          <div className="header-left">
            <button className="menu-button" aria-label="Menüyü aç/kapat">
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
        <nav className="menu">
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
        <div className="overlay hidden"></div>

        {/* Ana içerik */}
        <main className="auth-main">
          <section className="auth-container">
            <h2>Kayıt Ol</h2>
            <form id="registerForm" onSubmit={handleSubmit}>
              <label htmlFor="username">Kullanıcı Adı:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Kullanıcı adınızı girin"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">E-posta:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-posta adresinizi girin"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Şifre:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Şifrenizi girin"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="passwordConfirm">Şifre Tekrar:</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Şifrenizi tekrar girin"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />

              <button type="submit">Kayıt Ol</button>
            </form>
            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
            <p>
              Zaten hesabınız var mı?{" "}
              <Link href="/login">
                <a style={{ color: "blue" }}>Giriş Yap</a>
              </Link>
            </p>
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
