:::step {"id":"concept","caption":"Tilpass plass, enheter og fokus til brukeren.","highlight":""}
## Hva lærer du?

Responsive sider tilpasser seg plassen de får. Prosent følger en relevant beholder, rem følger rotens skriftstørrelse og vw følger bredden på visningsområdet. Bruk max-width: 100% på bilder som skal kunne krympe.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

En media query som `@media (min-width: 600px)` gjelder når visningsområdet er bredt nok. Custom properties, for eksempel `--accent`, samler verdier du vil gjenbruke. `:focus-visible` gjør tastaturfokus tydelig, og :hover kan supplere for mus.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example css

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Samme variabel endrer flere regler. Fokusmarkeringen er synlig uten mus. På små skjermer står innholdet under hverandre.","highlight":""}
## Prøv selv

Endre verdien i --accent. Flytt fokus til knappen med Tab. Juster media query slik at layouten skifter tidligere.

**Dette skal du se:** Samme variabel endrer flere regler. Fokusmarkeringen er synlig uten mus. På små skjermer står innholdet under hverandre.
:::
