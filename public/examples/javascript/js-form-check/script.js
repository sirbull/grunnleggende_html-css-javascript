const skjema = document.querySelector("form");
const felt = document.querySelector("#navn");
const resultat = document.querySelector("#resultat");
function hils(event) {
  event.preventDefault();
  const navn = felt.value.trim();
  if (navn === "") {
    resultat.textContent = "Skriv et navn først.";
  } else {
    resultat.textContent = "Hei, " + navn + "!";
  }
}
skjema.addEventListener("submit", hils);
