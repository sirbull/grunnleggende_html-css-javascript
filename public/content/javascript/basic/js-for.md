:::step {"id":"known","caption":"Bruk de samme tre delene du kjenner fra while."}
## Samme telling, ny skrivemåte

Du kan allerede telle fra 1 til 3 med `while`. En **for-løkke** samler startverdi, betingelse og oppdatering på én linje. Resultatet er fortsatt `1`, `2` og `3`.
:::

:::step {"id":"parts","caption":"Bruk de samme tre delene du kjenner fra while."}
## Les de tre delene

Inni parentesene står tre deler, skilt med semikolon:

1. `let teller = 1` kjøres én gang før løkken starter.
2. `teller <= 3` sjekkes før hver runde.
3. `teller = teller + 1` kjøres etter hver runde.

Blokken med `console.log` kjører mellom sjekken og oppdateringen.
:::

:::step {"id":"follow","caption":"Bruk de samme tre delene du kjenner fra while."}
## Følg en hel runde

Start med 1. Sjekk at 1 er mindre enn eller lik 3. Skriv 1. Øk til 2. Gå tilbake til sjekken. Det er samme forløp som i forrige leksjon.
:::

:::step {"id":"practice","caption":"Bruk de samme tre delene du kjenner fra while."}
## Endre bare slutten

Bytt `<= 3` med `<= 4`. Forutsi og kjør. Utskriften blir `1`, `2`, `3`, `4`. Prøv deretter startverdien `2` med samme grense: da starter utskriften på `2`.
:::

:::step {"id":"short","caption":"Bruk de samme tre delene du kjenner fra while."}
## En kortere oppdatering

Når du forstår `teller = teller + 1`, kan du skrive `teller++` på oppdateringsplassen. Der betyr det «øk telleren med én». Prøv denne ene endringen og kontroller at resultatet er likt. Vi bruker den lange formen til du kjenner igjen begge.
:::

:::step {"id":"check","caption":"Bruk de samme tre delene du kjenner fra while."}
## Finn delene uten hjelp

**Stopp og forklar:** Pek på delen som kjøres bare én gang, delen som stiller spørsmålet og delen som endrer telleren.

**Svar:** De står i den rekkefølgen inne i parentesene. Blokken kjøres bare mens spørsmålet gir `true`.
:::
