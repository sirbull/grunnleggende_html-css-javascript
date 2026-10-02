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

Her er `antall` endret til `4`. Forutsi svaret før du åpner **Resultat**. Konsollen viser `160`, fordi `40 * 4` er 160.

```js example
let pris = 40;
let antall = 4;
console.log(pris * antall);
```
:::

:::step {"id":"other","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Prøv regneartene hver for seg

Her er den siste linjen byttet med tre linjer, én for hver regneart:

| Uttrykk | Betydning | Svar |
| --- | --- | --- |
| `pris + antall` | pluss | `43` |
| `pris - antall` | minus | `37` |
| `pris / antall` | dele | omtrent `13.33` |

Disse svarene gjelder når `pris` er `40` og `antall` er `3`. Delingen går ikke opp, så konsollen viser mange desimaler: `13.333333333333334`.

```js example
let pris = 40;
let antall = 3;
console.log(pris + antall);
console.log(pris - antall);
console.log(pris / antall);
```
:::

:::step {"id":"parentheses","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Bestem hva som regnes først

Her skriver programmet to regnestykker med de samme tallene. I `(2 + 3) * 4` sier parentesene at `2 + 3` skal regnes først. Svaret blir `20`. Uten parentesene regnes gange før pluss, og `2 + 3 * 4` gir `14`.

```js example
console.log((2 + 3) * 4);
console.log(2 + 3 * 4);
```
:::

:::step {"id":"check","caption":"Bruk én regneart om gangen før du setter dem sammen."}
## Forklar beregningen

**Stopp og forklar:** Hva skjer med `pris * antall` før svaret skrives?

**Svar:** Programmet henter verdiene, ganger dem og gir resultatet til `console.log`.
:::
