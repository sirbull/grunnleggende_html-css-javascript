const dialog = document.querySelector("dialog");
const apne = document.querySelector("#apne");
apne.addEventListener("click", () => dialog.showModal());
dialog.addEventListener("close", () => apne.focus());