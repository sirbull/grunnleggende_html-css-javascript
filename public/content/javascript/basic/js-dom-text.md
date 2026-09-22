:::step {"id":"concept","caption":"Koble en JavaScript-verdi til tekst på siden.","traceActive":-1}
## Hva lærer du?

[[dom-queryselector|querySelector()]] tar en CSS-selektor og returnerer det første treffet. Hvis ingen elementer passer, får du null. `#resultat` betyr elementet med id resultat.
:::

:::step {"id":"mechanism","caption":"Koble en JavaScript-verdi til tekst på siden.","traceActive":-1}
## Fra handling til resultat

[[dom-textcontent|textContent]] erstatter tekstinnholdet. Det parser ikke HTML. `innerHTML` tolker tekst som HTML og skal ikke brukes ukritisk på brukerdata. Bruk [[dom-classlist|classList]] for å endre stil med klasser.
:::

:::step {"id":"code","caption":"Koble en JavaScript-verdi til tekst på siden.","traceActive":-1}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"Når elementet finnes, endres teksten og klassen. HTML-filen på disken er uendret; du endrer den levende DOM-strukturen.","traceActive":-1}
## Prøv selv

Endre selektoren til en id som ikke finnes. Legg merke til at if-sjekken hindrer en feil. Sett tilbake riktig id.

**Dette skal du se:** Når elementet finnes, endres teksten og klassen. HTML-filen på disken er uendret; du endrer den levende DOM-strukturen.
:::
