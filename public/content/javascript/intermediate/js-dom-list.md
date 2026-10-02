:::step {"id":"known","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## En kjent løkke med en ny jobb

Du har brukt for...of til å skrive hvert navn i konsollen. Nå lager hver runde ett listepunkt på nettsiden. HTML-filen inneholder en tom `<ul>` med `id="navneliste"`.

:::example html
:::

:::step {"id":"create","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Lag ett element

`document.createElement("li")` lager et nytt listepunktelement. Navnet `li` skrives uten `<` og `>`. Elementet lagres i `punkt`. Det er ikke synlig ennå, fordi det ikke er lagt inn i dokumentet.
:::

:::step {"id":"text","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Fyll elementet med tekst

`punkt.textContent = person;` gir det nye elementet navnet fra denne runden. Første runde gir teksten `Ada`. Dette er samme `textContent` som du brukte på et eksisterende avsnitt.
:::

:::step {"id":"append","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Legg elementet inn i listen

`liste.append(punkt);` legger det ferdige punktet sist i listen. Først nå blir det synlig. Neste runde lager et nytt element, fyller det med `Bo` og legger det etter Ada.
:::

:::step {"id":"practice","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Legg til en verdi

Her står `"Dina"` sist i arrayet. Åpne **Resultat**: listen har fire punkter, uten at løkken er endret.

```js example
const navn = ["Ada", "Bo", "Cleo", "Dina"];
const liste = document.querySelector("#navneliste");
for (const person of navn) {
  const punkt = document.createElement("li");
  punkt.textContent = person;
  liste.append(punkt);
}
```
:::

:::step {"id":"no-append","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Uten append

Her står `//` foran `liste.append(punkt);`. Åpne **Resultat**: listen er tom, selv om elementene blir laget og fylt med tekst i løkken. Et element som ikke er lagt inn i dokumentet, vises ikke.

Prøv selv i kodeverkstedet, og sett linjen tilbake etterpå.

```js example
const navn = ["Ada", "Bo", "Cleo"];
const liste = document.querySelector("#navneliste");
for (const person of navn) {
  const punkt = document.createElement("li");
  punkt.textContent = person;
  // liste.append(punkt);
}
```
:::

:::step {"id":"check","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Forklar de tre jobbene

**Stopp og forklar:** Hva gjør `createElement`, `textContent` og `append`?

**Svar:** De lager elementet, fyller det med tekst og setter det inn i dokumentet. Løkken gjentar disse jobbene for hver verdi.
:::
