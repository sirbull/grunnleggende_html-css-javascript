:::step {"id":"concept","caption":"Behold små innstillinger mellom besøk.","traceActive":-1}
## Hva lærer du?

[[dom-storage|localStorage]] lagrer tekst under en nøkkel. Bruk JSON.stringify for å gjøre et objekt til tekst, og JSON.parse for å lese det tilbake. Lagringen er knyttet til nettstedets origin, ikke til brukerens konto.
:::

:::step {"id":"mechanism","caption":"Behold små innstillinger mellom besøk.","traceActive":-1}
## Fra handling til resultat

Tilgang kan feile eller være sperret. Bruk try/catch og en standardverdi. I det isolerte resultatvinduet brukes et midlertidig minnelager: verdiene forsvinner når koden kjøres på nytt. Appens egne innstillinger og kode lagres derimot varig i hovedsidens nettleserlager.
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
