:::step {"id":"list","caption":"Les én verdi om gangen fra et array."}
## Ett navn på flere verdier

Et **array** er en ordnet liste med verdier. Her er de tre verdiene tekst. Hakeparentesene `[` og `]` avgrenser listen, og komma skiller verdiene.
:::

:::step {"id":"index","caption":"Les én verdi om gangen fra et array."}
## Plassene telles fra null

`navn[0]` henter verdien på første plass: `Ada`. Plassnummeret kalles en **indeks**. Her er indeksene 0 for Ada, 1 for Bo og 2 for Cleo.
:::

:::step {"id":"length","caption":"Les én verdi om gangen fra et array."}
## Finn antallet

`navn.length` gir antall verdier i listen, som er `3`. Punktumet brukes her til å lese egenskapen `length` på arrayet. Antallet og siste indeks er forskjellige: siste indeks er `2`.
:::

:::step {"id":"practice","caption":"Les én verdi om gangen fra et array."}
## Les en annen plass

Bytt `navn[0]` med `navn[1]`. Forutsi og kjør: første utskrift blir `Bo`. Legg deretter til `"Dina"` sist i selve listen. Lengden blir `4`, og Dina har indeks `3`.
:::

:::step {"id":"change","caption":"Les én verdi om gangen fra et array."}
## Legg til mens programmet kjører

Sett inn `navn.push("Dina");` rett før utskriftene i originalen. `push(...)` legger en ny verdi sist i listen. Lengden blir `4`.

`const` hindrer at variabelen tilordnes en annen liste. Det hindrer ikke at innholdet i den samme listen endres.
:::

:::step {"id":"check","caption":"Les én verdi om gangen fra et array."}
## Sjekk indeks og lengde

**Stopp og forklar:** Hvilken indeks har siste verdi når listen har fire verdier?

**Svar:** `3`, fordi vi starter på null. Prøv `navn[navn.length - 1]` for å hente siste verdi.
:::
