:::step {"id":"group","caption":"Bruk et objekt til verdier som beskriver samme ting."}
## Verdier som hører sammen

Et **objekt** samler navngitte verdier. Her beskriver både tittelen og varigheten samme film. Vi samler dem under variabelnavnet `film`.
:::

:::step {"id":"syntax","caption":"Bruk et objekt til verdier som beskriver samme ting."}
## Navn og verdi skilles med kolon

Krøllparentesene avgrenser objektet. `tittel: "Skogsturen"` lager en **egenskap** med navnet `tittel` og verdien `Skogsturen`. Komma skiller egenskapene. Her beskriver krøllparentesene data; etter `if` og `function` avgrenser de kodeblokker.
:::

:::step {"id":"read","caption":"Bruk et objekt til verdier som beskriver samme ting."}
## Hent en egenskap med punktum

`film.tittel` betyr «hent egenskapen tittel fra film». `film.minutter` henter tallet `90`. Konsollen viser `Skogsturen` og `90` på hver sin linje.
:::

:::step {"id":"practice","caption":"Bruk et objekt til verdier som beskriver samme ting."}
## Endre én egenskap

Her er `minutter` endret til `100`, og objektet har fått en ny egenskap: `ar: 2026`. Legg merke til kommaet etter `100`, som skiller egenskapene. Siste linje skriver `film.ar`. Åpne **Resultat**: konsollen viser `Skogsturen`, `100` og `2026`.

```js example
const film = {
  tittel: "Skogsturen",
  minutter: 100,
  ar: 2026
};
console.log(film.tittel);
console.log(film.minutter);
console.log(film.ar);
```
:::

:::step {"id":"check","caption":"Bruk et objekt til verdier som beskriver samme ting."}
## Objekt eller liste?

**Stopp og forklar:** Hva er forskjellen på `film.tittel` og `navn[0]` fra array-leksjonen?

**Svar:** Objektet bruker et egenskapsnavn. Arrayet bruker et plassnummer. Et array kan også inneholde objekter, men prøv først å lese ett objekt trygt.
:::
