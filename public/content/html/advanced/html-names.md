:::step {"id":"concept","caption":"Gi kontroller et navn som forklarer handlingen.","highlight":""}
## Hva lærer du?

Et tilgjengelig navn er teksten hjelpemidler bruker for en kontroll. En button får vanligvis navnet fra knappeteksten. Et skjemafelt får navnet fra label. Begynn med synlig tekst som alle brukere kan forstå.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

`aria-describedby` knytter en ekstra forklaring til et felt. `aria-label` kan gi navn når det ikke finnes synlig tekst, men bør ikke brukes til å overstyre et godt synlig navn. ARIA gir ikke automatisk tastaturstøtte eller klikkoppførsel.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Feltet har både navn og beskrivelse. Den synlige labelen er også nyttig for den som bruker tale til å klikke på kontroller.","highlight":""}
## Prøv selv

Skriv en presis hjelpetekst om ønsket brukernavn. Kontroller at id i aria-describedby peker til teksten.

**Dette skal du se:** Feltet har både navn og beskrivelse. Den synlige labelen er også nyttig for den som bruker tale til å klikke på kontroller.
:::
