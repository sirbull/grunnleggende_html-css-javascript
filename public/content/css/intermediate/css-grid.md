:::step {"id":"concept","caption":"Styr rader og kolonner med én layout.","highlight":""}
## Hva lærer du?

CSS Grid er nyttig når både rader og kolonner skal henge sammen. `display: grid` aktiverer layouten. `grid-template-columns` definerer kolonnene. En fr-enhet fordeler en andel av den ledige plassen.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

`repeat(auto-fit, minmax(min(100%, 150px), 1fr))` lager så mange kolonner som får plass. minmax setter et minimum og maksimum. Den innerste min-funksjonen lar kolonnen passe også når hele beholderen er smalere enn 150px.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example css

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Grid justerer kolonnebreddene sammen. Flexbox passer ofte til én rad eller kolonne; Grid passer når plasseringen skal henge sammen i to retninger.","highlight":""}
## Prøv selv

Prøv først `1fr 1fr`, deretter `2fr 1fr`. Sett tilbake den responsive regelen og legg til et kort.

**Dette skal du se:** Grid justerer kolonnebreddene sammen. Flexbox passer ofte til én rad eller kolonne; Grid passer når plasseringen skal henge sammen i to retninger.
:::
