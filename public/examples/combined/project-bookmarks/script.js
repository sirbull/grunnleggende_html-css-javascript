let lenker = [];
function gyldig(url) {
  try {
    return ["https:", "http:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
}
try {
  const data = JSON.parse(localStorage.getItem("leseliste"));
  if (Array.isArray(data))
    lenker = data.filter(
      (x) =>
        typeof x.tittel === "string" &&
        typeof x.id === "string" &&
        gyldig(x.url),
    );
} catch {}
function vis() {
  const liste = document.querySelector("ul");
  liste.replaceChildren();
  for (const lenke of lenker) {
    const li = document.createElement("li"),
      a = document.createElement("a"),
      fjern = document.createElement("button");
    a.textContent = lenke.tittel;
    a.href = lenke.url;
    fjern.textContent = `Fjern ${lenke.tittel}`;
    fjern.onclick = () => {
      lenker = lenker.filter((x) => x.id !== lenke.id);
      vis();
      document.querySelector("#tittel").focus();
    };
    li.append(a, " ", fjern);
    liste.append(li);
  }
  try {
    localStorage.setItem("leseliste", JSON.stringify(lenker));
  } catch {
    document.querySelector("#status").textContent =
      "Listen vises, men kunne ikke lagres.";
  }
}
document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  const tittel = document.querySelector("#tittel").value.trim(),
    url = document.querySelector("#url").value.trim();
  if (!tittel || !gyldig(url)) {
    document.querySelector("#status").textContent =
      "Bruk en tittel og en http- eller https-adresse.";
    return;
  }
  lenker.push({ id: crypto.randomUUID(), tittel, url });
  vis();
  event.currentTarget.reset();
  document.querySelector("#tittel").focus();
  document.querySelector("#status").textContent = "Lenken er lagt til.";
};
vis();
