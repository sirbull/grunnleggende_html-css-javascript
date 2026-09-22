# MASTERPROMPT – Interaktiv læringsside for HTML, CSS og JavaScript

> Denne filen er arbeidskontrakten for AI-agenten som skal utvikle prosjektet.
> Les hele dokumentet før du gjør større arkitekturvalg eller begynner å implementere funksjoner.
> Arbeid fasevis. Ikke hopp direkte til full implementasjon.

---

## 1. Oppdrag

Bygg en interaktiv, universelt utformet læringsside for brukere som skal lære:

1. **HTML**
2. **CSS**
3. **JavaScript**
4. **Samspill mellom HTML, CSS og JavaScript**

Løsningen skal være pedagogisk, visuelt tydelig og fungere som en blanding av:

- en digital lærebok,
- en interaktiv artikkel,
- en visuell demonstrasjon,
- og et enkelt kodeverksted tilsvarende prinsippet i W3Schools «Try it»-eksempler.

Referanseprosjekt:

- `https://github.com/sirbull/hvordan-ki-fungerer.git`

## 1.1 OBLIGATORISK: hent og analyser referanse-repoet før implementasjon

Dette er et **obligatorisk første steg**. Ikke hopp over referanseanalysen og ikke baser løsningen bare på beskrivelsen i denne prompten.

Før du bygger ny funksjonalitet skal du skaffe lokal lesetilgang til:

```text
https://github.com/sirbull/hvordan-ki-fungerer.git
```

Gjør dette i denne rekkefølgen:

1. Sjekk først om repoet allerede finnes lokalt i workspace, en parent-mappe eller en kjent prosjektmappe.
2. Hvis det ikke finnes lokalt, klon repoet som en **egen referansemappe ved siden av prosjektet**, ikke inni produksjonskoden.
3. Foretruk en kommando tilsvarende:

```bash
git clone --depth 1 https://github.com/sirbull/hvordan-ki-fungerer.git ../_reference_hvordan-ki-fungerer
```

4. Hvis vanlig `git clone` ikke fungerer fordi repoet er privat eller autentisering mangler:
   - bruk GitHub CLI dersom den er autentisert,
   - bruk tilgjengelig GitHub-MCP/connector dersom den har tilgang,
   - eller bruk eksisterende lokal checkout.
5. Dersom repoet fortsatt ikke kan leses, dokumenter dette tydelig i `docs/STATUS.md` som en blocker. **Ikke lat som repoet er analysert.**
6. Referanse-repoet skal ikke bli en del av den nye appens runtime eller produksjonsbuild.
7. Dersom referansemappen ligger under samme overordnede arbeidsområde, sørg for at den ikke ved et uhell committes i det nye prosjektet.

Etter checkout skal du **faktisk lese filstrukturen og kildekoden** før du tar arkitekturvalg.

Minimum som skal inspiseres:

- rotstrukturen i repoet,
- `package.json` og relevante lock/config-filer,
- `src/`, `public/`, `assets/`, `docs/` eller tilsvarende mapper,
- entry points,
- routing/navigation,
- artikkel- og innholdsformat,
- hvordan tekstseksjoner/lesesteg representeres,
- hvordan scrollposisjon/aktiv tekstblokk bestemmes,
- hvordan høyresiden/sticky visualisering styres,
- visualiseringskomponenter og koblingen mellom tekst og visualisering,
- tastaturhåndtering,
- fokusstyring,
- tilgjengelighetskode og ARIA,
- tekst-til-tale/opplesning,
- lagring i `localStorage`,
- responsive løsninger,
- CSS/design tokens,
- build/deploy-konfigurasjon,
- og eventuelle testoppsett.

Søk også eksplisitt i kodebasen etter relevante implementasjoner, for eksempel:

```text
IntersectionObserver
scroll
keydown
ArrowUp
ArrowDown
speechSynthesis
SpeechSynthesisUtterance
aria-
focus
localStorage
markdown
fetch(
sticky
visual
activeStep
activeSection
```

Navnene kan naturligvis være annerledes. Poenget er å finne den **reelle implementasjonen**, ikke bare anta hvordan den fungerer.

Lag deretter:

```text
docs/REFERENCE_ANALYSIS.md
```

Dokumentet skal minst inneholde:

- filstruktur og hvilke filer som er viktigst,
- teknisk stack,
- dataflyt fra artikkelinnhold til UI,
- hvordan aktivt lesesteg bestemmes,
- hvordan visualiseringer oppdateres,
- hvordan tastaturnavigasjon fungerer,
- hvordan opplesning fungerer,
- relevante accessibility-mønstre,
- hva som fungerer godt og bør gjenbrukes,
- hva som er prosjektspesifikt og bør generaliseres,
- hva som bør forbedres i den nye løsningen,
- og konkrete filreferanser til implementasjonen i referanse-repoet.

Eksempel på ønsket presisjonsnivå:

```md
## Aktivt lesesteg

Referanseprosjektet bruker `IntersectionObserver` i
`src/.../...js` for å identifisere aktiv seksjon.

Visualiseringen oppdateres gjennom `...`.

Dette mønsteret bør gjenbrukes, men koblingen mellom artikkel-ID
og visualisering bør flyttes til manifest/content-data i den nye løsningen.
```

Ikke nøye deg med en generell oppsummering som «repoet bruker JavaScript og CSS».

Først når denne analysen er gjennomført skal du fastsette endelig arkitektur for det nye prosjektet.

Kartlegg spesielt:

- hvordan artikkeltekst og visualisering er koblet sammen,
- hvordan aktiv tekstblokk bestemmes,
- hvordan høyresiden/sticky visualisering fungerer,
- hvordan tastaturnavigasjon fungerer,
- hvordan eventuell opplesning er implementert,
- hvordan innhold og kode er organisert,
- hvilke deler som kan gjenbrukes som generelle mønstre,
- og hvilke deler som bør bygges mer generisk fordi dette prosjektet senere skal kunne bli et rammeverk.

Ikke kopier gammel arkitektur ukritisk. Gjenbruk gode prinsipper, men bygg dette prosjektet slik at det senere kan brukes som **mal for andre interaktive læringsartikler**.

---

# 2. Overordnede mål

Løsningen skal:

- fungere for brukere med svært ulik forkunnskap,
- ha flere progresjonsnivåer,
- bruke korte og forståelige forklaringer,
- visualisere det teksten forklarer,
- la brukeren redigere kode og se resultatet direkte,
- fungere uten backend,
- kunne bygges lokalt og lastes opp som en vanlig mappe til `teach.bullfolio.no`,
- fungere fra en undermappe, ikke bare fra domenets rot,
- ha WCAG 2.2 AA som minimumsmål,
- støtte skjermleser og tastaturnavigasjon,
- ha gode kontraster,
- bruke semantisk HTML,
- støtte WAI-ARIA der native HTML ikke er tilstrekkelig,
- tilby opplesning av artikkelinnhold,
- tilby en valgfri fokusmodus der tekst som ikke er aktiv blir visuelt nedtonet/bluret,
- ha ordforklaringer for fagbegreper,
- ha en omfattende, søkbar **Ordliste / Cheat sheet** med syntaks, forklaring, eksempler, vanlige feil og relaterte begreper,
- la brukere slå opp både eksakte kodeuttrykk som `h2`, `.h2`, `#id`, `querySelector` og naturlige søk som «class inni class» eller «style ett kort i en gruppe»,
- lagre artikkelinnhold og referanseinnhold i separate redigerbare filer,
- og være lett å videreutvikle med nye fag, temaer og læringsartikler.

Ikke bygg en tung serverløsning. Alt som kan løses i nettleseren skal løses i nettleseren.

---

# 3. Målgruppe og pedagogisk nivå

Primær målgruppe er brukere som kan ha alt fra ingen erfaring til noe erfaring med webutvikling, uavhengig av alder og bakgrunn.

Språket skal være:

- norsk bokmål,
- direkte,
- konkret,
- uten unødvendig akademisk språk,
- men faglig korrekt.

Når et viktig engelsk faguttrykk brukes, skal den engelske termen normalt vises sammen med eller være tilgjengelig fra den norske forklaringen.

Eksempel:

> En **selektor (selector)** forteller CSS hvilke HTML-elementer som skal styles.

Ikke bruk komplekse metaforer dersom de gjør det vanskeligere å forstå den faktiske teknologien.

Forklar først hva noe gjør, vis deretter et lite eksempel, og la deretter brukeren eksperimentere.

---

# 4. Informasjonsarkitektur

## 4.1 Fem hovedseksjoner

Øverst i løsningen skal brukeren enkelt kunne velge mellom:

- **HTML**
- **CSS**
- **JavaScript**
- **Samspill**
- **Ordliste / Cheat sheet**

«Samspill» betyr eksempler og små prosjekter der HTML, CSS og JavaScript brukes sammen.

«Ordliste / Cheat sheet» er et eget søkbart oppslagsverk. Det skal ikke følge lesesporene på samme måte som artiklene. Her skal brukeren raskt kunne finne en HTML-tag, CSS-selektor, CSS-egenskap, JavaScript-metode, DOM-begrep eller annet faguttrykk og få en kort forklaring med konkret kodeeksempel.

Dette skal være ekte navigasjon, ikke bare dekorative faner.

Navigasjonen skal:

