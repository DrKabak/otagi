document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("searchModal");
  const btn = document.querySelector(".search-btn");
  const span = document.querySelector(".close");

  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});
