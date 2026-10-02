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

:::step {"id":"practice","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei().","Inne i funksjonen: skriv Hei!.","Gå tilbake etter kallet."],"traceActive":2}
## Kall den to ganger

Legg til en ny `siHei();` nederst. Forutsi og kjør. Du får to hilsener uten å kopiere linjen inne i funksjonen. Endre hilsenen inne i funksjonen én gang: da bruker begge kallene den nye teksten.
:::

:::step {"id":"check","caption":"Gi noen instruksjoner et navn og bestem når de kjører.","trace":["Lag funksjonen siHei. Innholdet kjører ikke ennå.","Kall siHei().","Inne i funksjonen: skriv Hei!.","Gå tilbake etter kallet."],"traceActive":0}
## Lage er ikke det samme som å kjøre

Sett `//` foran begge kallene, og kjør. Ingen hilsen skrives, selv om funksjonen fortsatt er definert. Fjern kommentarene igjen.

**Stopp og forklar:** Hvilke linjer beskriver jobben, og hvilken linje bestiller jobben?

**Svar:** Funksjonsblokken beskriver den. `siHei();` bestiller at den utføres.
:::
