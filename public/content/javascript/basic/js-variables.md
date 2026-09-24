:::step {"id":"box","caption":"To esker: navn inneholder «Ada», og poeng inneholder 0.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":0}
## Programmer må huske ting

Tenk på en handlekurv. Nettsiden må huske hvor mange varer du har lagt i den. Et spill må huske poengsummen din. En side du har logget inn på, må huske navnet ditt.

Til dette bruker vi **variabler**. En variabel er som en **eske med en merkelapp**:

- **Merkelappen** er variabelens *navn*, for eksempel `poeng`.
- **Innholdet** er variabelens *verdi*, for eksempel `0`.

Når programmet trenger verdien, leter det opp esken med riktig merkelapp og ser hva som ligger i den.
:::

:::step {"id":"create","caption":"let navn = \"Ada\" lager en variabel som heter navn og har verdien «Ada».","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":0}
## Lag en variabel

```js
let navn = "Ada";
```

Slik leser du linjen:

- `let` betyr «lag en ny variabel».
- `navn` er merkelappen. Du velger navnet selv.
- `=` betyr «legg denne verdien i esken». Det betyr ikke «er lik», slik det gjør i matte.
- `"Ada"` er verdien som legges i esken.

Les linjen høyt slik: «Lag en variabel som heter navn, og legg Ada i den.»
:::

:::step {"id":"use","caption":"console.log(navn) skriver Ada. Uten anførselstegn slår JavaScript opp verdien i variabelen.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":1}
## Bruk variabelen

Når du skriver navnet på variabelen, henter JavaScript verdien som ligger i den:

```js
console.log(navn);   // skriver: Ada
console.log("navn"); // skriver: navn
```

Legg merke til forskjellen. **Uten** anførselstegn betyr `navn` «se i esken som heter navn». **Med** anførselstegn er det bare ordet «navn».

Du kan også skrive flere verdier på én gang. Skill dem med komma: `console.log(navn, "har", poeng, "poeng")`.
:::

:::step {"id":"change","caption":"poeng endres fra 0 til 10, og så til 15. Konsollen viser verdien slik den er på hver linje.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":2}
## Bytt ut verdien

Det nyttige med variabler er at verdien kan **endres** mens programmet kjører. Tenk på en poengtavle:

```js
poeng = 10;
```

Nå ligger `10` i esken i stedet for `0`. Du skriver ikke `let` en gang til. `let` bruker du bare når variabelen lages første gang.
:::

:::step {"id":"update","caption":"poeng = poeng + 5 leser den gamle verdien 10, legger til 5 og lagrer 15.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":3}
## Regn ut en ny verdi fra den gamle

```js
poeng = poeng + 5;
```

Dette ser rart ut hvis du tenker på matte. Husk at `=` betyr «legg i esken». Les derfor **høyresiden først**:

1. Hent verdien i `poeng`. Den er `10`.
2. Regn ut `10 + 5`. Svaret er `15`.
3. Legg `15` i esken `poeng`.

Det er slik et spill gir deg poeng eller en handlekurv teller varer.
:::

:::step {"id":"const","caption":"maksPoeng er laget med const og skal ha samme verdi hele tiden.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":4}
## let eller const?

Det finnes to vanlige måter å lage en variabel på:

- **[[js-let|let]]** brukes når verdien skal kunne byttes ut senere, for eksempel en poengsum.
- **[[js-const|const]]** (kort for *konstant*) brukes når verdien skal være den samme hele tiden, for eksempel høyeste mulige poengsum.

Prøver du å gi en `const` en ny verdi, stopper programmet med en feilmelding. Det er en fordel: JavaScript passer på at du ikke endrer noe ved et uhell.

**Tips:** Mange bruker `const` som standard og bytter til `let` bare når verdien må endres.
:::

:::step {"id":"names","caption":"Gode navn gjør koden lett å lese, også for deg selv neste uke.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":4}
## Gode variabelnavn

Et godt navn forteller hva verdien *er*. `antallVarer` sier mer enn `x`.

Noen regler du må følge:

- Ingen mellomrom. Skriv ord sammen og start hvert nytt ord med stor bokstav: `maksPoeng`, `antallVarer`.
- Navnet kan ikke starte med et tall.
- Store og små bokstaver er forskjellige. `poeng` og `Poeng` er to ulike variabler.
- Hold deg gjerne til a–z. Da slipper du trøbbel med æ, ø og å.
:::

:::step {"id":"practice","caption":"Konsollen viser ny poengsum og ditt eget navn. En const kan ikke få ny verdi.","trace":["Lag esken navn og legg «Ada» i den.","Lag esken poeng og legg 0 i den.","Bytt innholdet i poeng til 10.","Regn ut 10 + 5 og legg 15 i poeng.","Lag maksPoeng. Den skal aldri endres."],"traceActive":3}
## Prøv selv

Åpne kodeverkstedet:

1. Bytt `"Ada"` med ditt eget navn.
2. La `poeng` øke med 20 i stedet for 5. Hvilken sum tror du konsollen viser?
3. Lag en ny variabel, `let antallLiv = 3;`, og skriv den ut med `console.log`.
4. Prøv å skrive `maksPoeng = 200;` nederst. Les feilmeldingen i konsollen.

**Sjekk forståelsen:** Hva er forskjellen på `console.log(poeng)` og `console.log("poeng")`?
:::
