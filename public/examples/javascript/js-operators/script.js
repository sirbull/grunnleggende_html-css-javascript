const pris = 40;
const antall = 3;
const total = pris * antall;
console.log("Totalpris:", total);

const budsjett = 150;
const innenforBudsjett = total <= budsjett;
console.log("Innenfor budsjett:", innenforBudsjett);

// && betyr at begge må være sanne
console.log("Billig og på lager:", pris < 50 && antall > 0);