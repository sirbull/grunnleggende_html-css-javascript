document.querySelector("select").addEventListener("change", (event) => {
  document.querySelector("#kort").className = "kort " + event.target.value;
});
