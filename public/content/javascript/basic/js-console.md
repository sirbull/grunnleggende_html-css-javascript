:::step {"id":"baseline","caption":"Les én feilmelding og rett én skrivefeil."}
## Begynn med kode som virker

Du kjenner [[js-console|console.log()]]. Den lar deg undersøke en verdi. Åpne **Resultat** og se at konsollen viser `40`. I de neste stegene ser du hva som skjer når koden har en feil.
:::

:::step {"id":"mistake","caption":"Les én feilmelding og rett én skrivefeil."}
## En liten skrivefeil

Her står `prs` i stedet for `pris` på andre linje. Åpne **Resultat**. Konsollen viser en feil med `prs is not defined`. Det betyr at programmet ikke finner et navn som heter `prs`.

Les den første feilmeldingen. Den forteller hva programmet stoppet ved. Et eventuelt linjenummer kan hjelpe deg å finne stedet.

```js example
let pris = 40;
console.log(prs);
```
:::

:::step {"id":"repair","caption":"Les én feilmelding og rett én skrivefeil."}
## Rett navnet

Sammenlign navnet på første og andre linje. Når `prs` er rettet til `pris`, er koden lik originalen igjen, og **Resultat** viser `40`. JavaScript gjetter ikke hvilket navn du mente.

Prøv selv i kodeverkstedet: lag skrivefeilen, kjør, les meldingen og rett den.
:::

:::step {"id":"syntax","caption":"Les én feilmelding og rett én skrivefeil."}
## En annen slags feil

Her mangler den avsluttende parentesen i `console.log(pris;`. Åpne **Resultat**. Konsollen viser `SyntaxError: missing ) after argument list`. Det er en **syntaksfeil**, som betyr at skrivemåten ikke er gyldig. Da kan ikke dette programmet starte.

Navnefeilen i forrige steg oppstod først da programmet prøvde å bruke navnet. Begge feilene er vanlige når du lærer.

```js example
let pris = 40;
console.log(pris;
```
:::

:::step {"id":"check","caption":"Les én feilmelding og rett én skrivefeil."}
## Øv på å finne feilen

Her står `Pris` med stor P på andre linje. Hva tror du skjer? Forutsi før du åpner **Resultat**.

**Svar:** Navnet finnes ikke, fordi `pris` og `Pris` er ulike navn. Konsollen viser `Pris is not defined`. Lag feilen selv i kodeverkstedet, rett den, og kontroller at koden virker før du går videre.

```js example
let pris = 40;
console.log(Pris);
```
:::
