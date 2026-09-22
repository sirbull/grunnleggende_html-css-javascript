const standard = { tema: "lyst" };
let innstilling = standard;
try { innstilling = JSON.parse(localStorage.getItem("innstilling")) || standard; } catch {}
const resultat = document.querySelector("#resultat");
resultat.textContent = innstilling.tema;
document.querySelector("button").addEventListener("click", () => {
  innstilling.tema = innstilling.tema === "lyst" ? "mørkt" : "lyst";
  try { localStorage.setItem("innstilling", JSON.stringify(innstilling)); } catch {}
  resultat.textContent = innstilling.tema;
});