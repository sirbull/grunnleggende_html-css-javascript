const navn = ["Ada", "Bo", "Cleo"];
const liste = document.querySelector("#navneliste");
for (const person of navn) {
  const punkt = document.createElement("li");
  punkt.textContent = person;
  liste.append(punkt);
}
