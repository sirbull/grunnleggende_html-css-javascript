:::step {"id":"concept","caption":"Skill mellom kode som registreres nå og kode som kjører senere.","traceActive":-1}
## Hva lærer du?

En [[dom-event|hendelse]] forteller at noe har skjedd. Click betyr at en kontroll er aktivert. Bruk en ekte button, så får du støtte for både mus og tastatur. En lytter registreres med addEventListener.
:::

:::step {"id":"mechanism","caption":"Skill mellom kode som registreres nå og kode som kjører senere.","traceActive":-1}
## Fra handling til resultat

Funksjonen som gis til lytteren er en callback. Nettleseren kaller den når hendelsen skjer. `event.currentTarget` er elementet lytteren er registrert på. `event.target` kan være et barn inni elementet.
:::

:::step {"id":"practice","caption":"Samme click-lytter virker med flere inndatametoder. Funksjonen gis som tellKlikk, uten parenteser, slik at den kjøres ved hendelsen.","traceActive":-1}
## Prøv selv

Aktiver knappen med Enter og Space. Endre meldingen når antall blir større enn 3.

**Dette skal du se:** Samme click-lytter virker med flere inndatametoder. Funksjonen gis som tellKlikk, uten parenteser, slik at den kjøres ved hendelsen.
:::
