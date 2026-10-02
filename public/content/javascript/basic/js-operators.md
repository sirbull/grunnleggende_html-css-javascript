:::step {"id":"multiply","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Gange to tall

`*` betyr gange i JavaScript. `pris * antall` henter `40` og `3` fra variablene og regner ut `120`. `console.log` skriver svaret. Begge variablene finnes før de brukes.
:::

:::step {"id":"expression","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Et uttrykk gir en verdi

`pris * antall` er et **uttrykk**: kode som kan regnes ut til en verdi. Uttrykket erstattes med svaret når linjen kjører. Her blir det som å skrive `console.log(120);`.
:::

:::step {"id":"practice","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Endre antallet

Forutsi svaret når `antall` er `4`. Endre bare dette tallet og kjør. Konsollen skal vise `160`. Sett tallet tilbake til `3`.
:::

:::step {"id":"other","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Prøv regneartene hver for seg

Bytt bare uttrykket i siste linje og kjør mellom hver endring:

| Uttrykk | Betydning | Svar |
| --- | --- | --- |
| `pris + antall` | pluss | `43` |
| `pris - antall` | minus | `37` |
| `pris / antall` | dele | omtrent `13.33` |

Disse svarene gjelder når `pris` er `40` og `antall` er `3`.
:::

:::step {"id":"parentheses","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Bestem hva som regnes først

Prøv `console.log((2 + 3) * 4);`. Parentesene sier at `2 + 3` skal regnes først. Svaret blir `20`. Uten de innerste parentesene regnes gange før pluss, og `2 + 3 * 4` gir `14`.
:::

:::step {"id":"check","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Forklar beregningen

**Stopp og forklar:** Hva skjer med `pris * antall` før svaret skrives?

**Svar:** Programmet henter verdiene, ganger dem og gir resultatet til `console.log`.
:::
