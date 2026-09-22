function lagTeller() {
  let antall = 0;
  return () => { antall++; return antall; };
}
const nesteTall = lagTeller();
document.querySelector("button").addEventListener("click", () => {
  document.querySelector("#resultat").textContent = nesteTall();
});