- være fullt tilgjengelig med tastatur,
- ha tydelig aktiv tilstand,
- ikke bruke bare farge for å vise aktiv tilstand,
- fungere på mobil,
- ha korrekt semantikk,
- og gi forståelig informasjon til skjermlesere.

---

## 4.2 Lesespor / nivåer

Hver hovedseksjon skal kunne ha tre nivåer:

1. **Grunnleggende**
2. **Videre**
3. **Fordypning**

Valgt nivå skal kunne huskes lokalt i nettleseren.

Et nivå er ikke nødvendigvis én lang artikkel. Det kan bestå av flere korte leksjoner.

JavaScript skal sannsynligvis ha flere leksjoner enn HTML og CSS. Ikke press alle hovedseksjoner inn i identisk lengde bare for symmetri.

---

# 5. Foreslått faglig struktur

Dette er startstrukturen. Den skal kunne endres gjennom innholdsfilene uten at applikasjonskoden må bygges om.

## 5.1 HTML – Grunnleggende

Forslag til leksjoner:

1. Hva HTML er
2. Oppbygningen av et HTML-dokument
3. Elementer, tagger og attributter
4. Overskrifter og avsnitt
5. Lenker
6. Bilder og `alt`
7. Lister
8. En enkel side fra start til slutt

Visualiseringer:

- vis HTML-koden til venstre/i artikkelen,
- vis resultatet i nettleseren på høyresiden,
- vis gjerne en enkel DOM-trevisning,
- marker elementet som teksten akkurat forklarer.

---

## 5.2 HTML – Videre

Forslag:

- semantisk HTML,
- `header`, `nav`, `main`, `section`, `article`, `footer`,
- skjemaer,
- labels og inputs,
- tabeller når tabeller faktisk er riktig valg,
- media,
- tilgjengelig HTML,
- hvorfor `div` ikke skal brukes til alt.

---

## 5.3 HTML – Fordypning

Forslag:

- DOM-struktur og relasjoner,
- validering,
- metadata,
- struktur for større sider,
- tilgjengelig navngivning,
- robuste skjemaer,
- dialoger og interaktive native elementer,
- når ARIA er nødvendig og når det ikke er nødvendig.

---

## 5.4 CSS – Grunnleggende

Forslag:

1. Hva CSS er
2. Hvordan koble CSS til HTML
3. Selektorer
4. Egenskap og verdi
5. Farger
6. Tekst og typografi
7. Margin og padding
8. Border
9. Box model
10. En enkel ferdig stylet komponent

Visualiseringer:

- før/etter,
- live endring av farge og størrelse,
- box model,
- markering av valgt HTML-element,
- visuell demonstrasjon av margin, border og padding.

---

## 5.5 CSS – Videre

Forslag:

- klasser,
- kombinerte selektorer,
- pseudo-klasser,
- `display`,
- Flexbox,
- Grid,
- responsive enheter,
- media queries,
- CSS custom properties,
- states som `hover`, `focus` og `active`.

---

## 5.6 CSS – Fordypning

Forslag:

- cascade,
- specificity,
- inheritance,
- avanserte layouts,
- funksjoner som `clamp()`,
- container queries der det er pedagogisk relevant,
- animasjon og transition,
- `prefers-reduced-motion`,
- tilgjengelig design og kontrast.

---

## 5.7 JavaScript – Grunnleggende

JavaScript-delen skal bygges mer trinnvis og kan være betydelig lengre.

Forslag:

1. Hva JavaScript gjør i en nettside
2. Console
3. Variabler
4. Datatyper
5. Operatorer
6. `if` / `else`
7. Funksjoner
8. Enkle events
9. Finne et HTML-element
10. Endre tekst eller stil fra JavaScript

Visualiseringer:

- verdier som flyttes inn i variabler,
- linje-for-linje markering av kode,
- en enkel beslutningsgren for `if`,
- vis hva en funksjon får inn og returnerer,
- marker DOM-elementet som JavaScript endrer.

---

## 5.8 JavaScript – Videre

Forslag:

- arrays,
- objekter,
- løkker,
- DOM,
- `querySelector`,
- `classList`,
- events,
- event object,
- forms,
- inputverdier,
- enkel validering,
- opprette og fjerne elementer.

---

## 5.9 JavaScript – Fordypning

Forslag:

- scope,
- callbacks,
- promises,
- `async` / `await`,
- `fetch`,
- JSON,
- moduler,
- feilhåndtering,
- `localStorage`,
- grunnleggende forståelse av asynkron kode,
- enkel event-loop-visualisering dersom den faktisk hjelper forståelsen.

Ikke overless denne delen med avansert teori. Alt skal knyttes til konkrete nettlesereksempler.

---

## 5.10 Samspill – Grunnleggende

Små eksempler som bruker alle tre språkene:

- profilkort,
- knapp som endrer tekst eller farge,
- enkel bildevelger,
- enkel lys/mørk modus,
- liten quiz.

---

## 5.11 Samspill – Videre

Forslag:

- responsivt kortgalleri,
- filtrering,
- skjema med validering,
- interaktiv meny,
- enkel bildefremviser,
- lokal lagring av en liten innstilling.

---

## 5.12 Samspill – Fordypning

Forslag:

- miniapplikasjon uten rammeverk,
- hente JSON med `fetch`,
- generere UI fra data,
- lagre tilstand lokalt,
- strukturere JavaScript i moduler,
- tilgjengelige interaktive komponenter.

---

## 5.13 Ordliste / Cheat sheet – søkbart referanseverk

Bygg en egen omfattende referanseseksjon som brukeren kan bruke mens hen arbeider med oppgaver.

Dette skal være mer enn en tradisjonell ordliste.

Hver oppføring skal kunne inneholde:

- navn / term,
- eventuell kodeform, for eksempel `<h2>`, `.card`, `#menu` eller `querySelector()`,
- kategori,
- type, for eksempel HTML-tag, attributt, CSS-selektor, CSS-egenskap, JavaScript-metode eller DOM-begrep,
- kort forklaring,
- mer detaljert forklaring,
- syntaks,
- ett eller flere konkrete kodeeksempler,
- eventuell visuell live-preview der det gir mening,
- vanlige feil eller misforståelser,
- «når bruker jeg dette?»,
- relaterte begreper,
- lenke til relevant leksjon.

### Navigasjon og søk

Cheat sheet skal ha:

- tydelig søkefelt øverst,
- alfabetisk A–Å-indeks,
- kategori-filter,
- støtte for tastatur,
- god mobilvisning,
- deep links til individuelle oppføringer.

Minimum filtre:

- Alle
- HTML
- CSS
- JavaScript
- DOM / Web API
- Tilgjengelighet

Søk skal være tolerant og pedagogisk.

Eksempel: alle disse søkene bør kunne gi relevante treff:

```text
h2
<h2>
.h2
class
css class
klasse
style class
class inni class
kort inni gruppe
ett kort i gruppe
descendant selector
child selector
query selector
endre tekst javascript
```

Søket skal derfor ikke bare matche den synlige tittelen. Det skal også indeksere:

- aliases,
- alternative norske og engelske navn,
- kodeform,
- keywords,
- forklaring,
- «vanlig spørsmål»-fraser.

Bruk fuzzy matching bare dersom det kan gjøres lett og uten stor dependency. Et godt normalisert token-søk med aliases er bedre enn en tung søkemotor for dette prosjektet.

### Alfabetisk sortering

Alle oppføringer skal ha en normalisert `sortTitle`.

Eksempel:

```text
<a>                         → A
<h2>                        → H
.class                      → Class selector
#id                         → ID selector
querySelector()             → Q
addEventListener()          → A
```

Sorter med norsk locale der det er relevant, slik at Æ, Ø og Å havner naturlig.

Brukeren skal kunne trykke på en bokstav og hoppe til den delen av listen.

Ikke skjul søket dersom listen er filtrert alfabetisk.

---

### Eksempel på oppføring: `h2` mot `.h2`

Dette er et viktig eksempel som skal finnes i referanseverket.

#### `h2 { }`

Forklar at:

```css
h2 {
  color: blue;
}
```

er en **elementselektor / type selector**.

Den treffer alle `<h2>`-elementer:

```html
<h2>Overskrift én</h2>
<h2>Overskrift to</h2>
```

#### `.h2 { }`

Forklar at:

```css
.h2 {
  color: blue;
}
```

er en **class selector**.

Punktumet betyr at CSS leter etter elementer med:

```html
class="h2"
```

Eksempel:

```html
<p class="h2">Denne teksten er et p-element med klassen h2.</p>
```

Forklar tydelig:

- `h2` = HTML-elementet `<h2>`
- `.h2` = en CSS-klasse som heter `h2`
- de er to forskjellige selektorer
- det er vanligvis bedre å gi klassen et beskrivende navn som `.section-title` enn `.h2`

---

### Eksempel på oppføring: HTML-klasser

Forklar hvordan man lager en class:

```html
<div class="card">
  <h2>Produkt</h2>
  <p>Beskrivelse av produktet.</p>
</div>
```

og hvordan den styles:

```css
.card {
  padding: 1rem;
  border: 1px solid #ccc;
}
```

Forklar også at flere elementer kan ha samme class:

```html
<div class="card">Kort 1</div>
<div class="card">Kort 2</div>
<div class="card">Kort 3</div>
```

