:::step {"id":"concept","caption":"Finn ut hvorfor en regel vinner over en annen.","highlight":""}
## Hva lærer du?

Når flere regler treffer samme element, bestemmer kaskaden hvilken deklarasjon som brukes. For vanlige regler i samme opprinnelse og lag vurderes blant annet spesifisitet. En id veier mer enn en klasse, som veier mer enn et elementnavn.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

Ved lik spesifisitet vinner regelen som står sist. Noen egenskaper, som color, arves fra foreldre hvis barnet ikke har en egen verdi. Margin arves vanligvis ikke. Bruk utviklerverktøyenes Styles-panel for å se overstyrte deklarasjoner. Unngå å løse alt med !important.
:::

:::step {"id":"practice","caption":"Rekkefølgen avgjør bare mellom ellers like sterke regler. En mer spesifikk selektor kan vinne selv om den står tidligere.","highlight":""}
## Prøv selv

Bytt rekkefølge på de to .card-reglene. Legg så til en id på kortet og en regel med den id-en.

**Dette skal du se:** Rekkefølgen avgjør bare mellom ellers like sterke regler. En mer spesifikk selektor kan vinne selv om den står tidligere.
:::
