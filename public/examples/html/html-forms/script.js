document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#resultat").textContent = "Takk! Dette var en lokal demonstrasjon.";
});