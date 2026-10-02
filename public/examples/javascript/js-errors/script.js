try {
  console.log(ukjentNavn);
} catch (error) {
  console.log("Kunne ikke lese verdien.");
  console.log(error.message);
}
console.log("Programmet fortsetter.");
