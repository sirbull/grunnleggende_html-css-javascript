:::step {"id":"question","caption":"Still ett spørsmål og les svaret true eller false."}
## Et spørsmål i kode

`alder >= 18` spør om alderen er **større enn eller lik 18**. Resultatet er `true` hvis svaret er sant, og `false` hvis det er usant. Dette er verdier i JavaScript, og de skrives uten anførselstegn.
:::

:::step {"id":"boundary","caption":"Still ett spørsmål og les svaret true eller false."}
## Test grensen

Originaleksempelet skriver `true`, fordi 18 er lik 18. Her er alderen endret til `17`. Åpne **Resultat** og se `false`. Prøv `19` selv i kodeverkstedet. Det gir `true`.

```js example
const alder = 17;
console.log(alder >= 18);
```
:::

:::step {"id":"greater","caption":"Still ett spørsmål og les svaret true eller false."}
## Med eller uten lik?

Her er alderen `18` igjen, men `>=` er byttet med `>`, som betyr **større enn**. Forutsi svaret før du åpner **Resultat**. Svaret er `false`, fordi 18 ikke er større enn 18.

```js example
const alder = 18;
console.log(alder > 18);
```
:::

:::step {"id":"symbols","caption":"Still ett spørsmål og les svaret true eller false."}
## Prøv ett tegnpar om gangen

Her sammenlignes alderen `18` på fire måter, én per linje:

| Uttrykk | Spørsmål | Svar |
| --- | --- | --- |
| `alder < 18` | Mindre enn 18? | `false` |
| `alder <= 18` | Mindre enn eller lik 18? | `true` |
| `alder === 18` | Samme verdi og type som 18? | `true` |
| `alder !== 18` | Forskjellig verdi eller type? | `false` |

```js example
const alder = 18;
console.log(alder < 18);
console.log(alder <= 18);
console.log(alder === 18);
console.log(alder !== 18);
```
:::

:::step {"id":"assignment","caption":"Still ett spørsmål og les svaret true eller false."}
## Ett og tre likhetstegn

`=` gir en variabel en verdi. `===` sammenligner verdier. Det er forskjellige handlinger.

Her sammenlignes alderen både med tallet `18` og med teksten `"18"`. Den første gir `true`. Den andre gir `false`, fordi tallet og teksten har forskjellige typer. Vi bruker `===` når vi spør om likhet.

```js example
const alder = 18;
console.log(alder === 18);
console.log(alder === "18");
```
:::

:::step {"id":"check","caption":"Still ett spørsmål og les svaret true eller false."}
## Forutsi et grensesvar

**Stopp og forklar:** Hva gir `18 >= 18`, og hva gir `18 > 18`? Forutsi før du åpner **Resultat**.

**Svar:** `true` og `false`. Ordet «lik» i den første regelen gjør forskjellen.

```js example
console.log(18 >= 18);
console.log(18 > 18);
```
:::
