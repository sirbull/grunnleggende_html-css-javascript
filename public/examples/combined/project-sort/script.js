const boker = [
  { tittel: "Øya", sider: 210 },
  { tittel: "Skogsturen", sider: 140 },
  { tittel: "Årstider", sider: 95 },
];
function vis() {
  const type = document.querySelector("select").value;
  const sortert = [...boker].sort((a, b) =>
    type === "navn"
      ? a.tittel.localeCompare(b.tittel, "nb")
      : a.sider - b.sider,
  );
  const liste = document.querySelector("ul");
  liste.replaceChildren();
  for (const bok of sortert) {
    const li = document.createElement("li");
    li.textContent = `${bok.tittel} · ${bok.sider} sider`;
    liste.append(li);
  }
  document.querySelector("#resultat").textContent =
    `${sortert.length} bøker sortert`;
}
document.querySelector("select").addEventListener("change", vis);
vis();
