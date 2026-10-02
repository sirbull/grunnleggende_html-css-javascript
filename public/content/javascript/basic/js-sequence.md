:::step {"id":"order","caption":"Følg tre instruksjoner i den rekkefølgen de står.","trace":["Skriv Først.","Skriv Så.","Skriv Til slutt."],"traceActive":0}
## Instruksjoner har en rekkefølge

Du har skrevet én beskjed. Nå skriver programmet tre. I dette programmet utfører JavaScript den øverste linjen først, deretter den neste og til slutt den nederste.
:::

:::step {"id":"predict","caption":"Følg tre instruksjoner i den rekkefølgen de står.","trace":["Skriv Først.","Skriv Så.","Skriv Til slutt."],"traceActive":1}
## Forutsi utskriften

Les koden ovenfra og ned. Skriv de tre beskjedene på et ark før du åpner **Resultat**. Ikke endre koden ennå.
:::

:::step {"id":"result","caption":"Følg tre instruksjoner i den rekkefølgen de står.","trace":["Skriv Først.","Skriv Så.","Skriv Til slutt."],"traceActive":2}
## Sammenlign med konsollen

Konsollen skal vise:

```text
Først
Så
Til slutt
```

Hver `console.log` gir en egen linje. Programmet skriver ordene i kodens rekkefølge, uansett hva ordene betyr.
:::

:::step {"id":"practice","caption":"Følg tre instruksjoner i den rekkefølgen de står.","trace":["Skriv Til slutt.","Skriv Først.","Skriv Så."],"traceActive":0}
## Flytt én instruksjon

Her er hele linjen med `Til slutt` flyttet øverst. Den er markert. Forutsi utskriften før du åpner **Resultat**. Nå kommer `Til slutt` først.

Prøv det selv i kodeverkstedet: flytt linjen, kjør, og flytt den tilbake.

```js example
console.log("Til slutt");
console.log("Først");
console.log("Så");
```
:::

:::step {"id":"check","caption":"Følg tre instruksjoner i den rekkefølgen de står.","trace":["Skriv Til slutt.","Skriv Først.","Skriv Så."],"traceActive":0}
## Forklar rekkefølgen

**Stopp og forklar:** Hvorfor kommer `Til slutt` først etter flyttingen?

**Svar:** Programmet følger rekkefølgen på instruksjonene. Det tolker ikke betydningen av beskjedene.

```js example
console.log("Til slutt");
console.log("Først");
console.log("Så");
```
:::