og at ett element kan ha flere classes:

```html
<div class="card featured">
  Viktig kort
</div>
```

```css
.card {
  padding: 1rem;
}

.featured {
  border: 3px solid currentColor;
}
```

---

### Eksempel på oppføring: velge element inni en gruppe

Dette skal forklares med flere relaterte selector-mønstre.

HTML:

```html
<section class="card-grid">
  <article class="card">
    <h2>Kort 1</h2>
  </article>

  <article class="card featured">
    <h2>Kort 2</h2>
  </article>

  <article class="card">
    <h2>Kort 3</h2>
  </article>
</section>
```

#### Alle `.card` inni `.card-grid`

```css
.card-grid .card {
  padding: 1rem;
}
```

Forklar at mellomrommet betyr:

> Finn elementer med class `card` som ligger et sted inni et element med class `card-grid`.

#### Bare et spesifikt kort via ekstra class

```css
.card-grid .card.featured {
  border: 3px solid currentColor;
}
```

Forklar at:

```css
.card.featured
```

uten mellomrom betyr:

> Det samme elementet må ha både `card` og `featured`.

#### Direkte barn

```css
.card-grid > .card {
  margin-bottom: 1rem;
}
```

Forklar forskjellen mellom:

```css
.card-grid .card
```

og:

```css
.card-grid > .card
```

Den første kan finne etterkommere på flere nivåer. `>` finner bare direkte barn.

#### Ett kort basert på plassering

Vis også:

```css
.card:nth-child(2) {
  /* ... */
}
```

men forklar at en meningsfull class som `.featured`, `.selected` eller `.warning` ofte er mer robust når stylingen handler om hva kortet **er**, ikke hvilken plass det tilfeldigvis har.

---

### Referanseinnhold som bør dekkes

Cheat sheet skal være omfattende, men prioritere ting brukerne faktisk møter.

#### HTML

Ta minst med vanlige:

- dokumentelementer,
- semantiske strukturelementer,
- tekst-elementer,
- lenker,
- bilder,
- lister,
- tabeller,
- skjemaelementer,
- media,
- interaktive native elementer.

Eksempler på tags:

```text
<html>
<head>
<title>
<meta>
<link>
<body>
<header>
nav
main
section
article
aside
footer
h1–h6
p
a
img
figure
figcaption
ul
ol
li
div
span
strong
em
br
hr
button
form
label
input
textarea
select
option
table
thead
tbody
tr
th
td
video
audio
source
details
summary
dialog
```

Ta også med viktige attributter som egne søkbare oppføringer:

```text
class
id
href
src
alt
title
lang
type
name
value
placeholder
required
disabled
checked
for
aria-label
aria-describedby
data-*
```

Forklar der det er relevant forskjellen på element, tag og attributt.

#### CSS

Ta minst med:

**Selektorer**

```text
element selector
.class
#id
*
A B
A > B
A + B
A ~ B
[attr]
:hover
:focus
:focus-visible
:first-child
:last-child
:nth-child()
::before
::after
```

**Kjerneegenskaper**

```text
color
background
background-color
font-family
font-size
font-weight
line-height
text-align
width
height
max-width
min-height
margin
padding
border
border-radius
box-shadow
display
position
top/right/bottom/left
z-index
overflow
opacity
transform
transition
```

**Layout**

```text
Flexbox
display: flex
flex-direction
justify-content
align-items
gap
flex-wrap

Grid
display: grid
grid-template-columns
grid-template-rows
gap
fr
minmax()
```

**Responsive**

```text
%
px
rem
em
vw
vh
dvh
media queries
clamp()
```

**Konsepter**

```text
cascade
specificity
inheritance
box model
custom properties / CSS variables
```

#### JavaScript

Ta minst med:

```text
let
const
strings
numbers
booleans
null
undefined
arrays
objects
operators
if / else
switch
for
for...of
while
functions
arrow functions
parameters
return
scope
template literals
console.log()
querySelector()
querySelectorAll()
getElementById()
textContent
innerHTML
classList
style
createElement()
append()
remove()
addEventListener()
click
input
change
submit
event
preventDefault()
dataset
localStorage
JSON.parse()
JSON.stringify()
fetch()
Promise
async
await
try / catch
```

For JavaScript-oppføringer skal eksemplene så langt som mulig bruke DOM-eksempler brukeren kan se resultatet av.

---

### Innholdsformat for Cheat sheet

Cheat sheet-innholdet skal ikke hardkodes i UI-komponentene.

Bruk egne innholdsfiler.

Anbefalt struktur:

```text
public/
└── content/
    └── reference/
        ├── manifest.json
        ├── html/
        ├── css/
        ├── javascript/
        ├── dom/
        └── accessibility/
```

Hver oppføring kan ligge som Markdown med front matter.

Eksempel:

```md
---
id: css-class-selector
title: Class selector
displayCode: ".class"
sortTitle: "Class selector"
category: css
type: selector
aliases:
  - klasse
  - class
  - css class
  - punktum class
keywords:
  - style spesifikt element
  - style flere elementer
  - class inni class
related:
  - css-type-selector
  - css-id-selector
  - html-class-attribute
---

# Class selector

En class selector velger HTML-elementer som har en bestemt `class`.

```css
.card {
  padding: 1rem;
}
```

```html
<div class="card">...</div>
```
```

Dette gjør det enkelt for en redaktør eller AI-agenten å rette og utvide oppslagsverket uten å endre programkode.

---

### Visning av en oppføring

På desktop kan detaljvisningen gjerne bruke to kolonner når det gir verdi:

```text
┌────────────────────────────┬────────────────────────────┐
│ Forklaring                 │ Kode / resultat            │
│                            │                            │
│ Syntaks                    │ Live preview               │
│ Vanlige feil               │ der det er relevant        │
│ Relaterte begreper         │                            │
└────────────────────────────┴────────────────────────────┘
```

På mobil brukes én kolonne.

Kodeeksempler i cheat sheet skal kunne ha:

- Kopier
- Åpne i kodeverksted
- eventuelt «Prøv selv»

Ikke start en full CodeMirror-instans for hvert kort i en lang liste. Last editoren først når brukeren faktisk åpner eller velger «Prøv selv».

---

### Forholdet mellom glossary og Cheat sheet

`glossary.json` / fagord-dialogen og Cheat sheet skal ikke utvikle to motstridende definisjoner.

Arkitekturen skal ha en tydelig **single source of truth**.

Anbefalt modell:

- korte definisjoner kan hentes fra samme metadata som Cheat sheet,
- glossary-dialogen viser en kompakt variant,
- «Les mer» åpner den komplette Cheat sheet-oppføringen.

Hvis én felles innholdsmodell blir for tung, kan glossary ha egne korte data, men den må referere til en `referenceEntryId` slik at koblingen er eksplisitt.

Eksempel:

```json
{
  "term": "class",
  "short": "Et navn du kan gi ett eller flere HTML-elementer.",
  "referenceEntryId": "html-class-attribute"
}
```

---

# 6. Hovedlayout

På desktop skal løsningen følge prinsippet:

```text
┌──────────────────────────────────────────────────────────┐
│                    Global navigasjon                     │
├──────────────────────────────┬───────────────────────────┤
│                              │                           │
│       Artikkel / tekst       │   Visualisering / demo    │
│                              │   sticky / kontekstuell   │
│                              │                           │
│                              │                           │
└──────────────────────────────┴───────────────────────────┘
```

Anbefalt utgangspunkt:

- artikkel: omtrent 45–55 %,
- visualisering: omtrent 45–55 %,
- ingen rigid pikselbredde,
- lesbar tekstbredde,
- god luft,
- ingen unødvendige dekorasjoner.

Høyresiden skal kunne bytte mellom for eksempel:

- **Visning**
- **Kode**
- **Forklaring**

Ikke legg inn faner dersom de ikke gir reell verdi for leksjonen.

På smale skjermer skal layouten bli én kolonne.

Prioriter lesbarhet fremfor å presse split-screen inn på mobil.

---

# 7. Aktiv tekst og fokusmodus

## 7.1 Aktiv tekstblokk

Artikkelinnholdet skal deles i meningsfulle lesesteg.

Et lesesteg kan bestå av:

- ett eller flere avsnitt,
- et kodeeksempel,
- en liten liste,
- eller en kort oppgave.

Systemet skal vite hvilket lesesteg som er aktivt.

Bruk en robust løsning, for eksempel:

- `IntersectionObserver`,
- kombinert med avstand til et definert fokusområde i viewporten.

Ikke baser løsningen utelukkende på rå `scrollY`-beregninger dersom en mer robust løsning finnes.

Når aktivt steg endres:

- visualiseringen kan oppdateres,
- riktig kode kan markeres,
- riktig element kan fremheves,
- eventuell opplesning kan følge steget.

---

## 7.2 Fokusmodus med blur

Det skal finnes en **Fokusmodus**.

Når Fokusmodus er aktiv:

- aktivt lesesteg skal være skarpt og tydelig,
- lesesteg som ligger lenger unna fokusområdet kan bli gradvis nedtonet og lett bluret,
- teksten rett over og under bør fortsatt være mulig å orientere seg i,
- effekten må være subtil, ikke dramatisk.

Viktig:

