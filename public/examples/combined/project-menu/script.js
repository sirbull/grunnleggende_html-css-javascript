const knapp = document.querySelector("#menyknapp");
const meny = document.querySelector("nav");
function settApen(apen) {
  meny.hidden = !apen;
  knapp.setAttribute("aria-expanded", String(apen));
  knapp.textContent = apen ? "Lukk meny" : "Vis meny";
}
knapp.onclick = () => settApen(meny.hidden);
meny.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    settApen(false);
    knapp.focus();
  }
});
meny.querySelectorAll("a").forEach((lenke) =>
  lenke.addEventListener("click", (event) => {
    event.preventDefault();
    const mal = document.querySelector(lenke.getAttribute("href"));
    settApen(false);
    mal.focus();
    mal.scrollIntoView();
  }),
);
