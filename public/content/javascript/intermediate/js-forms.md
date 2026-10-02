:::step {"id":"before","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Bygg på hendelser

Du kan finne elementer, lage en funksjon og registrere en lytter. Her lytter vi på skjemaets `submit`, som betyr at brukeren prøver å sende det inn. HTML-fanen ved siden av viser skjemaet: feltet har en ledetekst, og skjemaet har en knapp.

:::example html
:::

:::step {"id":"event","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Nettleseren sender et argument

Når hendelsen skjer, kaller nettleseren `hils` med et hendelsesobjekt. Parameteren `event` tar imot det, slik `navn` tok imot et argument i parameterleksjonen.
:::

:::step {"id":"prevent","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Behandle innsendingen her

`event.preventDefault()` hindrer skjemaets vanlige innsending og navigasjon. Det lar dette eksempelet behandle innholdet på samme side. Vi sender ingen data til en server.
:::

:::step {"id":"value","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Les det som er skrevet

`felt.value` er teksten i feltet når funksjonen kjører. Den lagres i `navn`. Siste linje i funksjonen setter sammen hilsenen og viser den i avsnittet.
:::

:::step {"id":"practice","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Prøv knappen og Enter

Skriv `Ada` og trykk knappen. Du skal se `Hei, Ada!`. Endre teksten til `Bo` og trykk Enter i feltet. Hilsenen endres. Lytteren står på skjemaet, så begge måtene virker.
:::

:::step {"id":"check","caption":"Ta imot ett felt og vis en hilsen ved innsending."}
## Forutsi et tomt felt

Tøm feltet og send inn.

**Svar:** Det står `Hei, !`, fordi feltets verdi er tom tekst. Dette eksempelet leser verdien uten å sjekke den. I neste leksjon legger du til ett valg for den tomme verdien.
:::
