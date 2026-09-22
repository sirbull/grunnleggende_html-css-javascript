:::step {"id":"concept","caption":"Forstå hvorfor \"2\" og 2 ikke alltid oppfører seg likt.","traceActive":-1}
## Hva lærer du?

JavaScript har flere datatyper. En string er tekst i anførselstegn. Et number er et tall. En boolean er true eller false. `null` kan brukes for en bevisst tom verdi, mens undefined ofte betyr at en verdi ikke er satt.
:::

:::step {"id":"mechanism","caption":"Forstå hvorfor \"2\" og 2 ikke alltid oppfører seg likt.","traceActive":-1}
## Fra handling til resultat

Pluss kan både legge sammen tall og sette sammen tekst. `"2" + 3` gir teksten "23". `Number("2") + 3` gir tallet 5. Et input-felts value er vanligvis tekst selv om du forventer et tall. `typeof` kan hjelpe deg å undersøke typen.
:::

:::step {"id":"code","caption":"Forstå hvorfor \"2\" og 2 ikke alltid oppfører seg likt.","traceActive":-1}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"En tekst som ikke kan tolkes som et tall gir NaN ved Number-konvertering. Bruk Number.isNaN for å kontrollere dette før videre beregning.","traceActive":-1}
## Prøv selv

Bytt "2" til "7" og forutsi resultatet. Prøv deretter Number("hei").

**Dette skal du se:** En tekst som ikke kan tolkes som et tall gir NaN ved Number-konvertering. Bruk Number.isNaN for å kontrollere dette før videre beregning.
:::
