const filmer = ["Skogsturen", "Ved havet", "Hjemreisen"];
const liste = document.querySelector("ul");
for (const tittel of filmer) {
  const punkt = document.createElement("li");
  punkt.textContent = tittel;
  liste.append(punkt);
}