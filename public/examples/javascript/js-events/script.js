const knapp = document.querySelector("button");
const resultat = document.querySelector("#resultat");
function visHilsen() {
  resultat.textContent = "Hei!";
}
knapp.addEventListener("click", visHilsen);