- Dette er en **visuell effekt**, ikke en semantisk skjuling.
- Inaktiv tekst skal fortsatt finnes i accessibility tree.
- Ikke bruk `aria-hidden` på inaktive avsnitt.
- Når et element får tastaturfokus, skal det bli fullt lesbart.
- Når brukeren markerer tekst eller åpner et fagord, skal relevant tekst være fullt lesbar.
- Fokusmodus skal kunne slås av med én tydelig kontroll.
- Innstillingen skal lagres i `localStorage`.
- Siden skal være fullt brukbar med Fokusmodus av.

Fokusmodus skal aldri være en forutsetning for å forstå innholdet.

---

# 8. Tastaturnavigasjon

Alt skal kunne brukes uten mus.

## 8.1 Globalt

Støtt:

- `Tab` / `Shift+Tab` for interaktive kontroller,
- `Enter` og `Space` der det er forventet,
- `Escape` for å lukke dialoger,
- synlig fokusindikator på alle interaktive elementer.

Lag også en «Hopp til innhold»-lenke.

---

## 8.2 Piltaster i artikkel

Når fokus er i selve leseområdet og **ikke** i:

- kodeeditor,
- input,
- textarea,
- select,
- dialog,
- slider,
- eller en annen kontroll som trenger piltastene,

kan følgende brukes:

- `ArrowDown`: neste lesesteg
- `ArrowUp`: forrige lesesteg

Vurder:

- `ArrowRight`: neste leksjon
- `ArrowLeft`: forrige leksjon

men bare dersom dette testes godt og ikke skaper konflikt med normal nettleserbruk.

Ikke fang piltaster globalt når brukeren arbeider i kodeeditoren.

Når piltastnavigasjon flytter leseposisjonen:

- scroll aktivt steg rolig inn i riktig leseområde,
- men respekter `prefers-reduced-motion`,
- oppdater aktiv visning,
- ikke flytt skjermleserfokus unødvendig.

---

# 9. Universell utforming og WCAG

Mål: **WCAG 2.2 AA** eller bedre.

Dette er et gjennomgående krav i alle faser.

Ikke skriv «WCAG-kompatibel» bare fordi automatiserte tester passerer. Automatiske tester er hjelpemidler, ikke full verifikasjon.

## 9.1 Semantisk HTML først

Bruk native elementer når de finnes:

- `<button>` for knapper,
- `<a>` for lenker,
- `<nav>`,
- `<main>`,
- `<article>`,
- `<section>`,
- `<aside>`,
- `<dialog>` der det egner seg,
- `<label>` for inputfelter.

Ikke bygg klikkbare `div`-elementer med `role="button"` dersom en ekte knapp kan brukes.

Hovedregel:

> Native HTML først. ARIA brukes for å supplere semantikk og tilstand, ikke for å erstatte HTML uten grunn.

---

## 9.2 Kontrast

Minstekrav:

- vanlig tekst: minst **4.5:1**
- stor tekst: minst **3:1**
- viktige UI-komponenter/grafiske objekter: minst **3:1** mot tilstøtende farger der WCAG krever det

Ikke bruk lysegrå tekst på hvit bakgrunn.

Kodefarger må også være lesbare. Syntax highlighting skal ikke formidle informasjon bare gjennom farge.

---

## 9.3 Fokus

Alle interaktive elementer skal ha tydelig `:focus-visible`.

Ikke fjern outline uten å erstatte den med en bedre fokusindikator.

Fokus skal aldri «forsvinne» etter:

- lukking av dialog,
- navigering,
- bytte av leksjon,
- reset av kodeeditor,
- eller endring av UI.

---

## 9.4 Zoom og reflow

Test minst:

- 200 % zoom,
- smal viewport rundt 320 CSS-piksler,
- liggende og stående mobil,
- desktop.

Innhold skal ikke bli utilgjengelig på grunn av horisontal scrolling, med unntak av elementer der horisontal scrolling faktisk er nødvendig, for eksempel enkelte kodeblokker.

---

## 9.5 Bevegelse

Respekter:

```css
@media (prefers-reduced-motion: reduce)
```

Ingen viktig informasjon skal være avhengig av animasjon.

---

## 9.6 Skjermleser

Test struktur og tilgjengelige navn.

Viktige dynamiske statusmeldinger kan bruke `aria-live`, men:

- ikke annonser hver kodeendring,
- ikke spam skjermleseren mens brukeren skriver,
- bruk statusmeldinger sparsomt og meningsfullt.

---

# 10. Fagord og ordforklaringer

Viktige fagord i artiklene skal kunne markeres i Markdown med en enkel syntaks.

Foreslått syntaks:

```md
[[DOM]]
[[selektor]]
[[event|hendelse]]
```

Format:

```text
[[term-id]]
[[term-id|vist tekst]]
```

Renderer skal gjøre dette om til en semantisk knapp som ser ut som et fagord i teksten.

Visuell stil:

- tydelig, men diskret,
- gjerne stiplet eller annen ikke-standard understreking,
- skal ikke kunne forveksles med vanlig lenke,
- skal ha synlig fokusstil.

---

## 10.1 Glossary-data

Opprett en sentral fil, eksempel:

```text
public/content/glossary.json
```

Eksempelstruktur:

```json
{
  "dom": {
    "term": "DOM",
    "english": "Document Object Model",
    "short": "Nettleserens struktur av HTML-dokumentet.",
    "explanation": "DOM gjør at JavaScript kan finne og endre elementer på siden.",
    "example": "document.querySelector('h1')"
  }
}
```

Utvid formatet ved behov med:

- relaterte begreper,
- alternativ norsk term,
- eksempeltype,
- lenke til relevant leksjon.

Ikke legg hele ordforklaringen direkte inn i artikkelfilen dersom den samme termen brukes flere steder.

Glossary-data skal kobles til den komplette **Ordliste / Cheat sheet**-seksjonen. En kort fagord-dialog skal kunne ha en «Les mer»-handling som åpner riktig komplette oppføring uten at definisjonene dupliseres unødvendig.

---

# 11. Ordforklaringsdialog / lightbox

Ved aktivering av fagord:

- åpne en modal dialog,
- vis norsk forklaring,
- vis engelsk term/oversettelse der det finnes,
- vis konkret eksempel,
- vis eventuelt lenke til relevant leksjon.

Bruk helst native `<dialog>` dersom testene viser at det fungerer godt i målplattformene.

Dialogen skal:

- ha tilgjengelig navn,
- flytte fokus til et fornuftig sted når den åpnes,
- holde tastaturfokus i dialogen mens den er modal,
- kunne lukkes med X-knapp,
- kunne lukkes med `Escape`,
- kunne lukkes ved klikk på backdrop/området utenfor,
- returnere fokus til fagordet som åpnet dialogen,
- ikke gjøre bakgrunnsinnhold tilgjengelig for interaksjon mens dialogen er modal.

Ikke bruk ARIA-modal semantikk dersom komponenten ikke faktisk oppfører seg modalt.

---

# 12. Opplesning / tekst-til-tale

Implementer tekst-til-tale uten backend.

Bruk primært nettleserens:

```js
window.speechSynthesis
```

og `SpeechSynthesisUtterance`.

Funksjonalitet:

- start opplesning,
- pause,
- fortsett,
- stopp,
- velg hastighet,
- hvis mulig velg norsk stemme,
- fall tilbake til tilgjengelig systemstemme dersom ønsket stemme ikke finnes.

Brukeren skal kunne velge mellom:

- les aktivt steg,
- les hele leksjonen.

Standard bør være «les aktivt steg».

Ikke start lyd automatisk.

Kodeblokker skal som hovedregel ikke leses opp som vanlig artikkeltekst. Gi eventuelt en egen kontroll dersom kode skal leses.

Når opplesning går:

- marker aktiv tekst visuelt,
- ikke bruk markering som eneste signal,
- la brukeren stoppe uten å måtte finne en liten skjult knapp.

Hvis `speechSynthesis` ikke er tilgjengelig, skjul eller deaktiver funksjonen på en forståelig måte.

---

# 13. Artikkelinnhold skal ligge separat fra applikasjonskode

Dette er et kritisk arkitekturkrav.

Artikkeltekst skal **ikke** hardkodes inn i JavaScript-komponenter.

Innholdet skal ligge som egne filer, primært Markdown.

Foreslått struktur:

```text
public/
└── content/
    ├── manifest.json
    ├── glossary.json
    ├── html/
    │   ├── basic/
    │   │   ├── 01-hva-er-html.md
    │   │   ├── 02-dokumentstruktur.md
    │   │   └── ...
    │   ├── intermediate/
    │   └── advanced/
    ├── css/
    │   ├── basic/
    │   ├── intermediate/
    │   └── advanced/
    ├── javascript/
    │   ├── basic/
    │   ├── intermediate/
    │   └── advanced/
    └── combined/
        ├── basic/
        ├── intermediate/
        └── advanced/
```

Artikkelfiler skal kunne redigeres uten å redigere applikasjonens komponentkode.

Ideelt skal Markdown-filene ligge som statiske ressurser og hentes med `fetch()` i runtime. Da kan innholdet i prinsippet oppdateres uavhengig av JS-bundlen.

---

# 14. Manifest

Bruk et manifest som er «source of truth» for:

