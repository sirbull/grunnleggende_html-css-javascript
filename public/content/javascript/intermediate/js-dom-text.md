:::step {"id":"bridge","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Nå bruker vi selve nettsiden

Hittil har svarene vært i konsollen. Nå skal programmet endre tekst på en nettside. Du trenger bare ett HTML-element: `<p id="resultat">Venter.</p>`. Les om HTML-elementer først hvis dette er ukjent.

Nettleseren bygger en modell av HTML-innholdet som JavaScript kan bruke. Den kalles [[dom|DOM]].
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

Bytt teksten i JavaScript til din egen beskjed og kjør. Åpne HTML-fanen etterpå: der står fortsatt `Venter.`. Programmet endrer modellen nettleseren viser, ikke kildekoden i HTML-filen.
:::

:::step {"id":"missing","caption":"Koble JavaScript til ett avsnitt på nettsiden."}
## Når elementet ikke finnes

En selektor uten treff gir `null`, som betyr «ingen verdi» her. Bytt `#resultat` med `#finnes-ikke` og kjør. Andre linje gir en feil fordi `null` ikke er et element med `textContent`. Sett selektoren tilbake.

Du kan håndtere dette med en betingelse før du bruker elementet:

```js
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
