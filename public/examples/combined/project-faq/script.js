const bokser = [...document.querySelectorAll("details")];
for (const boks of bokser) {
  boks.addEventListener("toggle", () => {
    if (boks.open)
      bokser.forEach((annen) => {
        if (annen !== boks) annen.open = false;
      });
  });
}
