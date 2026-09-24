let antall = 0;
function vis() {
  document.querySelector("output").textContent = antall;
  document.querySelector("#minus").disabled = antall === 0;
}
document.querySelector("#pluss").onclick = () => {
  antall++;
  vis();
};
document.querySelector("#minus").onclick = () => {
  antall = Math.max(0, antall - 1);
  vis();
};
document.querySelector("#nullstill").onclick = () => {
  antall = 0;
  vis();
};
vis();
