const navn = "Ada";
let poeng = 0;
const resultat = document.querySelector("#resultat");
resultat.textContent = navn + ": " + poeng;
document.querySelector("button").addEventListener("click", () => {
  poeng = poeng + 1;
  resultat.textContent = navn + ": " + poeng;
});