- seksjoner,
- nivåer,
- leksjoner,
- rekkefølge,
- titler,
- filsti,
- eventuell visualisering,
- eventuell starterkode.

Eksempel:

```json
{
  "sections": [
    {
      "id": "html",
      "title": "HTML",
      "tracks": [
        {
          "id": "basic",
          "title": "Grunnleggende",
          "lessons": [
            {
              "id": "html-intro",
              "title": "Hva er HTML?",
              "content": "content/html/basic/01-hva-er-html.md",
              "visualization": "html-document",
              "example": "examples/html/html-intro"
            }
          ]
        }
      ]
    }
  ]
}
```

Unngå å duplisere leksjonsrekkefølge i både JavaScript og Markdown.

---

# 15. Format for artikkelfiler

Hold forfatterformatet enkelt.

En artikkel bør støtte metadata, for eksempel via YAML front matter:

```md
---
id: html-intro
title: Hva er HTML?
section: html
track: basic
order: 1
description: En enkel introduksjon til hva HTML gjør.
visualization: html-document
example: html/html-intro
---

# Hva er HTML?

HTML beskriver innholdet og strukturen på en nettside.

[[element]] er byggesteinene i dokumentet.
```

---

## 15.1 Lesesteg i Markdown

Vi trenger en enkel måte å knytte tekst til visualisering på.

Velg en forfattervennlig syntaks.

Eksempel:

```md
:::step
id: html-heading
visual: html-preview
highlight: h1
:::

## Overskrifter

`<h1>` brukes til hovedoverskriften på siden.

```html
<h1>Min første nettside</h1>
```

:::
```

Dette er bare et forslag. Hvis Markdown-parseren har en bedre etablert directive-syntaks, bruk den.

Krav:

- lett å skrive for hånd,
- lett for AI å generere korrekt,
- lett å validere,
- ikke avhengig av JSX/React-komponenter i innholdsfilene.

Lag dokumentasjon for formatet i:

```text
docs/CONTENT_AUTHORING.md
```

---

# 16. Visualiseringssystem

Visualiseringer skal være modulære.

Ikke lag én gigantisk fil med alle visualiseringer.

Foreslått grensesnitt:

```js
render(container, context)
update(stepData)
destroy()
```

eller tilsvarende.

Visualiseringen får informasjon fra aktivt lesesteg.

Eksempel:

```json
{
  "visual": "html-preview",
  "highlight": "h1"
}
```

kan få høyresiden til å:

- vise en enkel nettside,
- fremheve overskriften,
- og eventuelt vise den relevante delen av DOM-treet.

---

## 16.1 Eksempler på visualiseringer

HTML:

- kode → DOM → ferdig side,
- elementmarkering,
- attributter,
- alt-tekst.

CSS:

- box model,
- selector match,
- flexbox,
- grid,
- responsive layout.

JavaScript:

- variabelverdi,
- if/else-gren,
- function call,
- array,
- loop,
- DOM-endring,
- event,
- fetch/async-sekvens.

Samspill:

- ferdig miniapp,
- code → state → DOM,
- interaktiv brukerhandling.

Ikke visualiser bare for å ha animasjon. Hver visualisering skal forklare noe teksten ellers ville vært vanskeligere å forstå.

---

# 17. Kodeeksempler som egne filer

Unngå duplisering mellom:

- kode i artikkelen,
- kode i visualiseringen,
- og kode i kodeeditoren.

Legg komplette eksempler i egne mapper.

Forslag:

```text
public/
└── examples/
    ├── html/
    │   └── html-intro/
    │       ├── index.html
    │       ├── style.css
    │       └── script.js
    ├── css/
    ├── javascript/
    └── combined/
```

En leksjon skal kunne referere til et eksempel fra manifest/front matter.

Der det er mulig, generer code blocks og editor-startkode fra de samme kildefilene.

---

# 18. Kodeverksted / live editor

Bruk en etablert editor-komponent.

Anbefalt førstevalg:

- **CodeMirror 6**

Ikke bygg egen code editor med `textarea` med mindre en teknisk test dokumenterer en klar fordel.

CodeMirror skal konfigureres for:

- HTML,
- CSS,
- JavaScript,
- syntax highlighting,
- line numbers,
- god tastaturnavigasjon,
- tilgjengelig fokusstil,
- enkel reset,
- eventuelt linting senere.

Ikke installer unødvendige språkpakker.

Lazy-load editoren dersom det reduserer førstegangs-bundle betydelig.

---

## 18.1 Playground-layout

Forslag:

```text
┌─────────────────────────────────────────────┐
│ HTML | CSS | JavaScript              Reset  │
├──────────────────────┬──────────────────────┤
│                      │                      │
│       CodeMirror     │    Live preview      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

På mobil:

- editor og preview kan stå under hverandre,
- eller vises som tydelige faner.

---

## 18.2 Live preview

For vanlige HTML/CSS/JS-eksempler skal preview kunne genereres i en `iframe`.

Bruk `srcdoc` eller tilsvarende.

Preview skal:

- oppdateres fortløpende,
- debounce endringer, eksempelvis rundt 200–400 ms,
- ikke fryse hele hovedsiden ved vanlig syntaksfeil,
- isolere brukerkoden fra hovedapplikasjonen.

Bruk en restriktiv `sandbox`.

Start med noe tilsvarende:

```html
<iframe sandbox="allow-scripts">
```

Ikke gi `allow-same-origin` uten en dokumentert grunn.

Evaluer en CSP for innholdet som kjøres i preview.

Brukerkode skal ikke få direkte tilgang til hovedsidens DOM.

---

## 18.3 Auto-run og manuell kjøring

Standard kan være live oppdatering.

Ha en synlig kontroll for:

- Auto-oppdatering på/av,
- Kjør,
- Reset.

Dette er nyttig for JavaScript-eksempler som ellers kan kjøre mange ganger under redigering.

---

## 18.4 Feil

Fang JavaScript-feil fra preview på en kontrollert måte dersom det kan gjøres uten å svekke isolasjonen.

Vis dem i et enkelt panel, eksempel:

```text
Feil:
script.js:4 – Unexpected token ')'
```

Ikke overless nybegynnere med komplekse stack traces som standard.

---

## 18.5 Lagre brukerens endringer

Bruk `localStorage`.

Ikke krev konto eller backend.

Nøkkel må inkludere leksjons-ID.

Eksempel:

```text
teach-code:html-intro
```

Ha alltid en «Tilbakestill kode»-funksjon.

---

# 19. Forslag til teknisk stack

Hold stacken lett og statisk.

Anbefalt utgangspunkt:

- Vite
- moderne ES-moduler
- Vanilla JavaScript eller TypeScript
- vanlig CSS med tydelige design tokens
- Markdown-parser
- DOMPurify
- CodeMirror 6
- Playwright
- axe-core-integrasjon for automatiserte tilgjengelighetstester

Ikke introduser React, Vue eller annen stor UI-framework bare fordi det er mulig.

Hvis referanseprosjektet allerede bruker en lett og ryddig stack som gir betydelig gjenbruk, vurder dette før du endrer retning.

Målet er ikke færrest mulig biblioteker. Målet er:

- liten runtime,
- lav kompleksitet,
- god tilgjengelighet,
- enkel statisk deployment,
- vedlikeholdbar arkitektur.

---

# 20. Markdown-rendering

Renderer skal:

1. hente Markdown,
2. parse innholdet,
3. prosessere fagord-syntaks,
4. prosessere lesesteg/directives,
5. rendre trygg HTML,
6. koble visualiseringene til riktige steg.

Hvis raw HTML i Markdown ikke er nødvendig, hold det deaktivert.

Sanitiser generert HTML før det settes inn i dokumentet.

Ikke sanitiser brukerens playground-kode på samme måte; den skal i stedet kjøres isolert i sandboxet preview.

---

# 21. Routing

Løsningen skal fungere som statisk side i en undermappe.

Unngå routing som krever server-side rewrite.

Anbefalt:

- hash-baserte adresser,

for eksempel:

```text
#/html/basic/html-intro
#/css/intermediate/flexbox
#/javascript/basic/functions
```

Fordeler:

- direkte lenker fungerer fra en enkel filhost,
- refresh gir ikke 404 fordi serveren mangler SPA-fallback,
- ingen backend kreves.

Ved route-endring:

- oppdater `document.title`,
- flytt fokus kontrollert til leksjonens hovedoverskrift når navigeringen er initiert av brukeren,
- behold fokuslogikk for skjermleser.

---

# 22. Deploy til teach.bullfolio.no

Løsningen skal kunne bygges til:

```text
dist/
```

Deretter skal innholdet i denne mappen kunne lastes opp til en mappe på:

```text
teach.bullfolio.no
```

Det kan ligge andre artikler ved siden av.

Derfor:

- ikke anta at appen ligger på `/`,
- unngå hardkodede absolutte asset paths,
- bruk relative URL-er eller konfigurerbar base path,
- test produksjonsbuild fra undermappe,
- test at Markdown, eksempler, fonts og assets lastes korrekt.

Lag:

```text
docs/DEPLOYMENT.md
```

med helt konkrete steg:

1. installer dependencies,
2. bygg,
3. test `dist`,
4. last opp,
5. verifiser produksjons-URL.

---

# 23. Designprinsipper

Designet skal være moderne, men ikke se ut som en generisk AI-dashboard.

Prioriter:

- rolig layout,
- god luft,
- tydelig hierarki,
- høy lesbarhet,
- få, konsekvente farger,
- tydelig kontrast,
- store nok klikkområder,
- enkel navigasjon.

Unngå:

- glassmorphism bare for pynt,
- overdrevet gradientbruk,
- unødvendig animasjon,
- små lysegrå tekster,
- pill-form på absolutt alle elementer,
- emoji som erstatning for konsekvent ikonografi.

Ikoner skal være dekorative eller ha korrekt tilgjengelig navn.

---

# 24. Design tokens

Lag sentrale CSS-variabler.

Eksempel:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-accent: ...;
  --color-border: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;

  --radius-sm: ...;
  --radius-md: ...;

  --content-width: ...;
}
```

