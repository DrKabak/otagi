import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Anime() {
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
            <Image src="/otagi-logo.png" alt="Otagi Logo" width={150} height={50} className="logo" />
            <h1 className="site-adi">Otagi</h1>
          </div>

          <div className="header-right">
            <div className="giris-dropdown">
              <button>Giriş Yap</button>
            </div>
          </div>
        </header>

        <nav className={`menu ${menuOpen ? "" : "hidden"}`}>
          <ul>
            <li>
              <Link href="/index"><a>Ana Sayfa</a></Link>
            </li>
            <li>
              <Link href="/tum-forumlar"><a>Tüm Forumlar</a></Link>
            </li>
            <li>
              <Link href="/manga"><a>Manga</a></Link>
            </li>
            <li>
              <Link href="/hakkimizda"><a>Hakkımızda</a></Link>
            </li>
          </ul>
        </nav>

        <div
          className={`overlay ${menuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
        ></div>

        <main>
          <section className="esenlik">
            <h2>Anime</h2>
            <div className="kanal-grid">
              {[
                {
                  aktifKisi: 124,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Attack_on_Titan_Season_3_Part_2_cover.jpg/220px-Attack_on_Titan_Season_3_Part_2_cover.jpg",
                  ad: "Attack on Titan",
                },
                {
                  aktifKisi: 58,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/f/f5/Monster_DVD_box_set.jpg",
                  ad: "Monster",
                },
                {
                  aktifKisi: 58,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/1/11/No_Game_No_Life_cover.jpg",
                  ad: "No Game No Life",
                },
                {
                  aktifKisi: 35,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/4/45/One_Piece_Logo.svg",
                  ad: "One Piece",
                },
                {
                  aktifKisi: 80,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/c/c2/Death_Note_Vol_1.png",
                  ad: "Death Note",
                },
                {
                  aktifKisi: 47,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/7/77/Naruto_Uzumaki.png",
                  ad: "Naruto",
                },
                {
                  aktifKisi: 62,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/2/2f/Fullmetal_Alchemist_Brotherhood_DVD.png",
                  ad: "Fullmetal Alchemist",
                },
                {
                  aktifKisi: 50,
                  resim:
                    "https://upload.wikimedia.org/wikipedia/en/4/44/SteinsGateVisualNovelBoxart.jpg",
                  ad: "Steins;Gate",
                },
              ].map(({ aktifKisi, resim, ad }, i) => (
                <div key={i} className="kanal-karti">
                  <span className="aktif-kisi">🟢 {aktifKisi} kişi aktif</span>
                  <div className="kanal-gorsel">
                    <Image
                      src={resim}
                      alt={ad}
                      width={220}
                      height={300}
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

        <footer>
          <p>&copy; 2025 Otagi. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </>
  );
}
