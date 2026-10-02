:::step {"id":"output","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":0}
## En funksjon kan levere et svar

Funksjonen i forrige leksjon skrev selv en beskjed. Nå skal funksjonen beregne en verdi og gi den tilbake til stedet den ble kalt fra. Det gjør `return`.
:::

:::step {"id":"calculate","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":1}
## Følg verdien inn

`doble(3)` kaller funksjonen med argumentet `3`. Parameteren `tall` får verdien `3`. `tall * 2` regnes ut til `6`.
:::

:::step {"id":"return","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":3}
## Følg svaret ut

`return` gir `6` tilbake og avslutter dette funksjonskallet. Linjen `const svar = doble(3);` blir dermed som `const svar = 6;`. Neste linje skriver verdien.
:::

:::step {"id":"practice","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":4}
## Endre argumentet

Endre bare kallet til `doble(4)`. Forutsi og kjør. Konsollen skal vise `8`. Legg så til `console.log(doble(5));` nederst for å skrive et nytt svar direkte.
:::

:::step {"id":"check","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":2}
## Return er ikke en utskrift

**Stopp og forklar:** Hvilken instruksjon leverer svaret, og hvilken viser det?

**Svar:** `return` leverer det. `console.log` viser det. Fjerner du siste utskriftslinje i originalen, blir svaret fortsatt beregnet og lagret, men ingen beskjed skrives.
:::

:::step {"id":"review","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Skriv svar."],"traceActive":0}
## Bruk grunnbegrepene sammen

Før du går videre, lag et lite program selv:

1. Lag funksjonen `plussEn(tall)` som returnerer `tall + 1`.
2. Lag en variabel med startverdien `0`.
3. Bruk en while-løkke til å skrive verdien og gi variabelen svaret fra `plussEn`, så lenge verdien er mindre enn `3`.

**Sjekk:** Utskriften skal være `0`, `1`, `2`. Forklar hvor variabelen endres og hvorfor løkken stopper. Gå tilbake til den aktuelle leksjonen hvis en av delene er uklar.
:::

:::step {"id":"review-answer","caption":"Følg startverdien, funksjonskallet og stoppbetingelsen i samme program.","trace":["Start verdi på 0.","Spør om verdi < 3.","Hvis sant: skriv verdi.","Kall plussEn og lagre svaret i verdi.","Gjenta sjekken til svaret er usant."],"traceActive":3}
## Sammenlign med et løsningsforslag

Prøv oppgaven i forrige steg før du leser dette forslaget:

```js
function plussEn(tall) {
  return tall + 1;
}
let verdi = 0;
while (verdi < 3) {
  console.log(verdi);
  verdi = plussEn(verdi);
}
```

Første runde skriver `0`. Kallet `plussEn(0)` returnerer `1`, som blir ny verdi. Neste runde skriver `1` og får `2` tilbake. Tredje runde skriver `2` og får `3` tilbake. Da er `verdi < 3` usant, og løkken stopper.

Løsningen din kan bruke andre navn og fortsatt være riktig. Endre bare startverdien til `1`: nå skal utskriften være `1` og `2`. Forklar det før du kjører. Når du kan følge disse verdiene selv, har du brukt variabler, sammenligning, løkke, parameter og returverdi sammen.
:::
