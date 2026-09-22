const kort = [...document.querySelectorAll("article")];
document.querySelector("input").addEventListener("input", event => {
  const sok = event.target.value.toLocaleLowerCase("nb").trim();
  let treff = 0;
  for (const element of kort) {
    element.hidden = !element.textContent.toLocaleLowerCase("nb").includes(sok);
    if (!element.hidden) treff++;
  }
  document.querySelector("#resultat").textContent = `${treff} prosjekter`;
});