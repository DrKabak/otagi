import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hakkimizda() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
              <button>Giriş Yap</button>
            </div>
          </div>
        </header>

        {/* Açılır Menü */}
        <nav className={`menu ${menuOpen ? "" : "hidden"}`}>
          <ul>
            <li>
              <Link href="/index"><a>Ana Sayfa</a></Link>
            </li>
            <li>
              <Link href="/tum-forumlar"><a>Tüm Forumlar</a></Link>
            </li>
            <li>
              <Link href="/anime"><a>Anime</a></Link>
            </li>
            <li>
              <Link href="/manga"><a>Manga</a></Link>
            </li>
          </ul>
        </nav>

        {/* Menü Overlay */}
        <div
          className={`overlay ${menuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
        ></div>

        {/* GÖVDE */}
        <main>
          <section className="esenlik">
            <h2>Hakkımızda</h2>
            {/* İçerik ekleyebilirsin */}
          </section>
        </main>

        {/* FOOTER */}
        <footer>
          <p>&copy; 2025 Otagi. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </>
  );
}
