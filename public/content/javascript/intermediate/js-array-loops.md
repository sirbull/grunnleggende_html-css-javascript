:::step {"id":"each","caption":"Bruk for...of til å lese hver verdi uten å lage HTML."}
## Én runde for hver verdi

Du har brukt løkker med en teller. **for...of** er en annen form som går gjennom verdiene i en liste. Her blir det tre runder fordi listen har tre navn.
:::

:::step {"id":"read","caption":"Bruk for...of til å lese hver verdi uten å lage HTML."}
## Les løkkelinjen

`for (const person of navn)` kan leses som «for hver person i navn-listen». Ved hver runde lages en lokal variabel `person` med neste verdi. Den skal ikke oppdateres med `person = person + 1`.
:::

:::step {"id":"follow","caption":"Bruk for...of til å lese hver verdi uten å lage HTML."}
## Følg verdiene

Første runde får `person` verdien `Ada` og skriver den. Neste runde får `Bo`. Siste får `Cleo`. Når listen er ferdig, avsluttes løkken. `const` gjelder variabelen i hver enkelt runde.
:::

:::step {"id":"practice","caption":"Bruk for...of til å lese hver verdi uten å lage HTML."}
## Utvid listen

Legg til `"Dina"` sist i listen. Forutsi og kjør. Du får fire utskrifter selv om løkkeblokken er uendret. Bytt så utskriften med `console.log("Hei, " + person);`.
:::

:::step {"id":"check","caption":"Bruk for...of til å lese hver verdi uten å lage HTML."}
## Sjekk hva som gjentas

**Stopp og forklar:** Hvorfor trenger denne løkken ingen egen teller eller stoppgrense?

**Svar:** Den følger verdiene i listen og stopper når alle er besøkt. Bruk en vanlig for-løkke når du trenger selve plassnummeret.
:::
