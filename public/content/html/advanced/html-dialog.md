:::step {"id":"concept","caption":"Bruk nettleserens innebygde interaksjoner.","highlight":""}
## Hva lærer du?

`details` og `summary` lager et område som kan foldes ut. `dialog` kan åpnes med `showModal()`. Da blir bakgrunnen utilgjengelig for interaksjon, og nettleseren holder tastaturfokuset inne i dialogen.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

Dialogen trenger et navn, for eksempel via aria-labelledby og en overskrift. Sørg for en synlig lukkeknapp. Escape lukker en modal dialog. Etter lukking skal fokus komme tilbake til kontrollen som åpnet den. Ikke sett aria-modal på et område som ikke oppfører seg modalt.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Du kan åpne og lukke uten mus. I eksempelet flyttes fokus eksplisitt tilbake til åpneren ved close-hendelsen.","highlight":""}
## Prøv selv

Åpne dialogen med Tab og Enter i resultatvinduet. Lukk med Escape. Endre teksten i overskriften og kontroller navngivningen.

**Dette skal du se:** Du kan åpne og lukke uten mus. I eksempelet flyttes fokus eksplisitt tilbake til åpneren ved close-hendelsen.
:::
