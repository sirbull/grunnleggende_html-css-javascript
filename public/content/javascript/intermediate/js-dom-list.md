:::step {"id":"known","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## En kjent løkke med en ny jobb

Du har brukt for...of til å skrive hvert navn i konsollen. Nå lager hver runde ett listepunkt på nettsiden. HTML-filen inneholder en tom `<ul>` med `id="navneliste"`.
:::

:::step {"id":"create","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Lag ett element

`document.createElement("li")` lager et nytt listepunktelement. Navnet `li` skrives uten `<` og `>`. Elementet lagres i `punkt`. Det er ikke synlig ennå, fordi det ikke er lagt inn i dokumentet.
:::

:::step {"id":"text","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Fyll elementet med tekst

`punkt.textContent = person;` gir det nye elementet navnet fra denne runden. Første runde gir teksten `Ada`. Dette er samme `textContent` som du brukte på et eksisterende avsnitt.
:::

:::step {"id":"append","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Legg elementet inn i listen

`liste.append(punkt);` legger det ferdige punktet sist i listen. Først nå blir det synlig. Neste runde lager et nytt element, fyller det med `Bo` og legger det etter Ada.
:::

:::step {"id":"practice","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Legg til en verdi

Legg til `"Dina"` i arrayet og kjør. Du skal få fire listepunkter uten å endre løkken. Sett deretter `//` foran `liste.append(punkt);` og kjør. Listen er nå tom, selv om elementene blir laget i løkken. Sett linjen tilbake.
:::

:::step {"id":"check","caption":"Koble en kjent løkke til oppretting av HTML-elementer."}
## Forklar de tre jobbene

**Stopp og forklar:** Hva gjør `createElement`, `textContent` og `append`?

**Svar:** De lager elementet, fyller det med tekst og setter det inn i dokumentet. Løkken gjentar disse jobbene for hver verdi.
:::
