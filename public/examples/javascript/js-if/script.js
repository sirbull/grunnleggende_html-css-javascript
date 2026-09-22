const alder = 18;
let melding;
if (alder >= 18) {
  melding = "Voksenbillett";
} else {
  melding = "Ungdomsbillett";
}
document.querySelector("#resultat").textContent = melding;