:::step {"id":"concept","caption":"Hent data uten å stanse resten av siden.","trace":["Start forespørselen og vis Henter.","Vent på Response uten å blokkere siden.","Les JSON og bruk dataene.","Ved feil: gå til catch og vis en melding."],"traceActive":0}
## Hva lærer du?

En Promise representerer et resultat som kan komme senere. En async-funksjon returnerer alltid en Promise. await venter på resultatet inne i funksjonen, mens nettleseren kan håndtere andre oppgaver.
:::

:::step {"id":"mechanism","caption":"Hent data uten å stanse resten av siden.","trace":["Start forespørselen og vis Henter.","Vent på Response uten å blokkere siden.","Les JSON og bruk dataene.","Ved feil: gå til catch og vis en melding."],"traceActive":1}
## Fra handling til resultat

[[dom-fetch|fetch()]] gir først et Response-objekt. Deretter leser response.json innholdet. Sjekk response.ok og bruk try/catch for feil. Eksempelet henter en innebygd data-URL fordi eksterne kall er sperret i verkstedet. På en vanlig side kan URL-en være `filmer.json`.
:::

:::step {"id":"practice","caption":"JSON-parsingen feiler, og catch viser en forståelig feilmelding. HTTP-feil må kontrolleres særskilt med response.ok.","trace":["Start forespørselen og vis Henter.","Vent på Response uten å blokkere siden.","Les JSON og bruk dataene.","Ved feil: gå til catch og vis en melding."],"traceActive":3}
## Prøv selv

Klikk for å hente. Endre data-URL-en til `data:application/json,ugyldig` og prøv igjen.

**Dette skal du se:** JSON-parsingen feiler, og catch viser en forståelig feilmelding. HTTP-feil må kontrolleres særskilt med response.ok.
:::
