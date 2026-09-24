const bilder = [
  {
    navn: "Fjell",
    alt: "To grønne fjelltopper",
    form: '<path fill="#174f42" d="M0 170 100 25 200 170Z"/><path fill="#668677" d="M140 170 240 55 320 170Z"/>',
  },
  {
    navn: "Hav",
    alt: "Tre blå bølger",
    form: '<path d="M0 70Q40 30 80 70T160 70T240 70T320 70V170H0Z" fill="#226092"/>',
  },
  {
    navn: "Skog",
    alt: "Tre mørkegrønne grantrær",
    form: '<path d="M20 145 65 35 110 145ZM105 145 150 20 195 145ZM190 145 235 45 280 145Z" fill="#174f42"/>',
  },
];
function vis() {
  const valgt = bilder[Number(document.querySelector("select").value)];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170"><rect width="320" height="170" fill="#eef3ee"/>${valgt.form}</svg>`;
  const bilde = document.querySelector("img");
  bilde.src = "data:image/svg+xml," + encodeURIComponent(svg);
  bilde.alt = valgt.alt;
  document.querySelector("figcaption").textContent = valgt.navn;
}
document.querySelector("select").addEventListener("change", vis);
vis();
