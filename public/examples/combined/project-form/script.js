document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const navn = String(data.get("navn")).trim();
  document.querySelector("#resultat").textContent = navn ? `Takk, ${navn}. Skjemaet er prøvd lokalt; ingen data er sendt.` : "Skriv et fornavn med minst ett synlig tegn.";
});