:::step {"id":"note","caption":"Skill mellom instruksjoner og notater til den som leser."}
## Kode kan ha notater

En **kommentar** er tekst til mennesker som leser koden. JavaScript utfører den ikke. To skråstreker, `//`, gjør resten av linjen til en kommentar.
:::

:::step {"id":"read","caption":"Skill mellom instruksjoner og notater til den som leser."}
## Les begge linjene

Den første linjen forklarer noe. Den andre er instruksjonen du kjenner. Konsollen viser bare `Hei!`, fordi kommentarlinjen hoppes over.
:::

:::step {"id":"practice","caption":"Skill mellom instruksjoner og notater til den som leser."}
## Skriv ditt eget notat

Her er kommentaren byttet med `// Min første beskjed`. Utskriften i **Resultat** er fortsatt `Hei!`. Kommentaren endrer ikke det programmet gjør.

```js example
// Min første beskjed
console.log("Hei!");
```
:::

:::step {"id":"disable","caption":"Skill mellom instruksjoner og notater til den som leser."}
## Slå av en instruksjon

Her står `//` også foran `console.log`-linjen. Åpne **Resultat**: nå skrives ingen beskjed, og det kommer ingen konsoll under resultatvinduet. Hele linjen er blitt et notat.

Prøv det selv, og fjern de to skråstrekene igjen for å få beskjeden tilbake.

```js example
// Denne linjen er et notat.
// console.log("Hei!");
```
:::

:::step {"id":"check","caption":"Skill mellom instruksjoner og notater til den som leser."}
## Sjekk forskjellen

**Stopp og forklar:** Hva er forskjellen på en kommentar og teksten inni `console.log`?

**Svar:** Kommentaren er et notat som hoppes over. Teksten inni `console.log` blir skrevet når instruksjonen kjører.
:::
