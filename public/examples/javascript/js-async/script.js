async function hentFilm() {
  const resultat = document.querySelector("#resultat");
  resultat.textContent = "Henter …";
  try {
    const response = await fetch("data:application/json,%7B%22tittel%22%3A%22Skogsturen%22%7D");
    if (!response.ok) throw new Error("Kunne ikke hente filmen");
    const film = await response.json();
    resultat.textContent = film.tittel;
  } catch (error) {
    resultat.textContent = "Noe gikk galt: " + error.message;
  }
}
document.querySelector("button").addEventListener("click", hentFilm);