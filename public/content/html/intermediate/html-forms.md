:::step {"id":"concept","caption":"Knytt label, input og knapp sammen.","highlight":""}
## Hva lærer du?

Et skjema samler opplysninger brukeren skriver inn. En `label` beskriver feltet og kobles til det med `for` og samme verdi i input-elementets `id`. Placeholder er et eksempel inne i feltet og erstatter ikke en synlig label.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

Velg type etter opplysningen: email for e-post, number for tall og checkbox for av/på. `name` er nøkkelen som sendes inn. `required` markerer obligatoriske felt og aktiverer nettleserens validering. Eksempelet sender ikke data; JavaScript viser en lokal bekreftelse.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Nettleseren varsler om manglende eller ugyldige felt. En ekte tjeneste må også kontrollere data på serveren; nettleservalidert betyr ikke sikker data.","highlight":""}
## Prøv selv

Legg til et felt for navn med label, unik id og required. Prøv å sende skjemaet tomt, og deretter med gyldige verdier.

**Dette skal du se:** Nettleseren varsler om manglende eller ugyldige felt. En ekte tjeneste må også kontrollere data på serveren; nettleservalidert betyr ikke sikker data.
:::
