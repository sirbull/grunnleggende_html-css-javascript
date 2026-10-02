:::step {"id":"before","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Ikke alle kall skjer med en gang

Du kjenner callbacks og Promises. Her gir vi en callback til en Promise i stedet for til en klikklytter. Vi undersøker bare tre utskrifter, uten moduler eller DOM.
:::

:::step {"id":"promise","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Lag en Promise som er klar

`Promise.resolve()` gir her en Promise som allerede er oppfylt. `.then(skrivTo)` registrerer funksjonen som skal kalles når resultatet behandles. Funksjonen gis uten parenteser, slik du kjenner fra andre callbacks.
:::

:::step {"id":"sync","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Den vanlige koden fullføres først

Første linje skriver `1`. Funksjonen defineres, og callbacken registreres. Deretter kjøres siste linje og skriver `3`. Selv om Promisen er klar, avbryter callbacken ikke den vanlige koden som kjører nå.
:::

:::step {"id":"later","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Callbacken kjører etterpå

Når den synkrone koden er ferdig, behandles den ventende Promise-callbacken som en **mikrooppgave**. `skrivTo` skriver `2`. Resultatet er derfor `1`, `3`, `2`. Dette er én del av nettleserens kjørerekkefølge, ofte kalt event loop.
:::

:::step {"id":"practice","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Legg til én vanlig utskrift

Her står `console.log("4");` helt nederst. Forutsi før du åpner **Resultat**. Resultatet blir `1`, `3`, `4`, `2`, fordi også den nye synkrone linjen fullføres før callbacken.

```js example
console.log("1");
function skrivTo() {
  console.log("2");
}
Promise.resolve().then(skrivTo);
console.log("3");
console.log("4");
```
:::

:::step {"id":"check","caption":"Forutsi tre utskrifter fra synkron kode og en Promise."}
## Forklar rekkefølgen

**Stopp og forklar:** Hvorfor kommer 2 sist selv om then-linjen står før utskriften av 3?

**Svar:** Then registrerer en callback som kjører etter at den aktuelle synkrone koden er ferdig. Linjen kaller ikke skrivTo direkte.
:::
