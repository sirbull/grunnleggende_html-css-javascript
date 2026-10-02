:::step {"id":"and","caption":"Undersøk og, eller og ikke hver for seg."}
## Begge må være sanne

`&&` betyr **og**. Med to boolske verdier gir uttrykket `true` bare når begge er `true`. Her har personen billett, men stedet er ikke åpent. Utskriften er derfor `false`.
:::

:::step {"id":"practice-and","caption":"Undersøk og, eller og ikke hver for seg."}
## Prøv og først

Endre bare `erApen` til `true` og kjør. Nå får du `true`. Sett `harBillett` til `false` og kjør igjen. Svaret er `false`. Du har testet at begge må være sanne.
:::

:::step {"id":"or","caption":"Undersøk og, eller og ikke hver for seg."}
## Minst én må være sann

Sett tilbake startverdiene. Bytt `&&` med `||`, som betyr **eller**. For boolske verdier er det nok at minst én er `true`. Med `true` og `false` får du derfor `true`. Prøv også to `false`, som gir `false`.
:::

:::step {"id":"not","caption":"Undersøk og, eller og ikke hver for seg."}
## Snu ett svar

Bytt siste linje med `console.log(!erApen);`. `!` betyr **ikke** og snur en boolsk verdi. Hvis `erApen` er `false`, blir `!erApen` til `true`. Hvis `erApen` er `true`, blir resultatet `false`.
:::

:::step {"id":"check","caption":"Undersøk og, eller og ikke hver for seg."}
## Bruk svaret i if

Gjenopprett startverdiene og bytt siste linje med:

```js
if (harBillett && erApen) {
  console.log("Velkommen!");
}
```

**Sjekk:** Ingen beskjed skrives så lenge stedet er stengt. Sett `erApen` til `true` og kjør igjen for å få hilsenen. Forklar hvilket spørsmål `if` får svaret på.
:::
