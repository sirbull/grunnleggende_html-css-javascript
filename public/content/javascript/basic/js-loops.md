:::step {"id":"repeat","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":0}
## En løkke gjentar instruksjoner

En **løkke** lar programmet utføre samme kodeblokk flere ganger. `while` betyr «så lenge». Den sjekker en betingelse før hver runde. Du kjenner allerede variabler, sammenligninger og oppdatering med `teller = teller + 1`.
:::

:::step {"id":"start","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":1}
## Lag telleren først

`let teller = 1;` gir startverdien. `while (teller <= 3)` spør om telleren er mindre enn eller lik 3. Hvis svaret er `true`, kjøres blokken mellom krøllparentesene.
:::

:::step {"id":"round","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":2}
## Følg første runde

Telleren er `1`. Spørsmålet gir `true`. Programmet skriver `1`, og så øker det telleren til `2`. Ved slutten av blokken går programmet tilbake til while-spørsmålet.
:::

:::step {"id":"again","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":3}
## Følg de neste rundene

Med `2` er svaret fortsatt sant: skriv `2` og øk til `3`. Med `3` er svaret også sant: skriv `3` og øk til `4`.

| Før sjekken | `teller <= 3` | Handling |
| --- | --- | --- |
| 1 | true | Skriv 1, øk til 2 |
| 2 | true | Skriv 2, øk til 3 |
| 3 | true | Skriv 3, øk til 4 |
| 4 | false | Avslutt løkken |
:::

:::step {"id":"stop","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":4}
## Forstå hvorfor den stopper

Når telleren er `4`, er betingelsen usann. Blokken hoppes over, og programmet skriver `Ferdig`. Utskriften er `1`, `2`, `3` og `Ferdig` på hver sin linje.

Oppdateringen av telleren er nødvendig. Uten den ville betingelsen alltid være sann i dette eksempelet, og løkken kunne låse nettleserfanen. Behold oppdateringen i øvelsene.
:::

:::step {"id":"practice","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":4}
## Endre bare grensen

Bytt `<= 3` med `<= 2`. Forutsi og kjør. Du skal se `1`, `2` og `Ferdig`. Sett så startverdien til `3`, men behold grensen `2`. Nå skrives bare `Ferdig`, fordi betingelsen er usann før første runde.
:::

:::step {"id":"check","caption":"Bruk en teller, en betingelse og én gjentatt kodeblokk.","trace":["Start teller på 1.","Sjekk teller <= 3.","Hvis sant: skriv teller og øk med 1.","Gå tilbake til sjekken.","Hvis usant: fortsett etter løkken."],"traceActive":4}
## Forklar løkken med egne ord

**Stopp og forklar:** Hva starter telleren, hva endrer den, og hva stopper løkken?

**Svar:** `let teller = 1` setter starten. `teller = teller + 1` endrer verdien hver runde. `teller <= 3` stopper gjentakelsen når svaret blir usant.
:::
