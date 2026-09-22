:::step {"id":"concept","caption":"Forstå hvor navn finnes og når funksjoner kjøres.","traceActive":-1}
## Hva lærer du?

Scope er området et navn er tilgjengelig i. let og const har blokkscope. Et navn laget inne i en funksjon er vanligvis ikke tilgjengelig utenfor. En indre funksjon kan huske navn fra sitt ytre scope; dette kalles en closure.
:::

:::step {"id":"mechanism","caption":"Forstå hvor navn finnes og når funksjoner kjøres.","traceActive":-1}
## Fra handling til resultat

En pilfunksjon er en kort funksjonsform: `x => x * 2`. Den har ikke sin egen this. En funksjonsdeklarasjon og en pilfunksjon lagret i const er derfor ikke alltid utskiftbare. Callbacks brukes blant annet av event-lyttere og arraymetoder.
:::

:::step {"id":"code","caption":"Forstå hvor navn finnes og når funksjoner kjøres.","traceActive":-1}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"Hvert kall til lagTeller oppretter et nytt scope. Callbacken beholder tilgang til sin egen antall-variabel.","traceActive":-1}
## Prøv selv

Opprett en ekstra teller med lagTeller(). Logg et kall til hver teller og se at de husker hver sin verdi.

**Dette skal du se:** Hvert kall til lagTeller oppretter et nytt scope. Callbacken beholder tilgang til sin egen antall-variabel.
:::