Kontrast skal valideres automatisk eller manuelt før palette låses.

---

# 25. Innholdsskriving

AI-agenten skal skrive førsteutkast til artiklene.

Hvert lesesteg skal normalt gjøre én av disse tingene:

- forklare ett nytt konsept,
- vise et eksempel,
- koble konseptet til noe brukeren allerede har sett,
- gi brukeren en liten handling,
- eller oppsummere.

Unngå lange vegger med tekst.

Som tommelfingerregel:

- korte avsnitt,
- korte kodeeksempler,
- flere små steg fremfor ett enormt steg.

---

## 25.1 Mønster for en leksjon

Anbefalt:

1. **Hva lærer du?**
2. Kort forklaring
3. Visuell demonstrasjon
4. Lite kodeeksempel
5. «Prøv selv»
6. Kort forklaring av hva som skjedde
7. Neste konsept
8. Minioppsummering

Ikke tving alle leksjoner inn i identisk mal dersom temaet krever noe annet.

---

## 25.2 Kodeeksempler

Bruk meningsfulle eksempler.

Foretrekk:

```html
<h1>Min filmside</h1>
<p>Her samler jeg filmer jeg liker.</p>
```

fremfor:

```html
<div>foo</div>
```

Brukeren skal kunne forstå hvorfor koden finnes.

Kode skal være korrekt og kjørbar.

---

# 26. Progressjon

En bruker skal kunne starte på «Grunnleggende» uten å måtte forstå neste nivå.

«Videre» kan anta at grunnleggende konsepter er kjent.

«Fordypning» kan bruke flere konsepter samtidig, men skal fortsatt forklare nye begreper.

Bruk ikke et gamification-system som krever konto.

Enkel lokal fremdrift kan lagres i `localStorage`, for eksempel:

- sist åpnet leksjon,
- fullførte leksjoner,
- valgt nivå,
- fokusmodus,
- TTS-hastighet.

Alt skal kunne slettes lokalt.

---

# 27. Arkitektur for fremtidig rammeverk

Dette prosjektet skal senere kunne bli en gjenbrukbar mal.

Skill derfor tydelig mellom:

```text
core/
content/
visualizations/
examples/
styles/
```

Tenk:

```text
læringsmotor + innholdspakke
```

ikke:

```text
én stor spesialside
```

En ny fremtidig læringsside skal ideelt kunne opprettes ved å:

1. kopiere en content-mappe,
2. oppdatere manifest,
3. legge inn nye visualiseringer bare der det trengs,
4. beholde samme lesemotor, glossary, TTS, routing og accessibility-komponenter.

---

# 28. Foreslått prosjektstruktur

Dette er en anbefaling, ikke et absolutt krav:

```text
/
├── public/
│   ├── content/
│   │   ├── manifest.json
│   │   ├── glossary.json
│   │   ├── html/
│   │   ├── css/
│   │   ├── javascript/
│   │   ├── combined/
│   │   └── reference/
│   │       ├── manifest.json
│   │       ├── html/
│   │       ├── css/
│   │       ├── javascript/
│   │       ├── dom/
│   │       └── accessibility/
│   ├── examples/
│   └── assets/
├── src/
│   ├── core/
│   │   ├── router/
│   │   ├── content/
│   │   ├── reading/
│   │   ├── accessibility/
│   │   ├── speech/
│   │   ├── glossary/
│   │   ├── reference/
│   │   │   ├── search/
│   │   │   ├── index/
│   │   │   └── renderer/
│   │   └── playground/
│   ├── visualizations/
│   │   ├── html/
│   │   ├── css/
│   │   ├── javascript/
│   │   └── combined/
│   ├── components/
│   ├── styles/
│   ├── app.js
│   └── main.js
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── accessibility/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTENT_AUTHORING.md
│   ├── ACCESSIBILITY.md
│   ├── DEPLOYMENT.md
│   └── STATUS.md
├── index.html
├── package.json
└── vite.config.js
```

Hvis TypeScript velges, bruk tilsvarende `.ts`.

---

# 29. MCP og eksterne verktøy

Bruk tilgjengelige MCP-servere når de faktisk forbedrer arbeidet.

Før implementasjon:

- kartlegg hvilke MCP-verktøy som finnes,
- bruk GitHub-MCP for repoanalyse dersom tilgjengelig,
- bruk browser/Playwright-MCP for interaksjonstesting dersom tilgjengelig,
- bruk dokumentasjons-MCP for å slå opp aktuell dokumentasjon når det er nødvendig.

Ikke legg inn en MCP-avhengighet i selve nettsiden.

MCP er et utviklingsverktøy, ikke en runtime-avhengighet.

---

# 30. Bibliotekstrategi

Før du skriver en kompleks egen komponent:

1. sjekk om nettleseren allerede har en god native løsning,
2. sjekk om et lite, vedlikeholdt bibliotek løser behovet,
3. vurder bundle-størrelse,
4. vurder tilgjengelighet,
5. vurder om løsningen kan deployes statisk.

Eksempler:

- CodeMirror 6 for editor,
- native `<dialog>` for modal,
- Web Speech API for TTS,
- Markdown-parser for innhold,
- DOMPurify for sanitizing,
- Playwright + axe for tester.

Ikke bruk et bibliotek bare fordi det er populært.

---

# 31. Testing

Automatiserte tester er obligatoriske.

Minimum:

- unit tests for parsing av content/glossary,
- routing tests,
- keyboard navigation tests,
- dialog tests,
- code playground tests,
- build test,
- accessibility smoke tests.

Bruk Playwright for viktige brukerflyter.

---

## 31.1 Obligatoriske E2E-scenarier

Test minst:

### Scenario A – Kun tastatur

1. åpne siden,
2. bruk skip link,
3. velg HTML,
4. velg Grunnleggende,
5. åpne en leksjon,
6. flytt mellom lesesteg,
7. åpne et fagord,
8. lukk dialogen,
9. åpne kodeeditor,
10. rediger kode,
11. forlat editoren,
12. gå til neste leksjon.

Ingen mus.

---

### Scenario B – Fokusmodus

1. aktiver Fokusmodus,
2. scroll,
3. sjekk at aktivt steg er lesbart,
4. sjekk at tastaturfokus alltid gjør relevant innhold lesbart,
5. slå Fokusmodus av,
6. refresh,
7. verifiser lagret valg.

---

### Scenario C – Glossary

1. åpne et fagord,
2. sjekk tittel/forklaring/engelsk term/eksempel,
3. tab gjennom dialog,
4. lukk med X,
5. åpne på nytt,
6. lukk med `Escape`,
7. åpne på nytt,
8. lukk via backdrop,
9. verifiser at fokus går tilbake til fagordet.

---

### Scenario D – TTS

1. start opplesning,
2. pause,
3. fortsett,
4. stopp,
5. bytt hastighet,
6. naviger til ny leksjon,
7. verifiser at gammel tale ikke fortsetter ukontrollert.

Mock API der browser-testen ikke tilbyr ekte tale.

---

### Scenario E – Playground

1. åpne eksempel,
2. endre HTML,
3. se preview endre seg,
4. endre CSS,
5. se preview endre seg,
6. legg inn en enkel JS-handler,
7. kjør,
8. verifiser interaksjon,
9. reset,
10. verifiser original kode.

---

### Scenario F – Produksjonsbuild

1. kjør build,
2. serve `dist` fra en nested path,
3. åpne minst én direkte hash-route,
4. verifiser content fetch,
5. verifiser assets,
6. verifiser CodeMirror,
7. verifiser glossary,
8. verifiser TTS-kontroller.

---

### Scenario G – Ordliste / Cheat sheet

1. åpne Cheat sheet fra hovednavigasjonen,
2. søk etter `h2`,
3. verifiser at både `<h2>` og relevant selector-informasjon kan finnes,
4. søk etter `.h2`,
5. verifiser forklaring av class selector,
6. søk etter «class inni class»,
7. verifiser relevante treff for descendant/child/combined class selectors,
8. filtrer til CSS,
9. bruk alfabetisk indeks,
10. åpne en oppføring med kun tastatur,
11. åpne kodeeksempel i «Prøv selv»,
12. naviger tilbake uten å miste forståelig fokus,
13. test en deep link direkte til en oppføring,
14. test søket ved 200 % zoom og på smal skjerm.

---

# 32. Manuell tilgjengelighetstest

Automatisk axe-test er ikke nok.

Før release:

