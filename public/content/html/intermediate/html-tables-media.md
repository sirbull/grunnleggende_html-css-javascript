:::step {"id":"concept","caption":"Bruk riktig struktur for data og medier.","highlight":""}
## Hva lærer du?

En tabell passer når radene og kolonnene har en sammenheng, for eksempel en timeplan. Bruk caption for tabellens navn og th for overskriftsceller. Tabeller skal ikke brukes til å plassere vanlig sideinnhold.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

`scope="col"` knytter kolonneoverskriften til cellene under. `scope="row"` brukes for radoverskrifter. For video og lyd gir controls brukeren styring. Video med tale trenger teksting, og lyd bør ha en tekstlig gjengivelse. Ikke start lyd automatisk.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example html

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Tabellen beholder sammenhengen mellom fag og tidspunkt. For å legge til en videofil på egen side kan du bruke video med controls og et track-element for teksting.","highlight":""}
## Prøv selv

Legg til en rad med et nytt fag. Bytt tidene. Kontroller at hver rad fortsatt har én celle per kolonne.

**Dette skal du se:** Tabellen beholder sammenhengen mellom fag og tidspunkt. For å legge til en videofil på egen side kan du bruke video med controls og et track-element for teksting.
:::
