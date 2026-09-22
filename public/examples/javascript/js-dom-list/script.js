let nummer = 0;
const leggTil = document.querySelector("#legg-til");
leggTil.addEventListener("click", () => {
  nummer++;
  const punkt = document.createElement("li");
  const fjern = document.createElement("button");
  punkt.append(`Idé ${nummer} `);
  fjern.textContent = `Fjern idé ${nummer}`;
  fjern.addEventListener("click", () => { punkt.remove(); leggTil.focus(); });
  punkt.append(fjern);
  document.querySelector("ul").append(punkt);
});