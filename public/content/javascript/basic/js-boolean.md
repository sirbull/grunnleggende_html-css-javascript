:::step {"id":"boolean","caption":"Lagre et ja/nei-svar i en variabel."}
## En type med to verdier

[[js-boolean|boolean]] er typen for `true` og `false`: sant eller usant. Du har allerede sett slike verdier som svar på sammenligninger. Nå lagrer vi svaret.
:::

:::step {"id":"save","caption":"Lagre et ja/nei-svar i en variabel."}
## Lagre sammenligningen

På andre linje regnes `alder >= 18` ut først. Siden alderen er 17, blir svaret `false`. Variabelen `erVoksen` får denne verdien.
:::

:::step {"id":"read","caption":"Lagre et ja/nei-svar i en variabel."}
## Les svaret senere

Siste linje skriver `false`. `erVoksen` inneholder et svar, ikke en regel som automatisk regnes ut på nytt. Hvis en annen variabel endres senere, må du gjøre sammenligningen på nytt for å få et nytt svar.
:::

:::step {"id":"practice","caption":"Lagre et ja/nei-svar i en variabel."}
## Prøv begge svar

Endre alderen til `18` og kjør hele programmet på nytt. Nå får `erVoksen` verdien `true`. Prøv så å erstatte sammenligningen med bare `false`. Det er også en gyldig boolsk verdi.
:::

:::step {"id":"check","caption":"Lagre et ja/nei-svar i en variabel."}
## Tekst eller boolean?

**Stopp og forklar:** Er `"false"` og `false` samme type?

**Svar:** Nei. `"false"` er tekst fordi den har anførselstegn. `false` er en boolean. Du kan undersøke forskjellen med `typeof`.
:::
