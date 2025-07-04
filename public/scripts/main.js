// ARAMA YAPMA FONKSİYONU

function aramaYap() {
  const input = document.getElementById("arama-input").value.trim();
  if (input) {
    alert(`"${input}" için arama yapılıyor...`);
    // Gerçek uygulamada burada yönlendirme ya da filtreleme yapılabilir.
  } else {
    alert("Lütfen bir şey yazın!");
  }
}

// MENÜ FONKSİYONU
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");

  function toggleMenu() {
    menu.classList.toggle("open");
    overlay.classList.toggle("active");
  }

  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
});


// LOG OUT FONKSİYONU

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token"); // Oturumu sil
      window.location.href = "login.html"; // Login sayfasına yönlendir
    });
  }
});
