:::step {"id":"concept","caption":"Beskriv bildets funksjon for den som ikke ser det.","highlight":""}
## Hva lærer du?

`img` henter et bilde fra `src`. Attributtet `alt` er en tekstlig erstatning som skal formidle bildets innhold eller funksjon. Beskriv det som er relevant i sammenhengen, ikke alle detaljer.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

Et rent dekorativt bilde skal ha `alt=""`. Da kan hjelpemidler hoppe over det. Et bilde som fungerer som lenke, trenger en beskrivelse av lenkemålet. Bruk `figure` og `figcaption` når bildet har en synlig bildetekst. Bredde og høyde hjelper nettleseren å sette av plass.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Den alternative teksten blir stående som beskrivelse selv når bildet ikke lastes. En bildetekst og en alt-tekst har ulike roller og trenger ikke være like.","highlight":""}
## Prøv selv

Bytt alt-teksten slik at den beskriver illustrasjonen. Prøv deretter en ugyldig src og se hvordan den alternative teksten kan hjelpe.

**Dette skal du se:** Den alternative teksten blir stående som beskrivelse selv når bildet ikke lastes. En bildetekst og en alt-tekst har ulike roller og trenger ikke være like.
:::
