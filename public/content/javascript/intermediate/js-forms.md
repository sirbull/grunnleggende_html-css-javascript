:::step {"id":"concept","caption":"Les en verdi og gi en forståelig tilbakemelding.","traceActive":-1}
## Hva lærer du?

Lytt på submit i selve skjemaet. Da fungerer innsending både med knappen og med Enter i et felt. `event.preventDefault()` hindrer standardhandlingen slik at eksempelet kan behandle data lokalt.
:::

:::step {"id":"mechanism","caption":"Les en verdi og gi en forståelig tilbakemelding.","traceActive":-1}
## Fra handling til resultat

Et input-felts value er tekst. Bruk trim for å fjerne blanke tegn rundt verdien. Vis en konkret melding hvis innholdet er tomt. Ikke flytt fokus unødvendig når du bare oppdaterer en statusmelding.
:::

:::step {"id":"code","caption":"Les en verdi og gi en forståelig tilbakemelding.","traceActive":-1}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"Trim fjerner ytre blanke tegn. Brukeren får en lokal melding. En virkelig innsending må også valideres på serveren.","traceActive":-1}
## Prøv selv

Prøv både tom tekst og tekst med mellomrom rundt. Legg til et required-attributt og sammenlign nettleserens validering.

**Dette skal du se:** Trim fjerner ytre blanke tegn. Brukeren får en lokal melding. En virkelig innsending må også valideres på serveren.
:::
