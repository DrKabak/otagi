export function initSearch() {
  if (typeof window === "undefined") return;

  const input = document.getElementById("arama-input") as HTMLInputElement | null;
  if (!input) return;

  const trimmed = input.value.trim();
  if (trimmed) {
    alert(`"${trimmed}" için arama yapılıyor...`);
    // Gerçek uygulamada burada yönlendirme ya da filtreleme yapılabilir.
  } else {
    alert("Lütfen bir şey yazın!");
  }
}

export function initMenu() {
  if (typeof window === "undefined") return;

  const menuBtn = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");

  if (!menuBtn || !menu || !overlay) return;

  const toggleMenu = () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("active");
  };

  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
}

export function initLogout() {
  if (typeof window === "undefined") return;

  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  });
}
