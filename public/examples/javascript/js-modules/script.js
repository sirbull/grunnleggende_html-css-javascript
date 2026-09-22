const linjer = [];
function vis(tekst) {
  linjer.push(tekst);
  document.querySelector("#resultat").textContent = linjer.join(" → ");
}
vis("1: start");
Promise.resolve().then(() => vis("2: Promise-callback"));
vis("3: synkron kode ferdig");