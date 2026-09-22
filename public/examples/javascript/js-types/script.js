const tekst = "2";
const tall = Number(tekst);
console.log(typeof tekst, typeof tall);
document.querySelector("#resultat").textContent = tekst + 3 + " / " + (tall + 3);