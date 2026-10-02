:::step {"id":"known","caption":"Bruk en if-setning før du viser hilsenen."}
## Samme skjema, ett nytt valg

Dette er skjemaet fra forrige leksjon. Den nye jobben er å velge en hjelpetekst når navnet er tomt. Først rydder vi bort mellomrom på utsiden av teksten.
:::

:::step {"id":"trim","caption":"Bruk en if-setning før du viser hilsenen."}
## Rydd før du sammenligner

`felt.value.trim()` leser teksten og fjerner blanke tegn først og sist. `trim()` er en metode på teksten. `" Ada "` blir `"Ada"`. Bare mellomrom blir tom tekst, `""`.
:::

:::step {"id":"if","caption":"Bruk en if-setning før du viser hilsenen."}
## Spør om teksten er tom

`navn === ""` sammenligner navnet med tom tekst. Hvis svaret er `true`, vises `Skriv et navn først.`. Ellers vises hilsenen. Det er samme if/else du brukte i konsollen.
:::

:::step {"id":"practice","caption":"Bruk en if-setning før du viser hilsenen."}
## Test tre ulike inndata

Send inn et tomt felt, et felt med bare mellomrom og til slutt ` Ada ` med mellomrom rundt. De to første skal gi hjelpeteksten. Den siste skal gi `Hei, Ada!`.
:::

:::step {"id":"check","caption":"Bruk en if-setning før du viser hilsenen."}
## Tekst fra felt er fortsatt tekst

Hvis du lager et tallfelt senere, gir `value` fortsatt tekst. `Number("2")` gjør teksten `"2"` om til tallet `2`. Her står `console.log(Number("2") + 3);` nederst i koden. Åpne **Resultat**: konsollen under skjemaet viser `5`, ikke `23`.

**Stopp og forklar:** Hva gjør `trim`, og hva gjør if-setningen?

**Svar:** `trim` rydder teksten. If-setningen velger beskjed ut fra om den ryddede teksten er tom.

```js example
const skjema = document.querySelector("form");
const felt = document.querySelector("#navn");
const resultat = document.querySelector("#resultat");
function hils(event) {
  event.preventDefault();
  const navn = felt.value.trim();
  if (navn === "") {
    resultat.textContent = "Skriv et navn først.";
  } else {
    resultat.textContent = "Hei, " + navn + "!";
  }
}
skjema.addEventListener("submit", hils);
console.log(Number("2") + 3);
```
:::