- test hele sentralflyten med tastatur,
- test med NVDA på Windows dersom tilgjengelig,
- test med VoiceOver på macOS/iOS dersom tilgjengelig,
- test zoom 200 %,
- test smal skjerm,
- test high contrast/forced colors dersom mulig,
- test `prefers-reduced-motion`,
- kontroller heading hierarchy,
- kontroller labels,
- kontroller focus order,
- kontroller kontrast.

Dokumenter funn i:

```text
docs/ACCESSIBILITY.md
```

---

# 33. Ytelse

Siden skal føles rask også på enkle og eldre maskiner.

Prioriter:

- liten startbundle,
- lazy loading av editor,
- lazy loading av visualiseringer,
- ingen enorme bilder,
- ingen videobakgrunner,
- ingen unødvendige tracking scripts.

Bruk native webfunksjoner når de er gode nok.

---

# 34. Personvern

Standardløsningen skal ikke kreve:

- innlogging,
- cookies,
- analytics,
- brukerkonto,
- skylagring.

`localStorage` er tilstrekkelig for:

- brukerinnstillinger,
- sist åpnet leksjon,
- lokale kodeendringer.

Dokumenter hvilke nøkler som brukes.

---

# 35. Faseplan

Arbeid i fasene under.

Etter hver fase:

1. kjør relevante tester,
2. oppdater `docs/STATUS.md`,
3. dokumenter arkitekturvalg som påvirker senere arbeid,
4. ikke gå videre med kjente kritiske regresjoner.

---

## FASE 0 – Checkout, referanseanalyse og teknisk beslutning

Mål:

- hente eller finne en lokal checkout av `hvordan-ki-fungerer`,
- forstå den faktiske implementasjonen, ikke bare det visuelle resultatet,
- velge hva som skal gjenbrukes,
- kartlegge hostingkrav,
- velge teknisk stack.

Oppgaver:

1. Finn eksisterende lokal checkout eller klon:

```text
https://github.com/sirbull/hvordan-ki-fungerer.git
```

2. Hold referanse-repoet separat fra den nye produksjonskoden.
3. Lag en oversikt over filstrukturen.
4. Les de sentrale kildefilene, ikke bare README.
5. Spor dataflyten fra artikkelinnhold → aktivt lesesteg → visualisering.
6. Identifiser scroll/step-system.
7. Identifiser visualiseringsmønster.
8. Identifiser keyboard/focus/accessibility-mønster.
9. Identifiser TTS/opplesning.
10. Identifiser styling/design tokens.
11. Identifiser build/deploy-strategi.
12. Identifiser eventuelle tekniske svakheter som den nye løsningen bør unngå.
13. Skriv funn med konkrete filreferanser i:

```text
docs/REFERENCE_ANALYSIS.md
```

14. Bruk analysen som grunnlag for:

```text
docs/ARCHITECTURE.md
```

Hvis repoet ikke kan hentes eller leses etter reelle forsøk på lokal checkout, Git/GitHub CLI og tilgjengelig GitHub-MCP, registrer det som en eksplisitt blocker i `docs/STATUS.md`. Ikke marker FASE 0 som fullført før repoet faktisk er analysert.

Ikke skriv stor ny funksjonalitet i denne fasen.

Leveranse:

- lokal tilgjengelig referanse-checkout,
- `docs/REFERENCE_ANALYSIS.md`,
- arkitekturplan,
- mappestruktur,
- dependency-liste med begrunnelse,
- risikoliste,
- konkrete beslutninger om hva fra referanseprosjektet som gjenbrukes, generaliseres eller forkastes.

---

## FASE 1 – Grunnprosjekt og design tokens

Bygg:

- Vite-prosjekt,
- global CSS,
- base typography,
- layout shell,
- top navigation,
- skip link,
- responsive skeleton,
- fokusstiler.

Lag ikke ferdige visualiseringer ennå.

Test:

- tastatur,
- zoom,
- mobil,
- kontrast.

---

## FASE 2 – Content engine

Bygg:

- manifest loading,
- Markdown loading,
- Markdown rendering,
- route parsing,
- section/track/lesson navigation,
- content error states.

Lag minst to midlertidige leksjoner for test.

Mål:

> Applikasjonen skal kunne vise en ny artikkel bare ved at manifest + Markdown oppdateres.

---

## FASE 3 – Lesesteg og split-screen

Bygg:

- step-parser,
- aktivt lesesteg,
- IntersectionObserver,
- høyrepanel,
- visualiseringsregistry,
- enkel eksempelvisualisering,
- piltastnavigasjon.

Test nøye mot kodeeditor/input før global key handling legges til.

---

## FASE 4 – Fokusmodus

Bygg:

- blur/dimming av ikke-aktive steg,
- toggle,
- lokal lagring,
- korrekt oppførsel ved keyboard focus,
- reduced-motion-hensyn.

Test med:

- mus,
- tastatur,
- tekstmarkering,
- glossary-trigger,
- TTS.

---

## FASE 5 – Glossary og Ordliste / Cheat sheet

Bygg først felles referansegrunnlag:

- innholdsmodell for komplette referanseoppføringer,
- reference manifest,
- søkeindeks,
- aliases og keywords,
- alfabetisk sortering,
- kategorifiltre,
- deep links til oppføringer.

Bygg deretter glossary-laget:

- `[[term]]` parser,
- term-knapp,
- kompakt dialog,
- fokusstyring,
- Escape,
- backdrop close,
- relaterte lenker,
- «Les mer» til komplett Cheat sheet-oppføring.

Lag først et representativt sett med minst 20 oppføringer som inkluderer:

- HTML-tag,
- HTML `class`,
- `h2` mot `.h2`,
- CSS class selector,
- CSS descendant selector,
- CSS child selector,
- flere classes på samme element,
- `.card.featured`,
- `:hover`,
- box model,
- Flexbox,
- JavaScript `const`,
- function,
- `querySelector()`,
- `addEventListener()`,
- `classList`,
- DOM,
- event,
- `localStorage`,
- `fetch()`.

Test søk med både kode og naturlig språk.

Når modellen og UI-et er stabilt, skal agenten gradvis fylle ut et omfattende referanseverk for HTML, CSS og JavaScript. Ikke generer hundrevis av oppføringer før format, søk og eksempelvisning er validert.

---

## FASE 6 – Tekst-til-tale

Bygg:

- speech controller,
- play/pause/resume/stop,
- hastighet,
- aktivt steg,
- hele leksjonen,
- voice fallback,
- state cleanup ved navigation.

Ikke autoplay.

---

## FASE 7 – Kodeverksted

Bygg:

- CodeMirror,
- HTML/CSS/JS tabs,
- starter files,
- live preview,
- sandboxed iframe,
- auto-run,
- Run,
- Reset,
- lokal lagring,
- enkel feilvisning.

Sjekk tilgjengelighet spesielt nøye.

---

## FASE 8 – Første komplette vertikale snitt

Bygg én leksjon helt ferdig:

**HTML → Grunnleggende → Oppbygningen av et HTML-dokument**

Den skal inkludere:

- ferdig skrevet artikkel,
- glossary,
- visualisering,
- kodeeksempel,
- playground,
- piltastnavigasjon,
- Fokusmodus,
- TTS,
- accessibility tests.

Ikke masseproduser innhold før denne leksjonen fungerer godt.

Dette er prosjektets viktigste kvalitetssjekk.

---

## FASE 9 – HTML- og CSS-innhold

Når vertikalt snitt er godkjent:

- skriv HTML Grunnleggende,
- skriv CSS Grunnleggende,
- bygg nødvendige visualiseringer,
- legg inn eksempler,
- test.

Deretter:

- Videre,
- Fordypning.

Ikke lag visualiseringer som ikke gir pedagogisk verdi.

---

## FASE 10 – JavaScript

Bygg JavaScript mer gradvis.

Start med:

- variabler,
- if,
- funksjoner,
- events,
- DOM.

Test disse før:

- arrays,
- loops,
- objects,
- async/fetch.

Bruk særlig mye visuell forklaring på:

- state,
- flow,
- DOM,
- hendelser.

---

## FASE 10B – Fyll ut komplett Ordliste / Cheat sheet

Når HTML-, CSS- og JavaScript-strukturen er stabil, fyll ut referanseverket systematisk.

Krav:

- dekk de vanligste HTML-taggene og attributtene,
- dekk grunnleggende og sentrale CSS-selektorer,
- dekk sentrale CSS-egenskaper og layoutkonsepter,
- dekk sentral JavaScript-syntaks,
- dekk vanlige DOM-metoder og events,
- dekk universell utforming som brukerne møter i webutvikling,
- skriv norske aliases og søkeord,
- sorter korrekt alfabetisk,
- legg inn relaterte begreper,
- legg inn konkrete, kjørbare kodeeksempler,
- kontroller at kodeeksemplene faktisk fungerer.

For konsepter som ofte blandes sammen, lag eksplisitte sammenligninger:

- `h2` vs `.h2`,
- `.class` vs `#id`,
- `.a .b` vs `.a.b`,
- `.a .b` vs `.a > .b`,
- `margin` vs `padding`,
- `block` vs `inline`,
- Flexbox vs Grid,
- `let` vs `const`,
- `textContent` vs `innerHTML`,
- `querySelector()` vs `querySelectorAll()`,
- function declaration vs arrow function.

Sørg for at en bruker kan finne disse ved å søke med egne ord, ikke bare korrekt terminologi.

