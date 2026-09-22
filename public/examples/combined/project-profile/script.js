const knapp = document.querySelector("button");
knapp.addEventListener("click", () => {
  const tips = document.querySelector("#tips");
  tips.hidden = !tips.hidden;
  knapp.setAttribute("aria-expanded", String(!tips.hidden));
  knapp.textContent = tips.hidden ? "Vis mitt tips" : "Skjul mitt tips";
});