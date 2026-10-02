:::step {"id":"fixed","caption":"Velg const når variabelen ikke skal få en ny verdi."}
## En verdi som skal beholdes

[[js-const|const]] lager en variabel, slik `let` gjør. Forskjellen er at du ikke kan tilordne en ny verdi til en `const`-variabel. Her skal `pris` være `40` gjennom hele programmet.
:::

:::step {"id":"read","caption":"Velg const når variabelen ikke skal få en ny verdi."}
## Les den som før

`console.log(pris);` virker på samme måte som med `let`. Det skriver `40`. Du må gi variabelen en verdi på linjen der du lager den med `const`.
:::

:::step {"id":"practice","caption":"Velg const når variabelen ikke skal få en ny verdi."}
## Prøv en ny tilordning

Her står `pris = 50;` nederst. Åpne **Resultat**. Konsollen skriver først `40`, og så kommer en feilmelding. I Chrome står det `Assignment to constant variable.` Meldingen betyr at en `const`-variabel ikke kan få en ny verdi.

Utskriften på linjen før kjørte som vanlig. Programmet stoppet på linjen som prøvde å bytte verdien.

```js example
const pris = 40;
console.log(pris);
pris = 50;
```
:::

:::step {"id":"choose","caption":"Velg const når variabelen ikke skal få en ny verdi.","example":false}
## Velg mellom let og const

Bruk [[js-let|let]] for en teller som skal oppdateres. Bruk `const` for en verdi som ikke skal byttes ut. Du kan fortsatt redigere `40` til `50` i kildekoden og kjøre på nytt: da starter et nytt program med en ny startverdi.
:::

:::step {"id":"check","caption":"Velg const når variabelen ikke skal få en ny verdi.","example":false}
## Sjekk valget ditt

**Stopp og forklar:** Ville du brukt `let` eller `const` for `poeng` som øker mens programmet kjører?

**Svar:** `let`, fordi variabelen skal få nye verdier. For listene og objektene vi lærer senere, handler `const` fortsatt om tilordning til selve variabelen.
:::
