"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Manga() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const mangaKanallari = [
    {
      aktifKisi: 90,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/One_Piece_Volume_1_cover.jpg",
      ad: "One Piece",
    },
    {
      aktifKisi: 72,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/6/6b/Berserk_vol1_cover.jpg",
      ad: "Berserk",
    },
    {
      aktifKisi: 65,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/1/1b/Vinland_Saga_volume_1_cover.jpg",
      ad: "Vinland Saga",
    },
    {
      aktifKisi: 58,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/e/e1/Chainsaw_Man_manga_cover_volume_1.jpg",
      ad: "Chainsaw Man",
    },
    {
      aktifKisi: 50,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/c/cf/Death_Note_manga_volume_1_cover.jpg",
      ad: "Death Note",
    },
    {
      aktifKisi: 44,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/a/a5/My_Hero_Academia_Volume_1_cover.jpg",
      ad: "My Hero Academia",
    },
    {
      aktifKisi: 39,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/2/23/Spy_x_Family_vol1_cover.jpg",
      ad: "Spy x Family",
    },
    {
      aktifKisi: 30,
      resim:
        "https://upload.wikimedia.org/wikipedia/en/7/7b/Naruto_Manga_Volume_1_cover.jpg",
      ad: "Naruto",
    },
  ];

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
              <Link href="/index">
                <a>Ana Sayfa</a>
              </Link>
            </li>
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

        {/* GÖVDE */}
        <main>
          <section className="esenlik">
            <h2>Manga</h2>
            <div className="kanal-grid">
              {mangaKanallari.map(({ aktifKisi, resim, ad }, i) => (
                <div key={i} className="kanal-karti">
                  <span className="aktif-kisi">🟢 {aktifKisi} kişi aktif</span>
                  <div className="kanal-gorsel">
                    <Image
                      src={resim}
                      alt={ad}
                      width={200}
                      height={300}
                      objectFit="contain"
                    />
                  </div>
                  <p className="kanal-adi">{ad}</p>
                  <button className="katil-buton">Sohbete Katıl</button>
                </div>
              ))}
            </div>
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
