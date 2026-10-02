:::step {"id":"known","caption":"La programmet vise en beskjed når en operasjon feiler."}
## En feil kan oppstå under kjøring

Du har sett hva som skjer når et variabelnavn ikke finnes. Noen operasjoner kan feile selv når du har skrevet koden riktig, for eksempel lesing av data. `try/catch` lar oss håndtere slike feil.
:::

:::step {"id":"try","caption":"La programmet vise en beskjed når en operasjon feiler."}
## Prøv kode i en blokk

`try` betyr «prøv». JavaScript utfører instruksjonene i try-blokken. Her er `ukjentNavn` med vilje ikke laget, så denne linjen feiler under kjøring.
:::

:::step {"id":"catch","caption":"La programmet vise en beskjed når en operasjon feiler."}
## Ta imot feilen

`catch (error)` betyr «fang feilen». Programmet hopper hit når try-blokken feiler. `error` er et lokalt navn på feilobjektet. `error.message` gir forklaringen som tekst.
:::

:::step {"id":"continue","caption":"La programmet vise en beskjed når en operasjon feiler."}
## Fortsett etter håndteringen

Catch-blokken skriver først vår egen beskjed, så feilens forklaring. Deretter fortsetter programmet etter hele try/catch og skriver `Programmet fortsetter.`. En syntaksfeil som hindrer hele programmet i å starte, fanges ikke av denne koden.
:::

:::step {"id":"practice","caption":"La programmet vise en beskjed når en operasjon feiler."}
## Gjør operasjonen gyldig

Bytt `ukjentNavn` med teksten `"Ada"` i try-blokken. Forutsi og kjør. Nå kommer `Ada` og `Programmet fortsetter.`. Catch-blokken hoppes over fordi ingen feil oppstod.
:::

:::step {"id":"check","caption":"La programmet vise en beskjed når en operasjon feiler."}
## Følg begge veier

**Stopp og forklar:** Hva bestemmer om catch-blokken kjører?

**Svar:** Om en feil oppstår under kjøring i try-blokken. Try/catch erstatter ikke en vanlig if-setning for forventede valg, som et tomt skjemafelt.
:::
