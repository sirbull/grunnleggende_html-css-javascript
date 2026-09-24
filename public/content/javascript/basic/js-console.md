:::step {"id":"look-inside","caption":"console.log viser hva variablene inneholder mens programmet kjører.","traceActive":-1}
## Konsollen viser hva som skjer

Du har brukt [[js-console|console.log()]] siden første leksjon. Den er også ditt viktigste verktøy når noe ikke virker som du tror.

Skriv ut verdien du lurer på, rett før linjen der noe går galt. Da ser du hva variabelen *faktisk* inneholder, og ikke bare hva du tror den inneholder.

Verkstedet viser konsollen under resultatet. Nettleseren har også en større konsoll i utviklerverktøyene. Den åpner du med F12.
:::

:::step {"id":"errors","caption":"Feilmeldingen forteller hva som gikk galt og på hvilken linje.","traceActive":-1}
## To slags feil

**Skrivefeil (syntaksfeil):** Koden er ikke gyldig JavaScript, for eksempel fordi et anførselstegn eller en parentes mangler. Da kjører ikke programmet i det hele tatt.

**Feil mens programmet kjører:** Koden ser riktig ut, men noe mangler når linjen skal utføres. Et vanlig eksempel er et variabelnavn som er stavet feil. `prs` i stedet for `pris` gir meldingen `prs is not defined`, som betyr «prs finnes ikke».

Feilmeldingene er på engelsk. Les den første meldingen, og finn linjenummeret den peker på. Der, eller like over, ligger som regel feilen.
:::

:::step {"id":"practice","caption":"Feilen forsvinner når variabelnavnet er stavet riktig igjen.","traceActive":-1}
## Prøv selv

Åpne kodeverkstedet:

1. Fjern `//` foran den siste linjen og kjør koden. Les feilmeldingen.
2. Rett `prs` til `pris`. Nå skal konsollen vise prisen for tre billetter.
3. Fjern et anførselstegn et sted og se hvilken feil du får da. Sett det tilbake.

**Husk:** Feilmeldinger er ikke et tegn på at du gjør noe galt. Alle som programmerer, får dem hele tiden. De er hjelp til å finne veien videre.
:::
