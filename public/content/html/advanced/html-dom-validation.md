:::step {"id":"concept","caption":"Forstå forskjellen mellom kildekode og det nettleseren bygger.","highlight":"html"}
## Hva lærer du?

Nettleseren parser HTML og lager et [[dom|DOM-tre]]. Den forsøker å reparere ugyldig kode. Derfor kan strukturen i utviklerverktøyene være annerledes enn koden du skrev. Gyldig struktur gjør oppførselen mer forutsigbar.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":"head"}
## Slik henger det sammen

Et p-element kan ikke inneholde en section. Nettleseren vil avslutte avsnittet før section-elementet. Sjekk også at id-er er unike, at lang er riktig og at title beskriver siden. I en full side kan meta description gi en kort oppsummering til søkemotorer.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":"main"}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Nettleseren reparerer strukturen, men reparasjon er ingen god forfatterstrategi. Bruk HTML-validatoren til W3C når du skal kontrollere et komplett dokument: https://validator.w3.org/nu/.","highlight":"section"}
## Prøv selv

Undersøk DOM-treet. Legg en section inni p i verkstedet. Se deretter forskjellen i nettleserens utviklerverktøy på en egen side.

**Dette skal du se:** Nettleseren reparerer strukturen, men reparasjon er ingen god forfatterstrategi. Bruk HTML-validatoren til W3C når du skal kontrollere et komplett dokument: https://validator.w3.org/nu/.
:::
