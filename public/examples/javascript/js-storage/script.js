const innstilling = { tema: "morkt" };
const tekst = JSON.stringify(innstilling);
console.log(tekst);
try {
  localStorage.setItem("innstilling", tekst);
  const lagretTekst = localStorage.getItem("innstilling");
  const lest = JSON.parse(lagretTekst);
  console.log(lest.tema);
} catch (error) {
  console.log("Kunne ikke lagre eller lese: " + error.message);
}
