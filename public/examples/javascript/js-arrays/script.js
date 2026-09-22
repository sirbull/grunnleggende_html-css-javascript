const filmer = [
  { tittel: "Skogsturen", aar: 2024 },
  { tittel: "Ved havet", aar: 2025 }
];
filmer.push({ tittel: "Hjemreisen", aar: 2026 });
document.querySelector("#resultat").textContent = `${filmer[0].tittel}. Antall filmer: ${filmer.length}`;