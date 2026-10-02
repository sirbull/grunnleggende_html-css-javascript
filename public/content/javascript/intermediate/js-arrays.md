:::step {"id":"list","caption":"Les én verdi om gangen fra et array."}
## Ett navn på flere verdier

Et **array** er en ordnet liste med verdier. Her er de tre verdiene tekst. Hakeparentesene `[` og `]` avgrenser listen, og komma skiller verdiene.
:::

:::step {"id":"index","caption":"Les én verdi om gangen fra et array."}
## Plassene telles fra null

`navn[0]` henter verdien på første plass: `Ada`. Plassnummeret kalles en **indeks**. Her er indeksene 0 for Ada, 1 for Bo og 2 for Cleo.
:::

:::step {"id":"length","caption":"Les én verdi om gangen fra et array."}
## Finn antallet

`navn.length` gir antall verdier i listen, som er `3`. Punktumet brukes her til å lese egenskapen `length` på arrayet. Antallet og siste indeks er forskjellige: siste indeks er `2`.
:::

:::step {"id":"practice","caption":"Les én verdi om gangen fra et array."}
## Les en annen plass

Her er `navn[0]` byttet med `navn[1]`, og `"Dina"` står sist i selve listen. Forutsi før du åpner **Resultat**. Første utskrift blir `Bo`. Lengden blir `4`, og Dina har indeks `3`.

```js example
const navn = ["Ada", "Bo", "Cleo", "Dina"];
console.log(navn[1]);
console.log(navn.length);
```
:::

:::step {"id":"change","caption":"Les én verdi om gangen fra et array."}
## Legg til mens programmet kjører

Her er listen øverst som i originalen, men `navn.push("Dina");` står rett før utskriftene. `push(...)` legger en ny verdi sist i listen mens programmet kjører. Første utskrift er fortsatt `Ada`, men lengden blir `4`.

`const` hindrer at variabelen tilordnes en annen liste. Det hindrer ikke at innholdet i den samme listen endres.

```js example
const navn = ["Ada", "Bo", "Cleo"];
navn.push("Dina");
console.log(navn[0]);
console.log(navn.length);
```
:::

:::step {"id":"check","caption":"Les én verdi om gangen fra et array."}
## Sjekk indeks og lengde

**Stopp og forklar:** Hvilken indeks har siste verdi når listen har fire verdier?

**Svar:** `3`, fordi vi starter på null. Koden ved siden av henter siste verdi med `navn[navn.length - 1]`. Lengden er `4`, så uttrykket blir `navn[3]`, som er `Dina`.

```js example
const navn = ["Ada", "Bo", "Cleo"];
navn.push("Dina");
console.log(navn.length);
console.log(navn[navn.length - 1]);
```
:::
