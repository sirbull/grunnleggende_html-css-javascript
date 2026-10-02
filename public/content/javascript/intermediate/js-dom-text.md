:::step {"id":"bridge","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Nå bruker vi selve nettsiden

Hittil har svarene vært i konsollen. Nå skal programmet endre tekst på en nettside. Du trenger bare ett HTML-element: `<p id="resultat">Venter.</p>`. Les om HTML-elementer først hvis dette er ukjent.

Nettleseren bygger en modell av HTML-innholdet som JavaScript kan bruke. Den kalles [[dom|DOM]].

:::example html
:::

:::step {"id":"find","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Finn avsnittet

`document` gir tilgang til dokumentet. [[dom-queryselector|querySelector()]] finner første element som passer til uttrykket i parentes. `"#resultat"` betyr elementet med `id="resultat"`. Elementet lagres i variabelen `resultat`.

Punktumet i `document.querySelector` lar oss bruke en metode på dokumentet. Her kan du tenke på en metode som en funksjon som hører til et objekt.
:::

:::step {"id":"text","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Gi elementet en ny tekst

[[dom-textcontent|textContent]] er elementets tekstinnhold. Andre linje tilordner en ny tekst til denne egenskapen. Den vises i resultatvinduet. Dette er fortsatt tilordning med `=`, slik du kjenner fra variabler.
:::

:::step {"id":"practice","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Endre bare beskjeden

Her er teksten i JavaScript byttet med en annen beskjed. Åpne **Resultat** og se den nye teksten. Åpne så **HTML**-fanen: der står fortsatt `Venter.`. Programmet endrer modellen nettleseren viser, ikke kildekoden i HTML-filen.

```js example
const resultat = document.querySelector("#resultat");
resultat.textContent = "Denne teksten kommer fra JavaScript.";
```
:::

:::step {"id":"missing","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Når elementet ikke finnes

En selektor uten treff gir `null`, som betyr «ingen verdi» her. Her er `#resultat` byttet med `#finnes-ikke`. Åpne **Resultat**: avsnittet viser fortsatt `Venter.`, og konsollen viser en feil, for eksempel `Cannot set properties of null`. Andre linje feiler fordi `null` ikke er et element med `textContent`.

```js example
const resultat = document.querySelector("#finnes-ikke");
resultat.textContent = "Hei fra JavaScript!";
```
:::

:::step {"id":"guard","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Sjekk før du bruker elementet

Du kan håndtere dette med en betingelse før du bruker elementet. Her står tilordningen inni en if-setning som spør om `resultat` er noe annet enn `null`. Selektoren er fortsatt feil, så blokken hoppes over. Åpne **Resultat**: ingen feil, og avsnittet viser fortsatt `Venter.`.

Rett selektoren til `#resultat` i kodeverkstedet. Da kjører blokken, og teksten endres.

```js example
const resultat = document.querySelector("#finnes-ikke");
if (resultat !== null) {
  resultat.textContent = "Hei fra JavaScript!";
}
```
:::

:::step {"id":"check","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Skill mellom de to jobbene

**Stopp og forklar:** Hvilken linje finner elementet, og hvilken endrer teksten?

**Svar:** `querySelector` finner det. Tilordningen til `textContent` endrer teksten. Begynn med én av disse jobbene når du leter etter en feil.
:::
