:::step {"id":"concept","caption":"HTML-en er den samme. CSS-en bestemmer fargen på overskriften og linjeavstanden i avsnittet.","highlight":"h1"}
## HTML er innholdet, CSS er utseendet

[[what-is-css|CSS]] står for *Cascading Style Sheets*. Det er språket som bestemmer **hvordan** en nettside ser ut: farger, skrifttyper, avstander og hvor ting står.

Tenk på et hus:

- **HTML** er veggene og rommene. Det bestemmer *hva* som finnes.
- **CSS** er malingen, tapetet og møblene. Det bestemmer *hvordan* det ser ut.

HTML og CSS skrives i hver sin fil. Den samme HTML-en kan få et helt nytt utseende bare ved at du bytter CSS-en. Innholdet og betydningen er de samme, bare utseendet endres.

I eksempelet har HTML-en en overskrift og et avsnitt. CSS-en gjør overskriften grønn og gir avsnittet mer luft mellom linjene.
:::

:::step {"id":"mechanism","caption":"Regelen h1 { color: #174f42; } gjør alle h1-elementer mørkegrønne.","highlight":"h1"
}
## Slik er en CSS-regel bygget

CSS består av **regler**. Hver regel sier: «*disse* elementene skal se *slik* ut». Her er den første regelen i eksempelet:

```css
h1 { color: #174f42; }
```

Regelen har tre deler:

- `h1` er **selektoren**. Den *velger* hvilke elementer regelen gjelder for. Her: alle `h1`-elementer.
- `color` er **egenskapen**, altså *hva* du vil endre. `color` betyr tekstfarge.
- `#174f42` er **verdien**, altså *hva* det skal endres til. Her er det en mørk grønnfarge.

Resten er skilletegn, og de må være med:

- **Krøllparentesene** `{ }` rammer inn alt som gjelder for selektoren.
- **Kolon** `:` skiller egenskapen fra verdien.
- **Semikolon** `;` avslutter linjen, slik at du kan skrive flere linjer etter hverandre.

En linje med egenskap og verdi kalles en **deklarasjon**. En regel kan ha mange:

```css
h1 {
  color: #174f42;
  font-size: 2rem;
}
```
:::

:::step {"id":"link","caption":"På en vanlig nettside kobles CSS-filen til HTML-en med et link-element i head.","highlight":""}
## Slik kobler du CSS til HTML

På en vanlig nettside ligger CSS-en i en egen fil, for eksempel `style.css`. Du kobler den til HTML-en med et [[html-link|link-element]] i `head`:

```html
<head>
  <meta charset="UTF-8">
  <title>Min side</title>
  <link rel="stylesheet" href="style.css">
</head>
```

- `rel="stylesheet"` betyr «denne filen er et stilark».
- `href="style.css"` er filnavnet, akkurat som i en lenke.

I dette kurset trenger du ikke gjøre det selv. Kodeverkstedet kobler CSS-fanen til resultatet automatisk.
:::

:::step {"id":"practice","caption":"Utseendet endres mens HTML-strukturen er den samme. Hvis en regel ikke virker, sjekk selektor, kolon og avsluttende krøllparentes.","highlight":"h1"}
## Prøv selv

Åpne kodeverkstedet og gå til CSS-fanen:

1. Bytt fargen på `h1` til `#b34524`, en rødbrun farge.
2. Legg til en helt ny regel nederst som gir hele siden en lys bakgrunn:

```css
body { background-color: #e9f0e9; }
```

**Dette skal du se:** Siden endrer utseende, men HTML-koden er akkurat den samme.

**Virker ikke regelen?** Sjekk de tre vanligste feilene: Er selektoren skrevet riktig? Står det kolon mellom egenskap og verdi? Er krøllparentesen lukket?
:::
