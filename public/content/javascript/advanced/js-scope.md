:::step {"id":"area","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Navn har et område

**Scope** betyr området der et variabelnavn er tilgjengelig. Med `let` og `const` avgrenser en kodeblokk sitt eget område. Dette forklarer hvorfor et navn noen ganger ikke blir funnet.
:::

:::step {"id":"outer","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Et navn utenfor blokken

`navn` lages utenfor if-blokken. Kode inni blokken kan lese det. `if (true)` kjører alltid blokken her; vi bruker det for å undersøke området uten flere valg.
:::

:::step {"id":"inner","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Et navn inni blokken

`beskjed` lages inni blokken. Utskriften inni samme blokk kan lese det og skriver `Hei, Ada`. Etter blokken er bare `navn` tilgjengelig av disse to navnene.
:::

:::step {"id":"practice","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Prøv å lese utenfor

Her står `console.log(beskjed);` helt nederst, utenfor blokken. Forutsi før du åpner **Resultat**. Først kommer de to vanlige utskriftene, deretter en feil: `beskjed is not defined`.

```js example
const navn = "Ada";
if (true) {
  const beskjed = "Hei, " + navn;
  console.log(beskjed);
}
console.log(navn);
console.log(beskjed);
```
:::

:::step {"id":"function","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Funksjoner har også et område

Parametere og variabler laget inne i en funksjon er lokale for den kjøringen. Her prøver siste linje å lese `tall` utenfor funksjonen `doble(tall)`. Åpne **Resultat**: kallet skriver `6`, og så kommer feilen `tall is not defined`.

```js example
function doble(tall) {
  return tall * 2;
}
console.log(doble(3));
console.log(tall);
```
:::

:::step {"id":"check","caption":"Skill mellom navn utenfor og inni en kodeblokk."}
## Forklar hva som er tilgjengelig

**Stopp og forklar:** Kan kode inne i blokken lese et navn fra området utenfor? Kan kode utenfor lese navnet som lages inni?

**Svar:** Ja til det første, nei til det andre i dette eksempelet.
:::
