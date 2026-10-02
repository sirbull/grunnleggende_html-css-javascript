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

:::step {"id":"practice","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 4.","tall får verdien 4.","Returner 4 * 2, altså 8.","Lagre 8 i svar og skriv det.","Kall doble med 5 og skriv 10 direkte."],"traceActive":4}
## Endre argumentet

Her er kallet endret til `doble(4)`, og `console.log(doble(5));` står nederst. Forutsi før du åpner **Resultat**. Konsollen viser `8` og `10`. Den siste linjen skriver svaret direkte, uten å lagre det i en variabel først.

```js example
function doble(tall) {
  return tall * 2;
}
const svar = doble(4);
console.log(svar);
console.log(doble(5));
```
:::

:::step {"id":"check","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","trace":["Kall doble med 3.","tall får verdien 3.","Returner 3 * 2, altså 6.","Lagre 6 i svar.","Ingen linje skriver svar."],"traceActive":4}
## Return er ikke en utskrift

Her er siste utskriftslinje fjernet. Åpne **Resultat**: ingen beskjed skrives, selv om svaret fortsatt blir beregnet og lagret i `svar`.

**Stopp og forklar:** Hvilken instruksjon leverer svaret, og hvilken viser det?

**Svar:** `return` leverer det. `console.log` viser det.

```js example
function doble(tall) {
  return tall * 2;
}
const svar = doble(3);
```
:::

:::step {"id":"review","caption":"La en funksjon beregne en verdi som resten av programmet kan bruke.","example":false}
## Bruk grunnbegrepene sammen

Før du går videre, lag et lite program selv:

1. Lag funksjonen `plussEn(tall)` som returnerer `tall + 1`.
2. Lag en variabel med startverdien `0`.
3. Bruk en while-løkke til å skrive verdien og gi variabelen svaret fra `plussEn`, så lenge verdien er mindre enn `3`.

**Sjekk:** Utskriften skal være `0`, `1`, `2`. Forklar hvor variabelen endres og hvorfor løkken stopper. Gå tilbake til den aktuelle leksjonen hvis en av delene er uklar.
:::

:::step {"id":"review-answer","caption":"Følg startverdien, funksjonskallet og stoppbetingelsen i samme program.","trace":["Start verdi på 0.","Spør om verdi < 3.","Hvis sant: skriv verdi.","Kall plussEn og lagre svaret i verdi.","Gjenta sjekken til svaret er usant."],"traceActive":3}
## Sammenlign med et løsningsforslag

Prøv oppgaven i forrige steg før du ser på dette forslaget. Koden ved siden av er én mulig løsning.

Første runde skriver `0`. Kallet `plussEn(0)` returnerer `1`, som blir ny verdi. Neste runde skriver `1` og får `2` tilbake. Tredje runde skriver `2` og får `3` tilbake. Da er `verdi < 3` usant, og løkken stopper.

Løsningen din kan bruke andre navn og fortsatt være riktig. Endre bare startverdien til `1`: nå skal utskriften være `1` og `2`. Forklar det før du kjører. Når du kan følge disse verdiene selv, har du brukt variabler, sammenligning, løkke, parameter og returverdi sammen.

```js example
function plussEn(tall) {
  return tall + 1;
}
let verdi = 0;
while (verdi < 3) {
  console.log(verdi);
  verdi = plussEn(verdi);
}
```
:::
