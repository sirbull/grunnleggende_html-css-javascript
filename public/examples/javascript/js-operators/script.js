const pris = 40;
const antall = 3;
const total = pris * antall;
const innenforBudsjett = total <= 150;
document.querySelector("#resultat").textContent = `Pris: ${total} kr. Innenfor budsjett: ${innenforBudsjett}`;