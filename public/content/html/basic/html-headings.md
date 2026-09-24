:::step {"id":"concept","caption":"h1 er sidens hovedoverskrift. Den forteller hva hele siden handler om.","highlight":"h1"}
## Overskrifter har seks nivåer

HTML har seks overskriftselementer: `h1`, `h2`, `h3`, `h4`, `h5` og `h6`. Tallet er **nivået**. `h1` er det øverste nivået, `h6` det laveste.

[[html-h1|h1]] er **hovedoverskriften**. Den forteller hva hele siden handler om, omtrent som tittelen på en bok. De fleste sider har én h1, øverst.

I eksempelet er hovedoverskriften:

```html
<h1>Filmer jeg liker</h1>
```

Overskrifter er ikke bare stor tekst. De er et **innholdsregister** for siden. Mange som bruker skjermleser, hopper fra overskrift til overskrift for å få oversikt, slik du selv skumleser en avis.
:::

:::step {"id":"levels","caption":"h2 deler siden i deler. h3 er en underdel av h2-en over.","highlight":"h2, h3"}
## Nivåene danner en innholdsfortegnelse

Tenk på overskriftene som kapitler i en bok:

- `h1` er **boktittelen**: *Filmer jeg liker*.
- [[html-h2|h2]] er et **kapittel**: *Eventyr*.
- [[html-h3|h3]] er et **delkapittel** inni kapittelet: *En reise gjennom skogen*.

Hvis du skriver det som en innholdsfortegnelse, ser det slik ut:

```
Filmer jeg liker          (h1)
  Eventyr                 (h2)
    En reise gjennom skogen (h3)
```

To regler holder deg på rett spor:

1. **Ikke hopp over nivåer nedover.** Etter en h2 kommer h3, ikke h4.
2. **Velg nivå etter betydning, ikke størrelse.** Vil du ha en mindre overskrift, endrer du størrelsen med CSS senere. Nivået skal beskrive hvor delen hører hjemme.
:::

:::step {"id":"mechanism","caption":"Avsnitt skrives med p. em gir trykk på et ord, og strong markerer noe som viktig.","highlight":"p"}
## Avsnitt og ord med trykk

Vanlig tekst legges i [[html-p|avsnitt]] med `p`. Hvert avsnitt er én tanke eller ett lite tema. Når du begynner på en ny tanke, lager du et nytt `p`-element.

Nettleseren bryr seg ikke om linjeskift og ekstra mellomrom i koden. Disse to linjene vises helt likt:

```html
<p>Hei     på    deg</p>
<p>Hei på deg</p>
```

Vil du ha luft mellom tekster, lager du nye avsnitt og styrer avstanden med CSS senere. Ikke bruk mange `<br>`-tagger for å lage mellomrom.

Inni et avsnitt kan du markere enkeltord:

- `em` gir **trykk** på ordet, slik du ville lagt vekt på det når du sier det høyt. Vises vanligvis i kursiv. I eksempelet får ordet *mot* trykk.
- `strong` betyr at noe er **viktig**. Vises vanligvis med fet skrift.
:::

:::step {"id":"practice","caption":"Innholdet får et overskriftshierarki: hovedside, del og underdel. Det er betydningen, ikke tekststørrelsen, som bestemmer nivået.","highlight":"h3"}
## Prøv selv

Åpne kodeverkstedet og bygg videre på filmsiden:

1. Legg til en ny del med en `h2`, for eksempel «Komedier».
2. Legg til et avsnitt under den.
3. Legg til en `h3` med navnet på en film som hører til delen.
4. Gi ett ord i avsnittet trykk med `em`.

**Dette skal du se:** Siden får en tydelig struktur med hovedside, del og underdel. Det er betydningen, ikke tekststørrelsen, som bestemmer nivået.

**Sjekk forståelsen:** Du vil ha en liten overskrift rett under h1. Skal du bruke h4 fordi den er mindre? (Nei. Bruk h2 og gjør den mindre med CSS.)
:::
