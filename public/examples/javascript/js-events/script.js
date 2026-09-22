let antall = 0;
function tellKlikk(event) {
  antall++;
  document.querySelector("#resultat").textContent = `Du har trykket ${antall} ganger.`;
  console.log("Hendelse:", event.type);
}
document.querySelector("button").addEventListener("click", tellKlikk);