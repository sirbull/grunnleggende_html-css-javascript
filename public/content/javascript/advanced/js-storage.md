:::step {"id":"concept","caption":"Gjør et enkelt objekt om til tekst, lagre det og les det tilbake."}
## Hva er JSON?

[[what-is-json|JSON]] står for JavaScript Object Notation. Det er et tekstformat for data som mange programmeringsspråk kan lese. Vi begynner med ett JavaScript-objekt, `innstilling`, med egenskapen `tema`. JSON-teksten og objektet er forskjellige typer verdier.
:::

:::step {"id":"format","caption":"Gjør et enkelt objekt om til tekst, lagre det og les det tilbake."}
## Gjør objektet om til tekst

[[js-json-stringify|JSON.stringify()]] tar en JavaScript-verdi og gir JSON-tekst. Første utskrift er:

```text
{"tema":"morkt"}
```

I JSON skrives både egenskapsnavn og tekstverdier med doble anførselstegn. JSON tillater ikke kommentarer eller et komma etter siste egenskap. `JSON.stringify` gjør formateringen for deg.
:::

:::step {"id":"storage","caption":"Gjør et enkelt objekt om til tekst, lagre det og les det tilbake."}
## Lagre teksten under en nøkkel

[[dom-storage|localStorage]] lagrer tekst under navn som kalles **nøkler**. `setItem("innstilling", tekst)` lagrer teksten under nøkkelen `innstilling`. `getItem("innstilling")` henter teksten fra samme nøkkel.

I resultatvinduet er dette et **midlertidig minnelager**. Det tømmes hver gang koden kjøres på nytt. På en egen vanlig nettside kan localStorage beholde teksten mellom besøk i samme nettleser.
:::

:::step {"id":"mechanism","caption":"Gjør et enkelt objekt om til tekst, lagre det og les det tilbake."}
## Les teksten tilbake som data

[[js-json-parse|JSON.parse()]] gjør JSON-teksten om til en JavaScript-verdi igjen. Her får `lest` et objekt, og `lest.tema` skriver `morkt`.

Lesingen og lagringen står i try/catch, som du kjenner fra forrige leksjon. Ugyldig JSON kan gi en feil, og en nettleser kan nekte tilgang til lagring. Hvis nøkkelen mangler, gir `getItem` verdien `null`; sjekk dette før du bruker data på en egen side.
:::

:::step {"id":"practice","caption":"Gjør et enkelt objekt om til tekst, lagre det og les det tilbake."}
## Endre én egenskap og følg den

Her er `"morkt"` byttet med `"lyst"` i objektet øverst. Forutsi begge utskrifter før du åpner **Resultat**. JSON-teksten og `lest.tema` har begge den nye verdien: `{"tema":"lyst"}` og `lyst`.

**Stopp og forklar:** Hvorfor bruker vi stringify før lagring og parse etter lesing?

**Svar:** Lageret tar imot tekst. Stringify gir tekst fra data, og parse gir data fra teksten. Ikke lagre passord eller hemmeligheter i localStorage.

```js example
const innstilling = { tema: "lyst" };
const tekst = JSON.stringify(innstilling);
console.log(tekst);
try {
  localStorage.setItem("innstilling", tekst);
  const lagretTekst = localStorage.getItem("innstilling");
  const lest = JSON.parse(lagretTekst);
  console.log(lest.tema);
} catch (error) {
  console.log("Kunne ikke lagre eller lese: " + error.message);
}
```
:::
