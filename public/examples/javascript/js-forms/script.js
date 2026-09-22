const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const navn = document.querySelector("input").value.trim();
  document.querySelector("#resultat").textContent = navn ? `Hei, ${navn}!` : "Skriv et navn først.";
});