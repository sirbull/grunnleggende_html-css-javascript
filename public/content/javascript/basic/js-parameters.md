:::step {"id":"input","caption":"Bruk én parameter og prøv to ulike kall."}
## Samme jobb, forskjellig verdi

En funksjon kan ta imot en verdi når den kalles. Her skal funksjonen hilse på navnet vi sender inn. Selve instruksjonen for hilsenen skrives bare én gang.
:::

:::step {"id":"parameter","caption":"Bruk én parameter og prøv to ulike kall."}
## Navnet i deklarasjonen

`navn` i `function hils(navn)` er en **parameter**. Den fungerer som en lokal variabel inne i funksjonen. Hvert kall gir den en verdi. Du skal ikke skrive `let` foran parameteren.
:::

:::step {"id":"argument","caption":"Bruk én parameter og prøv to ulike kall."}
## Verdien i kallet

`hils("Ada");` sender teksten `Ada` til funksjonen. Den konkrete verdien i kallet kalles et **argument**. Under dette kallet har parameteren `navn` verdien `Ada`. Hilsenen blir `Hei, Ada!`.
:::

:::step {"id":"practice","caption":"Bruk én parameter og prøv to ulike kall."}
## Kall med en annen verdi

Legg til `hils("Bo");` nederst. Forutsi begge hilsener og kjør. Andre kall gir parameteren verdien `Bo` for den kjøringen av funksjonen.
:::

:::step {"id":"check","caption":"Bruk én parameter og prøv to ulike kall."}
## Pek på parameter og argument

**Stopp og forklar:** Hva er parameteren, og hva er argumentet i `hils("Bo")`?

**Svar:** Parameteren heter `navn` i deklarasjonen. Argumentet er teksten `"Bo"` i kallet. Prøv ditt eget navn før du går videre.
:::
