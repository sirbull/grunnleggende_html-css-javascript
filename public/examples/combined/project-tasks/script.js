let oppgaver = [];
try { const lagret = JSON.parse(localStorage.getItem("oppgaver")); if (Array.isArray(lagret)) oppgaver = lagret.filter(o => typeof o.id === "string" && typeof o.tekst === "string"); } catch {}
function render() {
  const liste = document.querySelector("ul");
  liste.replaceChildren();
  for (const oppgave of oppgaver) {
    const li = document.createElement("li");
    const knapp = document.createElement("button");
    knapp.textContent = `Fullfør ${oppgave.tekst}`;
    knapp.addEventListener("click", () => { oppgaver = oppgaver.filter(o => o.id !== oppgave.id); render(); document.querySelector("input").focus(); });
    li.append(oppgave.tekst + " ", knapp); liste.append(li);
  }
  try { localStorage.setItem("oppgaver", JSON.stringify(oppgaver)); } catch {}
  document.querySelector("#resultat").textContent = `${oppgaver.length} oppgaver igjen`;
}
document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault(); const input = document.querySelector("input");
  if (!input.value.trim()) return;
  oppgaver.push({ id: crypto.randomUUID(), tekst: input.value.trim() });
  input.value = ""; render(); input.focus();
});
render();