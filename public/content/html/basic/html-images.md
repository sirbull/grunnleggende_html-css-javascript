:::step {"id":"concept","caption":"img viser et bilde. src sier hvor bildet ligger, og alt beskriver det med tekst.","highlight":"img"}
## Et bilde trenger en kilde og en beskrivelse

Bilder settes inn med [[html-img|img-elementet]]. En forenklet versjon av koden i eksempelet ser slik ut:

```html
<img src="fjell.svg" alt="To grønne fjelltopper" width="320" height="160">
```

- `src` står for *source*, altså **kilde**. Den sier hvor bildefilen ligger. I eksempelet er bildet skrevet rett inn i koden som en lang tekst, men vanligvis er det et filnavn som `fjell.jpg`.
- `alt` står for *alternativ tekst*. Den **beskriver bildet med ord**.
- `width` og `height` er bredde og høyde i piksler. De lar nettleseren sette av plass til bildet før det er ferdig lastet, slik at teksten ikke hopper.

`img` har ingen avslutningstagg. Elementet har ikke tekstinnhold, alt det trenger står i attributtene.
:::

:::step {"id":"mechanism","caption":"Alt-teksten leses opp av skjermlesere og vises hvis bildet ikke kan lastes.","highlight":"img"}
## Hva skal stå i alt?

Alt-teksten brukes når bildet ikke kan ses:

- En **skjermleser** leser den høyt for den som ikke ser skjermen.
- Den vises på siden hvis bildet **ikke blir lastet**, for eksempel ved dårlig nett.
- **Søkemotorer** bruker den til å forstå hva bildet viser.

Spør deg selv: *Hvis jeg skulle beskrive bildet over telefon, hva ville jeg sagt?* Beskriv det som er viktig i sammenhengen, ikke hver minste detalj.

| Situasjon | Eksempel på alt |
| --- | --- |
| Bildet viser noe viktig | `alt="To grønne fjelltopper"` |
| Bildet er en lenke | Beskriv hvor lenken går: `alt="Til forsiden"` |
| Bildet er bare pynt | Tom alt: `alt=""` |

En **tom** alt-tekst, `alt=""`, betyr «dette bildet er bare pynt». Da hopper skjermleseren over det. Det er noe annet enn å glemme alt helt. Mangler alt, leser noen skjermlesere opp filnavnet i stedet, for eksempel «IMG underscore 4032».
:::

:::step {"id":"figure","caption":"figure pakker inn bildet og bildeteksten. figcaption er den synlige bildeteksten.","highlight":"figcaption"}
## Bildetekst med figure og figcaption

Når et bilde har en synlig bildetekst under seg, som i en avis, pakker du begge inn i et [[html-figure|figure-element]]:

```html
<figure>
  <img src="fjell.svg" alt="To grønne fjelltopper">
  <figcaption>En enkel illustrasjon av fjellene.</figcaption>
</figure>
```

- `figure` er **rammen** som holder bildet og teksten sammen.
- `figcaption` er **bildeteksten** som alle kan se.

Bildeteksten og alt-teksten har ulike jobber. Alt-teksten *erstatter* bildet for den som ikke ser det. Bildeteksten *utfyller* bildet for alle. De trenger derfor ikke være like.
:::

:::step {"id":"practice","caption":"Den alternative teksten blir stående som beskrivelse selv når bildet ikke lastes. En bildetekst og en alt-tekst har ulike roller og trenger ikke være like.","highlight":"img"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Skriv en ny alt-tekst som beskriver illustrasjonen med dine egne ord.
2. Endre bildeteksten i `figcaption`.
3. Ødelegg `src` med vilje: slett alt mellom anførselstegnene, slik at det står `src=""`.

**Dette skal du se:** Når bildet ikke kan lastes, vises alt-teksten i stedet. Slik opplever også en skjermleserbruker bildet: bare gjennom teksten du skrev.

**Sjekk forståelsen:** Et lite blomsterikon pynter en overskrift og sier ingenting nytt. Hva skal stå i alt? (Ingenting: `alt=""`.)
:::
