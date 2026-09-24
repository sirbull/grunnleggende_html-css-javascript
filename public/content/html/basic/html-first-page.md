:::step {"id":"concept","caption":"Hele siden bygges av elementer du allerede kjenner: overskrifter, avsnitt, en lenke og en liste.","highlight":"h1"}
## Sett sammen det du har lært

Du kan nå nok HTML til å lage en hel side. Eksempelet er en liten turguide som bruker alt fra de forrige leksjonene:

- **Dokumentets ramme:** `<!doctype html>`, `html`, `head` og `body`.
- **Overskrifter:** én `h1` for hele siden og en `h2` for en del.
- **Avsnitt** med `p`.
- **En lenke** som hopper til en del av siden.
- **En punktliste** med tre tips.

Før du skriver kode, er det lurt å tenke som en leser: *Hva skal man se først? Hvilke deler består siden av?* Skisser gjerne siden på papir med én hovedoverskrift og noen få deler.
:::

:::step {"id":"mechanism","caption":"header, main og footer deler body i toppen, hovedinnholdet og bunnen av siden.","highlight":"header, main, footer"}
## Tre nye elementer deler opp siden

Eksempelet har noen elementer du ikke har sett før. De viser ingenting spesielt på skjermen, men de forteller hvilken **del av siden** innholdet hører til:

- `header` er **toppen** av siden. Her ligger hovedoverskriften og menyen.
- `nav` er en **meny med lenker**. Her har den bare én lenke.
- `main` er **hovedinnholdet**. Det skal bare finnes én main per side.
- `section` er en **del** av innholdet med sin egen overskrift. Her er det delen med tips.
- `footer` er **bunnen** av siden, med informasjon som hvem som har laget den.

Sammen ser strukturen slik ut:

```
body
├── header  (topp: h1 og nav)
├── main    (hovedinnhold: p og section)
└── footer  (bunn: p)
```

Disse elementene kalles **semantiske**, fordi de beskriver hva innholdet er. Du lærer mer om dem i leksjonen om semantisk sidestruktur.
:::

:::step {"id":"link","caption":"Lenken i nav hopper til section-elementet med id=\"tips\".","highlight":"#tips"}
## Lenken og målet hører sammen

Menyen har én lenke: `<a href="#tips">Mine tips</a>`. Den peker til `section`-elementet med `id="tips"`. Klikker du, hopper siden ned til tipsene.

Det er samme teknikk som i leksjonen om lenker. Nå er målet en hel del av siden i stedet for bare en overskrift.

Legg merke til at siden ikke har noe CSS. Den ser enkel ut, men den er likevel lett å forstå. Det er et godt tegn: god HTML gir mening **før** den får utseende.
:::

:::step {"id":"practice","caption":"Siden skal kunne leses fra topp til bunn og gi mening uten visuelle effekter. Kontroller at lenken har et mål og at overskriftene følger et logisk nivå.","highlight":"section"}
## Prøv selv

Lag din egen versjon av siden om en hobby du liker. Endre koden i kodeverkstedet steg for steg:

1. Skriv et nytt tema i både `title` og `h1`.
2. Skriv en **ingress**, altså et kort innledende avsnitt, i det første `p`-elementet i `main`.
3. Bytt ut de tre tipsene med dine egne.
4. Endre lenketeksten i menyen slik at den passer til delen den hopper til.
5. Skriv ditt eget navn i `footer`.

**Dette skal du se:** Siden kan leses fra topp til bunn og gir mening uten farger eller oppsett.

**Sjekkliste:** Har siden én h1? Følger overskriftene en logisk rekkefølge? Hopper lenken til riktig sted?
:::
