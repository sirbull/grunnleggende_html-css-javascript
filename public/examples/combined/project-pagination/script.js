const prosjekter = [
  "Filmside",
  "Turguide",
  "Matblogg",
  "Quiz",
  "Profilkort",
  "Bildevelger",
  "Budsjett",
  "Handlekurv",
];
let side = 0;
const perSide = 3;
function vis() {
  const sok = document
    .querySelector("input")
    .value.toLocaleLowerCase("nb")
    .trim();
  const treff = prosjekter.filter((p) =>
    p.toLocaleLowerCase("nb").includes(sok),
  );
  const sider = Math.max(1, Math.ceil(treff.length / perSide));
  side = Math.min(side, sider - 1);
  const liste = document.querySelector("ul");
  liste.replaceChildren();
  for (const navn of treff.slice(side * perSide, (side + 1) * perSide)) {
    const li = document.createElement("li");
    li.textContent = navn;
    liste.append(li);
  }
  document.querySelector("#status").textContent =
    `${treff.length} treff. Side ${side + 1} av ${sider}.`;
  document.querySelector("#forrige").disabled = side === 0;
  document.querySelector("#neste").disabled = side === sider - 1;
}
document.querySelector("input").oninput = () => {
  side = 0;
  vis();
};
document.querySelector("#forrige").onclick = () => {
  side--;
  vis();
};
document.querySelector("#neste").onclick = () => {
  side++;
  vis();
};
vis();
