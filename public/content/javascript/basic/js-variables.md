:::step {"id":"value","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":0}
## Et navn på en verdi

Et program trenger ofte å huske en verdi. En **variabel** knytter et navn til en verdi, slik at vi kan bruke verdien senere. Her vil vi huske teksten `Ada` under navnet `navn`.
:::

:::step {"id":"create","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":0}
## Lag variabelen

Se på første linje:

```js
let navn = "Ada";
```

`let` lager en ny variabel. `navn` er navnet vi velger. `=` gir variabelen verdien til høyre, som her er teksten `"Ada"`. Les linjen som «lag navn og gi den verdien Ada».

Her betyr `=` **tilordning**: gi en verdi. Det er ikke et spørsmål om to ting er like.
:::

:::step {"id":"read","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":1}
## Hent verdien

Andre linje er `console.log(navn);`. Uten anførselstegn slår `navn` opp verdien til variabelen. Konsollen viser `Ada`. Variabelen må lages før denne linjen bruker den.
:::

:::step {"id":"quotes","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":1}
## Navn eller tekst?

Forutsi resultatet hvis du setter anførselstegn rundt `navn` i den andre linjen. Prøv det.

`console.log("navn");` skriver ordet `navn`. Anførselstegn gjør det til tekst. Fjern dem igjen for å lese variabelen.
:::

:::step {"id":"practice","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":2}
## Gi variabelen din egen verdi

Bytt `Ada` med ditt eget navn på første linje. Kjør. Endre deretter variabelnavnet fra `navn` til `fornavn` **på begge linjene** og kjør igjen. Resultatet skal være det samme.

Variabelnavn kan ikke ha mellomrom eller starte med et tall. Store og små bokstaver er forskjellige: `navn` og `Navn` er ulike navn.
:::

:::step {"id":"check","caption":"Gi en verdi et navn og hent verdien med navnet.","trace":["Lag variabelen navn med verdien Ada.","Hent verdien i navn.","Skriv Ada i konsollen."],"traceActive":0}
## Sjekk at du forstår

**Stopp og forklar:** Hvilken linje husker verdien, og hvilken linje viser den?

**Svar:** `let navn = "Ada";` lager variabelen med verdien. `console.log(navn);` henter og skriver verdien. Å lage en variabel alene gir ingen utskrift.
:::
