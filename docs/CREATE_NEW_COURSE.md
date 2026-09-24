# Lage en ny læringsside

Løsningen er delt i en læringsmotor og en innholdspakke. En ny læringsside skal i hovedsak være nytt innhold, ikke ny kode.

Motoren er fagnøytral: den kan hverken HTML, CSS eller JavaScript. Den vet bare hvordan den skal hente et manifest, vise lesesteg, følge lesepunktet, slå opp fagord, lese høyt og kjøre en liten webside i en sandkasse.

## Hva som er motor og hva som er innhold

| Motor (`src/`) | Innhold (`public/`) |
| --- | --- |
| `core/router.js` – hashruting, dype lenker | `content/manifest.json` – seksjoner, nivåer, leksjoner |
| `core/content.js` – henting, lesesteg, `:::example` | `content/<seksjon>/<nivå>/*.md` – artikkeltekst |
| `core/reading.js` – lesepunkt, piltaster, fokusmodus | `content/reference/*.json` – oppslagsverk og fagord |
| `core/reference.js`, `reference-search.js` – søk, filtre | `examples/**` – kjørbare eksempler |
| `core/glossary.js`, `dom.js` – ordforklaringsdialog | `favicon.svg` |
| `core/playground.js`, `editor.js`, `preview.js` – kodeverksted | `index.html` – merkenavn, bunntekst, metabeskrivelse |
| `core/section.js` – seksjonsside, leksjonshoder, leksjonsliste | |
| `core/example.js` – veksler mellom kode og resultat | |
| `core/speech.js` – opplesningspanel og avspiller | |
| `core/storage.js` – lagring per kurs-ID | |
| `styles/main.css` – design tokens og layout | |
| `visualizations/` – pedagogiske illustrasjoner | |

Det eneste fagspesifikke som er igjen i motoren, er at kodeverkstedet arbeider med HTML, CSS og JavaScript. Det følger av at forhåndsvisningen er en nettleser-iframe, og er en bevisst grense: dette er en mal for læringssider om web.

## Fremgangsmåte

### 1. Kopier prosjektet

Kopier repoet, eller behold `src/`, `scripts/`, `tests/unit/`, `index.html`, `vite.config.js` og `package.json` og bytt ut `public/content/` og `public/examples/`.

### 2. Sett identiteten

I `public/content/manifest.json`:

```json
{ "id": "nytt-kurs", "title": "Nytt kurs", "reference": "content/reference/manifest.json", "sections": [] }
```

`id` gir lagringsprefikset i `localStorage`. Velg en ny, så et nytt kurs på samme domene ikke arver fremdriften fra det gamle.

`title` settes automatisk inn i `document.title` på alle sider. Ingenting annet i `src/` nevner kursets navn.

I `index.html` endrer du merkenavn i toppen, bunnteksten, `<title>`, `description` og `theme-color`.

### 3. Bytt fargene

Design tokens ligger som CSS-variabler øverst i `src/styles/main.css`, blant annet `--code-bg`, `--code-text` og `--focus`. Kontroller kontrasten på nytt etter et fargebytte, og husk at kodeblokkene også har egne regler under `@media (forced-colors: active)`.

### 4. Bygg innholdsstrukturen

Følg `docs/CONTENT_AUTHORING.md`. Seksjoner, nivåer og leksjoner er fritt navngitt; motoren leser dem fra manifestet. Menyen bygges av seksjonene, og nivåvelgeren av sporene.

Begynn med én komplett leksjon i én seksjon, og få den helt ferdig før du skriver resten. Da finner du hullene i formatet tidlig.

### 5. Bygg referanseverket

Sett kategoriene dine i `public/content/reference/manifest.json`:

```json
{ "categories": { "all": "Alle", "syntaks": "Syntaks", "verktøy": "Verktøy" }, "files": ["content/reference/syntaks.json"] }
```

Kategorinøklene brukes i hver oppførings `category`, og validatoren avviser ukjente kategorier. `all` må være med, siden den er standardfilteret.

Fagorddialogen og oppslagsverket deler de samme oppføringene. Skriver du en oppføring, får du begge.

### 6. Vurder visualiseringene

`src/visualizations/registry.js` avgjør hvilke navn manifestet kan bruke. De fire som følger med:

- `preview` – kjører eksempelet og markerer en CSS-selektor. Standardvalget, og ofte nok.
- `html-document` – forhåndsvisning pluss DOM-tre.
- `box-model` – boksmodellen med en skyvekontroll.
- `code-flow` – kjøreflyt steg for steg ved siden av resultatet.

Ukjente navn faller tilbake til `preview`, så en leksjon blir aldri stående tom.

En ny visualisering er en modul som eksporterer `mount(host, { files })` og returnerer `{ update(step), destroy() }`. `update` kalles med metadataene fra det aktive lesesteget. Legg den inn i registeret med en `import()`, slik at den lastes først når en leksjon faktisk bruker den.

Lag bare visualiseringer som forklarer noe teksten ikke klarer alene.

### 7. Tilpass testene

`tests/unit/` er fagnøytrale og kan beholdes som de er.

`tests/e2e/` inneholder konkrete leksjonstitler, ruter og tekster fra dette kurset. Disse må skrives om. Behold strukturen i `robustness.spec.js`: tastaturflyt, fokusfelle, 320 px, 200 % zoom, forced colors, axe og fallback ved manglende innhold. Det er de scenariene som faktisk har avdekket feil.

`tests/e2e/content.spec.js` går gjennom alle leksjoner i manifestet og trenger som regel bare nye forventede titler.

### 8. Kontroller og publiser

```bash
npm run check
```

Deretter `docs/DEPLOYMENT.md`.

## Ting det er lett å gå i

- **Å skrive `h1` i Markdown.** Overskriften kommer fra manifestet.
- **Å gjenbruke en leksjons-ID i et annet nivå.** ID-er må være unike i hele kurset.
- **Å glemme en av de tre eksempelfilene.** Alle tre må finnes, også tomme.
- **Å beholde `id` fra forrige kurs.** Da blander lagret fremdrift seg.
- **Å teste via `file://`.** Innholdsfilene blir blokkert. Bruk `npm run dev` eller `npm run preview:nested`.
