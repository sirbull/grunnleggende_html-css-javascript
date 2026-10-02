:::step {"id":"start","caption":"Se forskjellen på å lage en variabel og å endre den.","trace":["Lag poeng med verdien 0.","Skriv 0.","Gi poeng verdien 10.","Skriv 10."],"traceActive":0}
## Begynn med en verdi

Første linje lager variabelen `poeng` med tallet `0`. Tall skrives uten anførselstegn. Andre linje skriver verdien, så konsollen får `0`.
:::

:::step {"id":"replace","caption":"Se forskjellen på å lage en variabel og å endre den.","trace":["Lag poeng med verdien 0.","Skriv 0.","Gi poeng verdien 10.","Skriv 10."],"traceActive":2}
## Bytt ut verdien

`poeng = 10;` gir den samme variabelen en ny verdi. Den gamle verdien blir erstattet. Vi skriver ikke `let` på nytt, fordi variabelen allerede finnes.
:::

:::step {"id":"result","caption":"Se forskjellen på å lage en variabel og å endre den.","trace":["Lag poeng med verdien 0.","Skriv 0.","Gi poeng verdien 10.","Skriv 10."],"traceActive":3}
## Følg verdien gjennom programmet

Siste linje leser verdien etter endringen. Konsollen viser:

```text
0
10
```

Den første utskriften endres ikke i ettertid. Den viser verdien slik den var da linjen kjørte.
:::

:::step {"id":"practice","caption":"Se forskjellen på å lage en variabel og å endre den.","trace":["Lag poeng med verdien 0.","Skriv 0.","Gi poeng verdien 7.","Skriv 7.","Gi poeng verdien 2.","Skriv 2."],"traceActive":5}
## Forutsi en ny utskrift

Her er `10` byttet med `7`, og to nye linjer står nederst: `poeng = 2;` og `console.log(poeng);`. Forutsi hvilke tall konsollen viser, og åpne **Resultat**. Det står `0`, `7` og `2`: én utskrift for hver `console.log`, med verdien variabelen hadde akkurat da.

```js example
let poeng = 0;
console.log(poeng);
poeng = 7;
console.log(poeng);
poeng = 2;
console.log(poeng);
```
:::

:::step {"id":"check","caption":"Se forskjellen på å lage en variabel og å endre den.","trace":["Lag poeng med verdien 0.","Skriv 0.","Gi poeng verdien 10.","Skriv 10."],"traceActive":2}
## Lage eller endre?

**Stopp og forklar:** Hvorfor står `let` bare på første linje?

**Svar:** Første linje lager variabelen. Senere bruker vi det eksisterende navnet for å bytte verdien.
:::
