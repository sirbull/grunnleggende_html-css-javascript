:::step {"id":"concept","caption":"JSON er tekst som beskriver data. localStorage kan ta vare på teksten mellom besøk.","traceActive":-1}
## Hva er JSON?

[[what-is-json|JSON]] står for JavaScript Object Notation. Det er et tekstformat for å lagre og utveksle data, for eksempel mellom en nettside og en tjeneste. Selv om navnet kommer fra JavaScript, kan mange språk lese JSON. En JSON-tekst er ikke det samme som et JavaScript-objekt.
:::

:::step {"id":"format","caption":"Dobbelte anførselstegn og gyldige verdier gjør teksten lesbar for JSON.parse().","traceActive":-1}
## Slik ser JSON ut

```json
{
  "tema": "mørkt",
  "skriftstorrelse": 18,
  "varsler": true,
  "emner": ["HTML", "CSS"]
}
```

JSON kan inneholde tekst, tall, `true`, `false`, `null`, lister og objekter. Navnene og tekstverdiene skrives med doble anførselstegn. Kommentarer og komma etter siste verdi er ikke gyldig JSON.
:::

:::step {"id":"storage","caption":"Behold små innstillinger mellom besøk.","traceActive":-1}
## Fra JSON til lokal lagring

[[dom-storage|localStorage]] lagrer tekst under en nøkkel. [[js-json-stringify|JSON.stringify()]] gjør et JavaScript-objekt om til JSON-tekst før lagring. [[js-json-parse|JSON.parse()]] leser teksten tilbake som en JavaScript-verdi. Lagringen er knyttet til nettstedets origin, ikke til brukerens konto.
:::

:::step {"id":"mechanism","caption":"Behold små innstillinger mellom besøk.","traceActive":-1}
## Fra handling til resultat

Tilgang kan feile eller være sperret. Ugyldig JSON får også `JSON.parse()` til å kaste en feil. Bruk `try/catch` og en standardverdi. I det isolerte resultatvinduet brukes et midlertidig minnelager: verdiene forsvinner når koden kjøres på nytt. Appens egne innstillinger og kode lagres derimot varig i hovedsidens nettleserlager.
:::

:::step {"id":"code","caption":"Behold små innstillinger mellom besøk.","traceActive":-1}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"Verdien lagres som JSON-tekst. Ikke lagre passord eller hemmeligheter i localStorage; JavaScript på samme origin kan lese det.","traceActive":-1}
## Prøv selv

Veksle tema og se den lagrede teksten med console.log(localStorage.getItem("innstilling")). Kjør samme eksempel på en egen side for å teste varig lagring.

**Dette skal du se:** Verdien lagres som JSON-tekst. Ikke lagre passord eller hemmeligheter i localStorage; JavaScript på samme origin kan lese det.
:::
