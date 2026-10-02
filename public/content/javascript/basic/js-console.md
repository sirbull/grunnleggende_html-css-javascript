:::step {"id":"baseline","caption":"Les én feilmelding og rett én skrivefeil."}
## Begynn med kode som virker

Du kjenner [[js-console|console.log()]]. Den lar deg undersøke en verdi. Kjør eksempelet og se at konsollen viser `40` før du lager en feil.
:::

:::step {"id":"mistake","caption":"Les én feilmelding og rett én skrivefeil."}
## Lag en liten skrivefeil

I kodeverkstedet: bytt `pris` med `prs` **bare på andre linje**. Kjør. Meldingen inneholder `prs is not defined`. Det betyr at programmet ikke finner et navn som heter `prs`.

Les den første feilmeldingen. Den forteller hva programmet stoppet ved. Eventuelt linjenummer kan hjelpe deg å finne stedet.
:::

:::step {"id":"repair","caption":"Les én feilmelding og rett én skrivefeil."}
## Rett navnet

Sammenlign navnet på første og andre linje. Rett `prs` til `pris`, og kjør på nytt. Nå kommer `40` tilbake. JavaScript gjetter ikke hvilket navn du mente.
:::

:::step {"id":"syntax","caption":"Les én feilmelding og rett én skrivefeil."}
## En annen slags feil

Fjern den avsluttende parentesen i `console.log(pris);` og kjør. Du får en **syntaksfeil**, som betyr at skrivemåten ikke er gyldig. Da kan ikke dette programmet starte. Sett parentesen tilbake.

Navnefeilen i forrige steg oppstod først da programmet prøvde å bruke navnet. Begge feilene er vanlige når du lærer.
:::

:::step {"id":"check","caption":"Les én feilmelding og rett én skrivefeil."}
## Øv på å finne feilen

Skriv `Pris` med stor P på andre linje. Hva tror du skjer?

**Svar:** Navnet finnes ikke, fordi `pris` og `Pris` er ulike navn. Rett det og kontroller at koden virker før du går videre.
:::
