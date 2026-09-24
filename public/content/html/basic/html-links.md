:::step {"id":"concept","caption":"En lenke er et a-element. href sier hvor lenken går, og teksten er det brukeren klikker på.","highlight":"a"}
## En lenke har et mål og en tekst

Lenker er det som gjør nettet til et *nett*: de kobler sider sammen. En lenke lages med [[html-a|a-elementet]]:

```html
<a href="#tips">Gå til tipsene</a>
```

- `a` står for *anchor*, som betyr anker.
- `href` er **målet**, altså hvor du havner når du klikker.
- «Gå til tipsene» er **lenketeksten**. Det er den brukeren ser og klikker på.

Uten `href` er `a` bare vanlig tekst. Nettleseren vet ikke hvor den skal gå.
:::

:::step {"id":"text","caption":"Lenketeksten skal gi mening alene: «Gå til tipsene» sier hvor du kommer.","highlight":"a"}
## Skriv lenketekst som sier hvor du kommer

Lenketeksten bør fortelle hvor lenken går, uten at man må lese teksten rundt.

| Uklar lenketekst | Tydelig lenketekst |
| --- | --- |
| Klikk her | Les om bilder |
| Les mer | Se alle filmtips |
| Denne siden | Påmelding til kurset |

Hvorfor er dette viktig? Mange som bruker skjermleser, ber om en **liste over alle lenkene** på siden. Da hører de bare lenketekstene. En liste med fem «Klikk her» sier ingenting. Tydelige lenketekster hjelper også alle som skumleser.
:::

:::step {"id":"mechanism","caption":"#tips peker til elementet med id=\"tips\" på samme side.","highlight":"#tips"}
## Tre typer mål

Verdien i `href` kan peke til ulike steder:

- **En annen nettside:** `href="https://www.nrk.no"`. En full adresse som starter med `https://`.
- **En annen fil i samme mappe:** `href="bilder.html"`. Nettleseren leter etter filen ved siden av den siden du er på. Dette kalles en *relativ sti*.
- **Et sted på samme side:** `href="#tips"`. Firkanttegnet `#` betyr «finn elementet med denne id-en».

Den siste typen er den eksempelet bruker. Lenken og overskriften hører sammen slik:

```html
<a href="#tips">Gå til tipsene</a>
...
<h2 id="tips">Tre filmtips</h2>
```

Legg merke til at `#` bare står i `href`, ikke i `id`. Navnet etter `#` må være nøyaktig likt id-en, ellers finner ikke lenken målet.

**Lenke eller knapp?** Bruk en lenke når brukeren skal *gå et sted*. Når noe skal *skje* på siden, for eksempel å åpne en meny, bruker du en knapp. Knapper kommer senere i kurset.
:::

:::step {"id":"practice","caption":"Lenken peker fortsatt til riktig del når href og id stemmer. Bryter du koblingen, har lenken ikke et mål. Prøv eksterne lenker i en vanlig nettleserfane; resultatvinduet er isolert.","highlight":"a"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Endre lenketeksten til «Gå til mine filmtips».
2. Endre id-en på overskriften fra `tips` til `filmer`.
3. Klikk på lenken. Hva skjer?
4. Oppdater `href` til `#filmer` og klikk igjen.

**Dette skal du se:** Etter steg 2 finner ikke lenken målet sitt lenger. Etter steg 4 virker den igjen, fordi `href` og `id` stemmer overens.

Resultatvinduet er isolert fra resten av nettet. Lenker til andre nettsteder åpnes derfor ikke her. Prøv dem heller i en vanlig nettleserfane.
:::
