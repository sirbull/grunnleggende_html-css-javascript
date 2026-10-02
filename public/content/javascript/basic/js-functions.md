:::step {"id":"bundle","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei().","Inne i funksjonen: skriv Hei!.","Gå tilbake etter kallet."],"traceActive":0}
## Et navn på instruksjoner

En [[js-function|funksjon]] samler instruksjoner under et navn. Du kan be programmet utføre dem ved å **kalle** funksjonen. Her samler vi én utskrift under navnet `siHei`.
:::

:::step {"id":"define","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei().","Inne i funksjonen: skriv Hei!.","Gå tilbake etter kallet."],"traceActive":0}
## Lag funksjonen først

`function siHei() { ... }` er en funksjonsdeklarasjon. `function` sier hva vi lager. `siHei` er navnet. Parentesene er foreløpig tomme. Krøllparentesene avgrenser instruksjonene i funksjonen.

Å lage funksjonen utfører ikke instruksjonene inni den.
:::

:::step {"id":"call","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei().","Inne i funksjonen: skriv Hei!.","Gå tilbake etter kallet."],"traceActive":1}
## Be den kjøre

Siste linje, `siHei();`, kaller funksjonen. Programmet går inn i blokken, skriver `Hei!` og kommer tilbake til linjen etter kallet. Parentesene er det som gjør dette til et kall.
:::

:::step {"id":"practice","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei(): skriv Hei!.","Kall siHei() igjen: skriv Hei!.","Programmet er ferdig."],"traceActive":2}
## Kall den to ganger

Her står `siHei();` to ganger nederst. Forutsi før du åpner **Resultat**. Du får to hilsener uten å kopiere linjen inne i funksjonen. Prøv selv å endre hilsenen inne i funksjonen: da bruker begge kallene den nye teksten.

```js example
function siHei() {
  console.log("Hei!");
}
siHei();
siHei();
```
:::

:::step {"id":"check","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kallene er kommentarer og kjøres ikke.","Ingen hilsen skrives."],"traceActive":1}
## Lage er ikke det samme som å kjøre

Her står `//` foran begge kallene. Åpne **Resultat**: ingen hilsen skrives, selv om funksjonen fortsatt er definert.

**Stopp og forklar:** Hvilke linjer beskriver jobben, og hvilken linje bestiller jobben?

**Svar:** Funksjonsblokken beskriver den. `siHei();` bestiller at den utføres.

```js example
function siHei() {
  console.log("Hei!");
}
// siHei();
// siHei();
```
:::
