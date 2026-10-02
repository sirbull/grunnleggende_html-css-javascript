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

Her er alderen endret til `18`. Nå får `erVoksen` verdien `true`, og det er det konsollen viser.

Prøv selv å erstatte sammenligningen med bare `false`, altså `const erVoksen = false;`. Det er også en gyldig boolsk verdi.

```js example
const alder = 18;
const erVoksen = alder >= 18;
console.log(erVoksen);
```
:::

:::step {"id":"check","caption":"Lagre et ja/nei-svar i en variabel."}
## Tekst eller boolean?

**Stopp og forklar:** Er `"false"` og `false` samme type?

**Svar:** Nei. `"false"` er tekst fordi den har anførselstegn. `false` er en boolean. Koden ved siden av undersøker forskjellen med `typeof`, og konsollen viser `string` og `boolean`.

```js example
console.log(typeof "false");
console.log(typeof false);
```
:::
