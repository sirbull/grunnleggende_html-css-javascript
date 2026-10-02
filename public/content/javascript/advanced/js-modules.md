:::step {"id":"files","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil."}
## Én fil kan få ett ansvar

En **modul** er en JavaScript-fil som kan dele funksjoner og verdier med andre filer. Det er nyttig når et program blir større. Vi begynner med den kjente funksjonen `doble`, uten å blande inn kjørerekkefølge eller nye beregninger.
:::

:::step {"id":"export","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil."}
## Gjør funksjonen tilgjengelig

`export` foran funksjonsdeklarasjonen gjør funksjonen tilgjengelig for andre moduler. Selve funksjonen er ellers den samme: den returnerer argumentet ganger to. Eksempelet skriver `6` fra et kall i samme modul.
:::

:::step {"id":"import","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil."}
## Bruk den fra en annen fil

På en egen side kan funksjonen ligge i `regning.js`. Da kan `script.js` hente den slik:

```js
import { doble } from "./regning.js";
console.log(doble(3));
```

Navnet inni krøllparentesene må matche eksporten. `./` betyr at filen ligger i samme mappe. Kallet gir `6`, akkurat som før.
:::

:::step {"id":"html","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil.","example":false}
## Be nettleseren bruke moduler

På din egen HTML-side laster du hovedfilen med `<script type="module" src="script.js"></script>`. Nettleseren følger importene fra den. I kodeverkstedet kjøres JavaScript allerede som modul, men du kan ikke legge til en separat regning.js-fil her.
:::

:::step {"id":"practice","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil."}
## Prøv det som er tilgjengelig her

Her er kallet endret til `doble(4)`. Åpne **Resultat**: det står `8`. Hvis du har et eget prosjekt med lokal webserver, flytt funksjonsdeklarasjonen til `regning.js` og bruk importen i `script.js`. Ikke ta med utskriftslinjen i regning.js.

```js example
export function doble(tall) {
  return tall * 2;
}
console.log(doble(4));
```
:::

:::step {"id":"check","caption":"Skill mellom å eksportere en funksjon og å importere den i en annen fil."}
## Forklar forbindelsen

**Stopp og forklar:** Hvilken fil bruker export, og hvilken bruker import?

**Svar:** Filen som tilbyr funksjonen bruker export. Filen som trenger den bruker import. Modulene har egne områder for navn.
:::
