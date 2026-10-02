:::step {"id":"goal","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5.","Gi poeng svaret 15.","Skriv 15."],"traceActive":0}
## Øk poengsummen

Du kan gi `poeng` en bestemt verdi. Nå vil vi legge til fem poeng til verdien som allerede finnes. Det trenger vi for eksempel når vi teller.
:::

:::step {"id":"right","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5.","Gi poeng svaret 15.","Skriv 15."],"traceActive":1}
## Les høyresiden først

I `poeng = poeng + 5;` regner JavaScript ut høyresiden før verdien lagres. Først hentes `10`. Deretter regnes `10 + 5`, som gir `15`.
:::

:::step {"id":"left","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5.","Gi poeng svaret 15.","Skriv 15."],"traceActive":2}
## Lagre svaret

Når regnestykket er ferdig, får variabelen til venstre verdien `15`. Linjen sier altså «ta den gamle verdien, legg til fem og lagre svaret som ny verdi». Den er ikke en matematisk likning.
:::

:::step {"id":"practice","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5.","Gi poeng svaret 15.","Skriv 15."],"traceActive":2}
## Gjenta oppdateringen én gang

Forutsi utskriften når du kopierer `poeng = poeng + 5;` og setter kopien rett før `console.log`. Kjør. Første oppdatering gir `15`. Den neste bruker `15` og gir `20`.
:::

:::step {"id":"check","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5.","Gi poeng svaret 15.","Skriv 15."],"traceActive":3}
## Regn selv først

Sett startverdien til `3`, behold bare én oppdatering, og bytt `+ 5` med `+ 1`.

**Svar:** Utskriften blir `4`. Forklar hvilken verdi høyresiden brukte. I løkkeleksjonene skal vi bruke akkurat denne måten å telle på.
:::
