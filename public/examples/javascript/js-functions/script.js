function totalpris(pris, antall) {
  return pris * antall;
}
const total = totalpris(40, 3);
document.querySelector("#resultat").textContent = `Du betaler ${total} kr.`;