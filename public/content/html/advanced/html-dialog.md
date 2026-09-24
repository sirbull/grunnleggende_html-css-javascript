:::step {"id":"concept","caption":"details er et område som kan foldes ut. summary er teksten du klikker på.","highlight":"details"}
## Fold ut og inn med details

Mange sider har spørsmål med svar som skjules til du klikker på dem. HTML har et eget element for dette, [[html-details|details]]:

```html
<details>
  <summary>Hva trenger jeg?</summary>
  <p>Gode sko og vann.</p>
</details>
```

- `details` er **hele området** som kan foldes ut og inn.
- [[html-summary|summary]] er **overskriften** som alltid vises. Brukeren klikker på den.
- Alt annet inni `details` er **innholdet** som vises når området er åpent.

Du trenger ikke skrive JavaScript. Nettleseren sørger for at området kan åpnes med mus, tastatur og skjermleser. En skjermleser sier også om området er åpent eller lukket.
:::

:::step {"id":"mechanism","caption":"dialog er et vindu som legger seg over siden. Resten av siden kan ikke brukes mens dialogen er åpen.","highlight":"dialog"}
## Et dialogvindu med dialog

[[html-dialog|dialog]] er et vindu som legger seg **over** siden, ofte kalt en *modal*. Den brukes når brukeren må ta stilling til noe før de går videre.

```html
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">Turen tar én time</h2>
  <p>Vi følger stien langs vannet.</p>
  <form method="dialog"><button>Lukk</button></form>
</dialog>
```

- `dialog` er **skjult** til noen åpner den.
- `aria-labelledby="dialog-title"` gir dialogen et **navn**. Den peker på overskriften med samme id. Skjermleseren sier «Turen tar én time, dialog» når vinduet åpnes.
- `<form method="dialog">` er et lite triks: en knapp i et slikt skjema **lukker dialogen** uten ekstra kode.

Når dialogen er åpen som modal, skjer tre ting automatisk:

1. Resten av siden blir **utilgjengelig**, og kan ikke klikkes på.
2. **Tastaturfokuset** holdes inne i dialogen.
3. **Escape**-tasten lukker den.
:::

:::step {"id":"open","caption":"Knappen åpner dialogen med showModal(). Når dialogen lukkes, går fokus tilbake til knappen.","highlight":"#apne"}
## Åpne dialogen med to linjer JavaScript

En dialog åpnes ikke av seg selv. Det krever litt JavaScript. Du lærer JavaScript senere, men her er idéen:

```js
apne.addEventListener("click", () => dialog.showModal());
dialog.addEventListener("close", () => apne.focus());
```

- Linje 1: **Når knappen klikkes**, åpnes dialogen som modal med `showModal()`.
- Linje 2: **Når dialogen lukkes**, flyttes fokus tilbake til knappen som åpnet den.

Den andre linjen er viktig for tastaturbrukere. Uten den ville de mistet plassen sin på siden og måtte begynt fra toppen.

**En god dialog har alltid:** et navn, en synlig lukkeknapp, og fokus som går tilbake dit brukeren var.
:::

:::step {"id":"practice","caption":"Du kan åpne og lukke uten mus. Fokus går tilbake til knappen som åpnet dialogen.","highlight":"dialog"}
## Prøv selv

Prøv dialogen i resultatvinduet **uten mus**:

1. Trykk Tab til du kommer til «Hva trenger jeg?», og trykk Enter. Området foldes ut.
2. Trykk Tab til «Se detaljer», og trykk Enter. Dialogen åpnes.
3. Trykk Escape. Dialogen lukkes, og fokus står igjen på «Se detaljer».

Åpne deretter kodeverkstedet og endre overskriften i dialogen. Legg til et nytt `details`-element med et eget spørsmål og svar.

**Dette skal du se:** Alt kan brukes med tastaturet, og dialogen får navnet fra overskriften du skrev.
:::
