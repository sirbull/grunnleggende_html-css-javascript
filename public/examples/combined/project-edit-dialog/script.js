const prosjekt = { navn: "Filmside", tekst: "En samling anbefalinger." };
const dialog = document.querySelector("dialog"),
  apner = document.querySelector("#rediger");
apner.onclick = () => {
  document.querySelector("#nytt-navn").value = prosjekt.navn;
  document.querySelector("#ny-tekst").value = prosjekt.tekst;
  dialog.showModal();
};
document.querySelector("#avbryt").onclick = () => dialog.close();
dialog.addEventListener("close", () => apner.focus());
dialog.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  const navn = document.querySelector("#nytt-navn").value.trim();
  if (!navn) {
    document
      .querySelector("#nytt-navn")
      .setCustomValidity("Skriv et navn med synlige tegn.");
    document.querySelector("#nytt-navn").reportValidity();
    return;
  }
  prosjekt.navn = navn;
  prosjekt.tekst = document.querySelector("#ny-tekst").value.trim();
  document.querySelector("#navn").textContent = prosjekt.navn;
  document.querySelector("#beskrivelse").textContent = prosjekt.tekst;
  dialog.close();
  document.querySelector("#status").textContent = "Prosjektet er oppdatert.";
};
document.querySelector("#nytt-navn").oninput = (event) =>
  event.target.setCustomValidity("");
