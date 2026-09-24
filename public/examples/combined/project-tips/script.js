const tips = [
  "Endre én ting om gangen.",
  "Les den første feilmeldingen.",
  "Gi variabler navn som forklarer innholdet.",
];
let indeks = 0;
function vis() {
  document.querySelector("#tips").textContent = tips[indeks];
  document.querySelector("#posisjon").textContent =
    `Tips ${indeks + 1} av ${tips.length}`;
}
document.querySelector("#neste").onclick = () => {
  indeks = (indeks + 1) % tips.length;
  vis();
};
document.querySelector("#forrige").onclick = () => {
  indeks = (indeks - 1 + tips.length) % tips.length;
  vis();
};
vis();
