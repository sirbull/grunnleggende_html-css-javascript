async function last() {
  const status = document.querySelector("#resultat");
  status.textContent = "Henter turer …";
  try {
    const url = "data:application/json," + encodeURIComponent(JSON.stringify([{navn:"Skogsturen",km:3},{navn:"Fjordstien",km:5}]));
    const response = await fetch(url);
    if (!response.ok) throw new Error("Filen kunne ikke hentes");
    const turer = await response.json();
    if (!Array.isArray(turer)) throw new Error("Forventet en liste");
    const grid = document.querySelector(".grid"); grid.replaceChildren();
    for (const tur of turer) {
      if (typeof tur.navn !== "string" || typeof tur.km !== "number") throw new Error("Ugyldig tur");
      const kort = document.createElement("article");
      const tittel = document.createElement("h2"); tittel.textContent = tur.navn;
      const tekst = document.createElement("p"); tekst.textContent = `${tur.km} km`;
      kort.append(tittel,tekst); grid.append(kort);
    }
    status.textContent = `${turer.length} turer hentet.`;
  } catch (error) { status.textContent = "Kunne ikke vise turene. " + error.message; }
}
document.querySelector("button").addEventListener("click", last);