---

## FASE 11 – Samspill

Lag små, komplette prosjekter der brukeren ser:

```text
HTML = struktur
CSS = utseende/layout
JavaScript = oppførsel
```

Sørg for at brukerens code playground kan vise alle tre samtidig.

---

## FASE 12 – Hardening og tilgjengelighet

Kjør:

- full E2E,
- axe,
- tastatur,
- skjermleser,
- zoom,
- mobil,
- production build,
- undermappe-test.

Rett alvorlige feil før videre designpolish.

---

## FASE 13 – Deployment

Lag endelig produksjonsbuild.

Verifiser:

- relative paths,
- content files,
- hash routes,
- fonts,
- assets,
- editor chunks,
- iframe preview,
- TTS,
- glossary.

Oppdater `docs/DEPLOYMENT.md`.

---

## FASE 14 – Gjør løsningen om til mal

Når hovedsiden er stabil:

- identifiser generiske deler,
- flytt generiske deler til `core`,
- fjern fagspesifikke hardkodede antakelser,
- dokumenter hvordan en ny læringsside opprettes.

Lag:

```text
docs/CREATE_NEW_COURSE.md
```

Målet er at neste prosjekt i stor grad skal være:

- nytt manifest,
- nye Markdown-filer,
- nytt glossary,
- nye examples,
- eventuelt noen nye visualiseringer.

---

# 36. STATUS.md

Opprett og vedlikehold:

```text
docs/STATUS.md
```

Format:

```md
# Status

## Current phase
FASE 3 – Lesesteg og split-screen

## Completed
- [x] Manifest loader
- [x] Markdown rendering
- [x] Hash routing

## In progress
- [ ] Active step observer

## Blocked
- None

## Known issues
- Mobile visualization panel needs better height handling

## Next
1. Finish active step
2. Add keyboard navigation
3. Add tests
```

Ikke bruk STATUS som markedsføring. Den skal beskrive faktisk prosjektstatus.

---

# 37. Kvalitetsregler for AI-agenten

Følg disse gjennom hele prosjektet:

1. Les eksisterende kode før du endrer arkitektur.
2. Ikke omskriv store fungerende deler uten konkret grunn.
3. Ikke introduser dependencies uten begrunnelse.
4. Ikke hardkod leksjonsinnhold i app-koden.
5. Ikke hardkod deploy til domenets rot.
6. Ikke legg accessibility til slutt.
7. Ikke bruk ARIA der native HTML løser oppgaven.
8. Ikke fang tastetrykk som kodeeditoren eller inputfelter trenger.
9. Ikke gjør blur-effekten til en barriere.
10. Ikke bruk farge alene som signal.
11. Ikke autoplay lyd.
12. Ikke kjør brukerkode i hovedsidens globale scope.
13. Ikke la playground-iframe få unødvendige rettigheter.
14. Ikke dupliser samme eksempel i flere filer dersom én kilde kan brukes.
15. Ikke skriv ferdig 50 artikler før systemet er testet med ett komplett vertikalt snitt.
16. Kjør tester etter strukturelle endringer.
17. Oppdater dokumentasjon samtidig som arkitekturen endres.
18. Hold UI-et enkelt nok til at innholdet er hovedsaken.
19. Ikke hardkod Cheat sheet-oppføringer i UI-komponenter.
20. Ikke lag separate, motstridende definisjoner i glossary og Cheat sheet.
21. Sørg for at referansesøket matcher både kodeuttrykk og naturlige norske søkeord.
22. Kodeeksempler i referanseverket skal være syntaktisk korrekte og så langt som mulig kjørbare.

---

# 38. Definition of Done

Prosjektet er ikke ferdig før følgende fungerer:

- [ ] HTML, CSS, JavaScript, Samspill og Ordliste / Cheat sheet finnes som hovedseksjoner.
- [ ] HTML, CSS, JavaScript og Samspill støtter flere nivåer.
- [ ] Cheat sheet har søk, alfabetisk indeks og kategori-filter.
- [ ] Cheat sheet kan søkes med både kodeuttrykk og naturlige norske søk.
- [ ] Cheat sheet har konkrete oppføringer for blant annet `h2` vs `.h2`, classes, nested/descendant selectors og styling av ett element i en gruppe.
- [ ] Referanseoppføringer ligger i separate innholdsfiler.
- [ ] Glossary-dialog kan kobles til full Cheat sheet-oppføring.
- [ ] Artikler lastes fra egne filer.
- [ ] Manifest styrer innholdsstruktur.
- [ ] Split-screen fungerer på desktop.
- [ ] Mobil layout fungerer.
- [ ] Aktivt lesesteg oppdaterer visualisering.
- [ ] Piltastnavigasjon fungerer uten å ødelegge editor/input.
- [ ] Fokusmodus kan slås av og på.
- [ ] Glossary fungerer med mus og tastatur.
- [ ] Glossary-dialog håndterer fokus korrekt.
- [ ] TTS kan starte, pause, fortsette og stoppe.
- [ ] CodeMirror fungerer.
- [ ] HTML/CSS/JS-preview fungerer.
- [ ] Playground kjører isolert.
- [ ] Reset fungerer.
- [ ] Lokale kodeendringer kan lagres.
- [ ] WCAG 2.2 AA-relaterte automatiske tester passerer uten alvorlige feil.
- [ ] Manuell keyboard-test er gjennomført.
- [ ] Skjermlesertest er gjennomført på minst én relevant plattform.
- [ ] 200 % zoom fungerer.
- [ ] Siden fungerer fra en undermappe.
- [ ] `dist/` kan lastes opp direkte til `teach.bullfolio.no`.
- [ ] `CONTENT_AUTHORING.md` finnes.
- [ ] `ACCESSIBILITY.md` finnes.
- [ ] `DEPLOYMENT.md` finnes.
- [ ] `CREATE_NEW_COURSE.md` finnes.
- [ ] `STATUS.md` er oppdatert.

---

# 39. Første konkrete oppgave for agenten

Start nå med **FASE 0**.

Ikke implementer hele løsningen ennå.

Gjør følgende i denne rekkefølgen:

1. Finn eller klon `https://github.com/sirbull/hvordan-ki-fungerer.git`.
2. Åpne repoet lokalt og kartlegg den faktiske filstrukturen.
3. Les de sentrale kildefilene og konfigurasjonsfilene.
4. Finn den konkrete implementasjonen av:
   - artikkelinnhold,
   - scroll/aktive lesesteg,
   - sticky/høyre visualiseringspanel,
   - koblingen mellom tekst og visualisering,
   - tastaturnavigasjon,
   - fokus,
   - opplesning/TTS,
   - accessibility/ARIA,
   - responsive layout,
   - build og deployment.
5. Opprett `docs/REFERENCE_ANALYSIS.md` med konkrete filreferanser.
6. Kartlegg arkitekturen.
7. Beskriv hva som bør gjenbrukes.
8. Beskriv hva som bør generaliseres.
9. Beskriv hva som ikke bør videreføres.
10. Foreslå endelig stack.
11. Foreslå endelig mappestruktur.
12. Identifiser risiko rundt:
   - Markdown,
   - visualiseringer,
   - CodeMirror,
   - sandboxed preview,
   - TTS,
   - keyboard navigation,
   - focus/blur,
   - statisk hosting.
13. Opprett eller oppdater:
   - `docs/REFERENCE_ANALYSIS.md`
   - `docs/ARCHITECTURE.md`
   - `docs/STATUS.md`
14. Gå deretter videre til FASE 1 dersom ingen reell blocker finnes.

**Viktig:** FASE 0 er ikke fullført bare fordi repoets README er lest. Agenten skal ha lest filstrukturen og de relevante implementasjonsfilene.

Når du tar tekniske beslutninger, prioriter i denne rekkefølgen:

1. tilgjengelighet,
2. pedagogisk tydelighet,
3. robust statisk hosting,
4. enkel innholdsredigering,
5. vedlikeholdbarhet,
6. ytelse,
7. visuell polish.

---

# 40. Standarder og dokumentasjon som skal brukes som referanse

Bruk oppdatert originaldokumentasjon når du er usikker.

Prioriter:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- CodeMirror 6: https://codemirror.net/
- MDN Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- MDN `<dialog>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- Vite: https://vite.dev/

Ikke stol på gamle blogginnlegg når standarden eller API-et har god originaldokumentasjon.

---

# Sluttmål

Resultatet skal ikke føles som «en nettside med noen artikler».

Det skal føles som et **interaktivt læremiddel for webutvikling**, der brukeren:

1. leser en kort forklaring,
2. ser hva forklaringen betyr visuelt,
3. ser den faktiske koden,
4. endrer koden selv,
5. ser resultatet umiddelbart,
6. får forklaring på fagord uten å forlate siden,
7. kan navigere uten mus,
8. kan få teksten lest opp,
9. kan velge hvor dypt de ønsker å gå i temaet,
10. og raskt kan slå opp en tag, selector, class, CSS-egenskap, JavaScript-metode eller et annet begrep uten å forlate læremiddelet.

Ordliste / Cheat sheet skal fungere som brukerens innebygde oppslagsverk mens hen koder, ikke bare som en liste over definisjoner.

Arkitekturen skal samtidig være generell nok til at samme motor senere kan brukes til andre interaktive læringsartikler.
