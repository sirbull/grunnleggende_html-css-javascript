const produkter = [
  { id: "bok", navn: "Notatbok", ore: 4500 },
  { id: "penn", navn: "Penn", ore: 1500 },
];
const kurv = new Map();
const penger = (ore) =>
  new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(
    ore / 100,
  );
for (const produkt of produkter) {
  const kort = document.createElement("article"),
    tittel = document.createElement("h2"),
    knapp = document.createElement("button");
  tittel.textContent = `${produkt.navn} · ${penger(produkt.ore)}`;
  knapp.textContent = `Legg til ${produkt.navn}`;
  knapp.dataset.id = produkt.id;
  kort.append(tittel, knapp);
  document.querySelector("#produkter").append(kort);
}
function vis() {
  const liste = document.querySelector("#kurv");
  liste.replaceChildren();
  let total = 0;
  for (const produkt of produkter) {
    const antall = kurv.get(produkt.id) || 0;
    if (!antall) continue;
    total += produkt.ore * antall;
    const li = document.createElement("li");
    li.textContent = `${produkt.navn} × ${antall}: ${penger(produkt.ore * antall)}`;
    liste.append(li);
  }
  document.querySelector("#sum").textContent = `Totalt: ${penger(total)}`;
}
document.querySelector("#produkter").addEventListener("click", (event) => {
  const knapp = event.target.closest("button[data-id]");
  if (!knapp) return;
  const id = knapp.dataset.id;
  kurv.set(id, (kurv.get(id) || 0) + 1);
  vis();
});
document.querySelector("#tom").onclick = () => {
  kurv.clear();
  vis();
};
vis();
