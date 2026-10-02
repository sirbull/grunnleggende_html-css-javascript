:::step {"id":"types","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Verdier har en type

Vi har brukt både tekst og tall. Typen forteller hva slags verdi det er. [[js-number|number]] betyr tall, og [[js-string|string]] betyr tekst. Det er **verdien** som har typen.
:::

:::step {"id":"number","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Et tall kan brukes i regning

`const tall = 2;` lagrer tallet `2`, uten anførselstegn. `tall + 3` legger sammen to tall. Den første utskriften er `5`. Desimaltall skrives med punktum, for eksempel `2.5`.
:::

:::step {"id":"string","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Sifre kan også være tekst

`const tekst = "2";` lagrer en tekst med ett tegn. `tekst + "3"` setter sammen to tekster. Den andre utskriften er `23`. Anførselstegnene er del av koden og vises ikke i utskriften.
:::

:::step {"id":"practice","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Undersøk typen

Her står to nye linjer nederst: `console.log(typeof tall);` og `console.log(typeof tekst);`. `typeof` spør hvilken type verdien har. Åpne **Resultat**: etter `5` og `23` kommer `number` og `string`.

```js example
const tall = 2;
const tekst = "2";
console.log(tall + 3);
console.log(tekst + "3");
console.log(typeof tall);
console.log(typeof tekst);
```
:::

:::step {"id":"check","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Forutsi før du kjører

Her er siste linje byttet med `console.log("2" + 3);`. Forutsi svaret før du åpner **Resultat**.

**Svar:** Det blir teksten `23`. Når `+` får en tekst på en av sidene, settes verdiene sammen som tekst. Senere skal vi lære å gjøre tekst fra et skjema om til tall.

```js example
const tall = 2;
const tekst = "2";
console.log(tall + 3);
console.log("2" + 3);
```
:::
