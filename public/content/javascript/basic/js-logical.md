:::step {"id":"and","caption":"Undersøk og, eller og ikke hver for seg."}
## Begge må være sanne

`&&` betyr **og**. Med to boolske verdier gir uttrykket `true` bare når begge er `true`. Her har personen billett, men stedet er ikke åpent. Utskriften er derfor `false`.
:::

:::step {"id":"practice-and","caption":"Undersøk og, eller og ikke hver for seg."}
## Prøv og først

Her er `erApen` endret til `true`. Nå er begge verdiene `true`, og konsollen viser `true`. Prøv selv å sette `harBillett` til `false`: da blir svaret `false` igjen. Du har testet at begge må være sanne.

```js example
const harBillett = true;
const erApen = true;
console.log(harBillett && erApen);
```
:::

:::step {"id":"or","caption":"Undersøk og, eller og ikke hver for seg."}
## Minst én må være sann

Her er startverdiene tilbake, men `&&` er byttet med `||`, som betyr **eller**. For boolske verdier er det nok at minst én er `true`. Med `true` og `false` får du derfor `true`. Prøv selv med to `false`, som gir `false`.

```js example
const harBillett = true;
const erApen = false;
console.log(harBillett || erApen);
```
:::

:::step {"id":"not","caption":"Undersøk og, eller og ikke hver for seg."}
## Snu ett svar

Her er siste linje byttet med `console.log(!erApen);`. `!` betyr **ikke** og snur en boolsk verdi. `erApen` er `false`, så `!erApen` blir `true`. Hvis `erApen` er `true`, blir resultatet `false`.

```js example
const harBillett = true;
const erApen = false;
console.log(!erApen);
```
:::

:::step {"id":"check","caption":"Undersøk og, eller og ikke hver for seg."}
## Bruk svaret i if

Her er siste linje byttet med en if-setning som bruker `harBillett && erApen` som betingelse. Åpne **Resultat**: ingen beskjed skrives så lenge stedet er stengt.

**Sjekk:** Sett `erApen` til `true` i kodeverkstedet og kjør igjen for å få hilsenen. Forklar hvilket spørsmål `if` får svaret på.

```js example
const harBillett = true;
const erApen = false;
if (harBillett && erApen) {
  console.log("Velkommen!");
}
```
:::
