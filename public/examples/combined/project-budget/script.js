document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const pris = document.querySelector("#pris").valueAsNumber;
  const antall = document.querySelector("#antall").valueAsNumber;
  const resultat = document.querySelector("#resultat");
  if (
    !Number.isFinite(pris) ||
    pris < 0 ||
    !Number.isInteger(antall) ||
    antall < 1
  ) {
    resultat.textContent = "Skriv en gyldig pris og et helt antall deltakere.";
    return;
  }
  const kroner = new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
  });
  resultat.textContent = `Totalt: ${kroner.format(pris * antall)}`;
});
