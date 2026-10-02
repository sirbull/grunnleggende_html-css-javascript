:::step {"id":"known","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Du har gitt en funksjon til en lytter

I hendelsesleksjonen sendte du `visHilsen` til `addEventListener`. En funksjon kan være et argument, akkurat som tekst og tall. Vi undersøker det her uten nettsiden.
:::

:::step {"id":"parameter","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Ta imot en funksjon

`gjorToGanger(jobb)` tar imot en funksjon i parameteren `jobb`. `jobb();` kaller den. Siden instruksjonen står to ganger, kalles funksjonen to ganger.
:::

:::step {"id":"call","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Gi funksjonen uten å kalle den

`gjorToGanger(siHei)` sender selve funksjonen. Inni `gjorToGanger` kalles den og skriver `Hei!` to ganger. Dette er en callback. Den kan kjøres med en gang, som her, eller senere, som ved et klikk.
:::

:::step {"id":"practice","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Bytt jobben

Her er det laget en ny funksjon, `siHaDet`, som skriver `Ha det!`. Bare argumentet i siste linje er byttet til `siHaDet`. Åpne **Resultat**: nå kommer den nye beskjeden to ganger.

```js example
function siHei() {
  console.log("Hei!");
}
function siHaDet() {
  console.log("Ha det!");
}
function gjorToGanger(jobb) {
  jobb();
  jobb();
}
gjorToGanger(siHaDet);
```
:::

:::step {"id":"arrow","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Kjenn igjen en pilfunksjon

En **pilfunksjon** er en annen måte å skrive en funksjon på. Her er siste linje byttet med et kall som sender en pilfunksjon direkte som argument.

`() => { ... }` lager en funksjon uten parametere. Den har ikke noe eget navn. Åpne **Resultat**: `En ny jobb` skrives to ganger.

```js example
function siHei() {
  console.log("Hei!");
}
function gjorToGanger(jobb) {
  jobb();
  jobb();
}
gjorToGanger(() => {
  console.log("En ny jobb");
});
```
:::

:::step {"id":"check","caption":"Forstå en callback før du bruker en kortere funksjonsform."}
## Behold formen du forstår

**Stopp og forklar:** Hvem kaller callbacken i eksempelet?

**Svar:** `gjorToGanger`, på de to linjene med `jobb()`. Du kan bruke vanlige navngitte funksjoner til dette. Pilfunksjoner er ikke alltid utskiftbare med vanlige funksjoner, blant annet fordi de behandler `this` annerledes.
:::
