document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  const svar = new FormData(event.currentTarget).get("svar");
  document.querySelector("#resultat").textContent = svar === "html" ? "Riktig. HTML beskriver innhold og struktur." : "Riktig svar er HTML. CSS beskriver utseendet, og JavaScript gir oppførsel.";
});