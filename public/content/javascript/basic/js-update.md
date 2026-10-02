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

:::step {"id":"practice","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 10.","Hent 10 og legg til 5. poeng blir 15.","Hent 15 og legg til 5. poeng blir 20.","Skriv 20."],"traceActive":2}
## Gjenta oppdateringen én gang

Her står `poeng = poeng + 5;` to ganger før `console.log`. Forutsi utskriften før du åpner **Resultat**. Første oppdatering gir `15`. Den neste bruker `15` og gir `20`.

```js example
let poeng = 10;
poeng = poeng + 5;
poeng = poeng + 5;
console.log(poeng);
```
:::

:::step {"id":"check","caption":"Regn ut en ny verdi og lagre den i samme variabel.","trace":["poeng starter med 3.","Hent 3 og legg til 1.","Gi poeng svaret 4.","Skriv 4."],"traceActive":3}
## Regn selv først

Her starter `poeng` på `3`, og oppdateringen legger til `1`. Regn ut svaret før du åpner **Resultat**.

**Svar:** Utskriften blir `4`. Høyresiden hentet `3` og la til `1`. I løkkeleksjonene skal vi bruke akkurat denne måten å telle på.

```js example
let poeng = 3;
poeng = poeng + 1;
console.log(poeng);
```
:::
