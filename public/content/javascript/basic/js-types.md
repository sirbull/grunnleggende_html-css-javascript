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

Legg til `console.log(typeof tall);` nederst og kjør. `typeof` spør hvilken type verdien har, og svaret er `number`. Prøv så `console.log(typeof tekst);`, som gir `string`.
:::

:::step {"id":"check","caption":"Se hvorfor 2 og \"2\" gir forskjellige svar."}
## Forutsi før du kjører

Bytt siste linje i originaleksempelet med `console.log("2" + 3);`.

**Svar:** Det blir teksten `23`. Når `+` får en tekst på en av sidene, settes verdiene sammen som tekst. Sett tilbake originalen. Senere skal vi lære å gjøre tekst fra et skjema om til tall.
:::
