:::step {"id":"extra","caption":"Legg til ett spørsmål med else if."}
## Et nytt spørsmål hvis det første er usant

`else if` betyr «ellers, hvis». Programmet kommer til dette spørsmålet bare hvis det første svaret var `false`. Vi bruker det når valget har mer enn to alternativer.
:::

:::step {"id":"follow","caption":"Legg til ett spørsmål med else if."}
## Følg verdien 7

Først spør programmet om `7 >= 10`. Svaret er `false`. Deretter spør det om `7 >= 5`. Svaret er `true`, så det skriver `Sølv`. Resten av dette valget hoppes over.
:::

:::step {"id":"fallback","caption":"Legg til ett spørsmål med else if."}
## Når ingen spørsmål gir true

Her er poengene `3`. Både `3 >= 10` og `3 >= 5` gir `false`, så siste `else` kjører og skriver `Prøv igjen`. Det er alternativet for verdier som ikke passet til noen av spørsmålene.

```js example
const poeng = 3;
if (poeng >= 10) {
  console.log("Gull");
} else if (poeng >= 5) {
  console.log("Sølv");
} else {
  console.log("Prøv igjen");
}
```
:::

:::step {"id":"practice","caption":"Legg til ett spørsmål med else if."}
## Test ett tall om gangen

Her er poengene `10`, og konsollen viser `Gull`. Forutsi beskjeden for de andre verdiene i tabellen, og prøv dem én om gangen i kodeverkstedet.

| Poeng | Beskjed |
| --- | --- |
| 4 | Prøv igjen |
| 5 | Sølv |
| 9 | Sølv |
| 10 | Gull |

```js example
const poeng = 10;
if (poeng >= 10) {
  console.log("Gull");
} else if (poeng >= 5) {
  console.log("Sølv");
} else {
  console.log("Prøv igjen");
}
```
:::

:::step {"id":"check","caption":"Legg til ett spørsmål med else if."}
## Rekkefølgen teller

Her står sølvspørsmålet **før** gullspørsmålet, og poengene er `10`. Forutsi beskjeden før du åpner **Resultat**.

**Stopp og forklar:** Hvorfor skriver programmet `Sølv` selv om 10 poeng skulle gi gull?

**Svar:** 10 er også større enn eller lik 5. Sølvspørsmålet gir `true` først, og da hoppes resten av valget over. Gullspørsmålet blir aldri undersøkt. Derfor sjekker originaleksempelet gullgrensen før sølvgrensen.

```js example
const poeng = 10;
if (poeng >= 5) {
  console.log("Sølv");
} else if (poeng >= 10) {
  console.log("Gull");
} else {
  console.log("Prøv igjen");
}
```
:::
