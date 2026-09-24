:::step {"id":"kinds","caption":"Tre variabler med tre ulike typer verdier: tekst, tall og sant/usant.","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":0}
## Verdier finnes i ulike typer

Tenk på et påmeldingsskjema. Du skriver inn **navnet** ditt, som er tekst. Du skriver inn **alderen** din, som er et tall. Og du krysser av for om du **godtar vilkårene**, som er ja eller nei.

JavaScript skiller på samme måte mellom ulike *typer* verdier. De tre du kommer til å bruke mest, er:

| Type | Hva det er | Eksempel |
| --- | --- | --- |
| string | tekst | `"Ada"` |
| number | tall | `15` |
| boolean | sant eller usant | `true` |

Typen bestemmer hva du kan gjøre med verdien. Du kan regne med tall, men ikke med et navn.
:::

:::step {"id":"string","caption":"\"Hei, \" + navn + \"!\" setter sammen tre biter til teksten «Hei, Ada!».","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":0}
## Tekst: string

En **[[js-string|string]]** er tekst. Den står alltid i anførselstegn, enten `"doble"` eller `'enkle'`.

```js
const navn = "Ada";
const telefon = "912 34 567";
```

Et telefonnummer er også tekst, selv om det består av sifre. Du skal jo aldri regne med det.

Med `+` kan du **sette sammen** tekst:

```js
console.log("Hei, " + navn + "!"); // Hei, Ada!
```

Legg merke til mellomrommet etter kommaet i `"Hei, "`. JavaScript legger ikke til mellomrom av seg selv.
:::

:::step {"id":"number","caption":"alder + 1 gir 16. Tall kan brukes i utregninger.","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":1}
## Tall: number

Et **[[js-number|number]]** er et tall. Det står **uten** anførselstegn.

```js
const alder = 15;
const pris = 49.90;
```

Desimaltall skrives med **punktum**, ikke komma: `49.90`, ikke `49,90`.

Med tall kan du regne: `+` pluss, `-` minus, `*` gange og `/` dele. `alder + 1` gir `16`.
:::

:::step {"id":"boolean","caption":"alder >= 18 spør om alderen er 18 eller mer. Svaret er false.","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":2}
## Sant eller usant: boolean

En **[[js-boolean|boolean]]** har bare to mulige verdier: `true` (sant) eller `false` (usant). De skrives uten anførselstegn.

Booleans brukes til ja/nei-spørsmål:

```js
const erInnlogget = true;
const harBetalt = false;
```

Du får også en boolean når du **sammenligner** to verdier. `alder >= 18` spør «er alderen 18 eller mer?». Siden alder er 15, blir svaret `false`.

Senere bruker du slike svar til å la programmet velge. Et eksempel: vis «Logg ut» hvis `erInnlogget` er `true`.
:::

:::step {"id":"trap","caption":"\"2\" + 3 gir teksten «23». 2 + 3 gir tallet 5.","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":3}
## Når "2" ikke er 2

Her er en felle mange går i:

```js
console.log("2" + 3); // 23
console.log(2 + 3);   // 5
```

`"2"` i anførselstegn er tekst. Når du bruker `+` på tekst, *setter* JavaScript sammen i stedet for å *legge sammen*. Resultatet blir teksten `23`.

Dette betyr noe i praksis. Det en bruker skriver i et felt på en nettside, er alltid tekst, også når det er et tall. Da må du gjøre det om til et tall først, for eksempel med `Number("2")`.

Er du usikker på typen, kan du spørre med `typeof`. Det gir svaret `"string"`, `"number"` eller `"boolean"`.
:::

:::step {"id":"practice","caption":"Med anførselstegn blir verdien tekst. Uten anførselstegn blir den et tall eller en boolean.","trace":["navn får teksten «Ada».","alder får tallet 15.","erInnlogget får verdien true.","Hver type kan brukes til sine egne ting."],"traceActive":3}
## Prøv selv

Åpne kodeverkstedet:

1. Endre alderen til 20. Hva skriver `alder >= 18` nå?
2. Sett anførselstegn rundt tallet: `const alder = "15";`. Hva skjer med `alder + 1`? Hva sier `typeof`?
3. Lag en variabel `const likerKatter = true;` og skriv den ut.

**Sjekk forståelsen:** Hvilken type er `"true"` med anførselstegn?

**Visste du?** En variabel som er laget uten verdi, får verdien `undefined`, som betyr «ingen verdi ennå». Du møter den igjen senere.
:::
