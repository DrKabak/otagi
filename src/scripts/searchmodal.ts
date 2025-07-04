export function initSearchModal() {
  const modal = document.getElementById("searchModal") as HTMLDivElement | null;
  const btn = document.querySelector(".search-btn") as HTMLButtonElement | null;
  const span = document.querySelector(".close") as HTMLSpanElement | null;

  if (!modal || !btn || !span) return;

  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e: MouseEvent) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
