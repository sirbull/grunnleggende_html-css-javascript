:::step {"id":"before","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Data kan komme senere

Du kjenner funksjoner, objekter, hendelser, JSON og try/catch. Nå skal en funksjon hente data. En **Promise** representerer et resultat som blir klart senere, eller en feil. **Asynkron** kode lar resten av siden fortsette mens den venter på slikt arbeid.
:::

:::step {"id":"start","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Start fra et klikk

De nederste linjene registrerer `hentFilm` som klikklytter, slik du har gjort før. Når knappen aktiveres, finner funksjonen avsnittet og setter teksten til `Henter …`. En liten lokal forespørsel kan bli ferdig så raskt at du bare rekker å se sluttresultatet.
:::

:::step {"id":"await","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Vent inni funksjonen

`async` foran `function` gjør at vi kan bruke `await` i funksjonen. [[dom-fetch|fetch()]] starter forespørselen og gir en Promise. `await` venter på resultatet **inne i denne funksjonen**. Når det er klart, lagres et svarobjekt i `response`, og funksjonen fortsetter. En async-funksjon gir selv en Promise til den som kaller den.
:::

:::step {"id":"response","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Sjekk svaret før du leser data

`response.ok` forteller om svarstatusen var vellykket. `!response.ok` spør om den ikke var det. `throw new Error(...)` lager og utløser en feil som catch-blokken kan håndtere. Det er nødvendig å sjekke status fordi fetch ikke gjør alle svar med feilstatus til en kastet feil.
:::

:::step {"id":"json","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Les innholdet

`response.json()` leser innholdet som JSON og gir en ny Promise. `await` gir oss det ferdige objektet i `film`. `film.tittel` henter egenskapen, og `textContent` viser den. Eksempelet bruker en innebygd data-URL fordi eksterne forespørsler er sperret i øvingsvinduet. På en egen side kan adressen for eksempel være `filmer.json`.
:::

:::step {"id":"practice","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Test resultatet

Åpne **Resultat** og trykk knappen. Teksten blir `Skogsturen`. Du kan også bruke Tab til knappen og aktivere den med Enter.
:::

:::step {"id":"failure","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Test en feil

Her er bare adressen inni fetch byttet med `data:application/json,ugyldig`. Åpne **Resultat** og trykk knappen. Nå er innholdet ikke gyldig JSON. `response.json()` feiler, og catch-blokken viser `Noe gikk galt:` etterfulgt av feilmeldingen.

```js example
async function hentFilm() {
  const resultat = document.querySelector("#resultat");
  resultat.textContent = "Henter …";
  try {
    const response = await fetch("data:application/json,ugyldig");
    if (!response.ok) {
      throw new Error("Kunne ikke hente filmen");
    }
    const film = await response.json();
    resultat.textContent = film.tittel;
  } catch (error) {
    resultat.textContent = "Noe gikk galt: " + error.message;
  }
}
const knapp = document.querySelector("button");
knapp.addEventListener("click", hentFilm);
```
:::

:::step {"id":"check","caption":"Følg ett kall fra forespørsel til data eller feilmelding."}
## Forklar de to ventepunktene

**Stopp og forklar:** Hva venter den første og den andre await på?

**Svar:** Først på svarobjektet fra forespørselen, deretter på dataene som leses fra svaret.
:::
