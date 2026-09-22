document.querySelector("button").addEventListener("click", event => {
  const aktiv = document.body.classList.toggle("dark");
  event.currentTarget.setAttribute("aria-pressed", String(aktiv));
});