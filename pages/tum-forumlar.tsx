"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

type Forum = {
  aktif: number;
  isim: string;
  img: string;
};

const forums: Forum[] = [
  // ... aynen senin verdiğin forum dizisi ...
];

export default function TumForumlar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="wrapper">
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

        <nav className={`menu ${menuOpen ? "" : "hidden"}`}>
          <ul>
            <li>
              <Link href="/">
                <a>Ana Sayfa</a>
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

        <div
          className={`overlay ${menuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
        ></div>

        <main>
          <section className="esenlik">
            <h2>Tüm Forumlar</h2>
            <div className="kanal-grid">
              {forums.map(({ aktif, isim, img }, index) => (
                <div key={index} className="kanal-karti">
                  <span className="aktif-kisi">🟢 {aktif} kişi aktif</span>
                  <div className="kanal-gorsel">
                    <Image
                      src={img}
                      alt={`${isim} kapak resmi`}
                      width={200}
                      height={300}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="kanal-adi">{isim}</p>
                  <button className="katil-buton">Sohbete Katıl</button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer>
        <p>&copy; 2025 Otagi. Tüm hakları saklıdır.</p>
      </footer>
    </>
  );
}
