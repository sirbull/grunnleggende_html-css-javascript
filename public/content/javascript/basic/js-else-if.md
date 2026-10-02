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

Hvis begge spørsmål gir `false`, kjører siste `else`. Den skriver `Prøv igjen`. Det er alternativet for verdier som ikke passet til noen av spørsmålene.
:::

:::step {"id":"practice","caption":"Legg til ett spørsmål med else if."}
## Test ett tall om gangen

Forutsi og kjør med `4`, `5`, `9` og `10`.

| Poeng | Beskjed |
| --- | --- |
| 4 | Prøv igjen |
| 5 | Sølv |
| 9 | Sølv |
| 10 | Gull |
:::

:::step {"id":"check","caption":"Legg til ett spørsmål med else if."}
## Rekkefølgen teller

**Stopp og forklar:** Hvorfor sjekker vi gullgrensen før sølvgrensen?

**Svar:** 10 er også større enn eller lik 5. Hvis sølvspørsmålet stod først, ville 10 valgt sølv, og gullspørsmålet ville ikke blitt undersøkt.
:::
