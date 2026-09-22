# Deployment

Målet er at `dist/` kan legges i en hvilken som helst undermappe på `teach.bullfolio.no`, side om side med andre artikler.

## Forutsetninger

- Node 22.12 eller nyere (`node --version`).
- Kun utviklingsverktøy. Produksjonsresultatet er statiske filer uten backend.

## 1. Installer dependencies

```bash
npm ci
```

## 2. Bygg

```bash
npm run build
```

Bygget kjører først `scripts/validate-content.mjs`, som stopper ved manglende leksjonsfiler, ugyldige lesesteg, ukjente fagord, duplikate ID-er og referanseoppføringer uten kjørbart eksempel. Et grønt bygg skriver `Innhold OK: N leksjoner, M referanseoppføringer.`

Resultatet legges i `dist/`.

## 3. Test `dist` lokalt fra en undermappe

```bash
npm run preview:nested
```

Serveren legger bygget på `http://127.0.0.1:4178/kurs/web/` uten SPA-fallback. Det er med vilje: da avsløres alle feil som skyldes absolutte stier eller antakelser om at appen ligger på `/`.

Full kontroll før opplasting:

```bash
npm run check
```

Den kjører unit-tester, bygg og hele Playwright-suiten mot `dist` på `/kurs/web/`. E2E-testene dekker blant annet alle leksjoner, axe, tastaturflyt, 320 px, 200 % zoom, forced colors og fallback ved manglende innhold.

Test aldri via `file://`. Hashruting virker, men `fetch` av innholdsfiler blir blokkert av origin-reglene.

## 4. Last opp

Last opp **innholdet i** `dist/` til ønsket mappe på webhotellet, for eksempel `/kurs/web/`. Selve mappenavnet er fritt; ingenting i koden er bundet til det.

```text
dist/index.html          → /kurs/web/index.html
dist/assets/…            → /kurs/web/assets/…
dist/content/…           → /kurs/web/content/…
dist/examples/…          → /kurs/web/examples/…
dist/favicon.svg         → /kurs/web/favicon.svg
```

Ingen serveromskriving, `.htaccess` eller SPA-fallback er nødvendig. All navigasjon skjer etter `#` i samme `index.html`.

Serveren må levere `.md` som tekst og `.json` som JSON. De fleste webhotell gjør dette som standard.

## 5. Verifiser produksjons-URL

Gå gjennom denne listen på den ferdige adressen:

- [ ] Forsiden laster og sender deg videre til første leksjon.
- [ ] Meny, nivåvelger og leksjonsliste virker i alle fire seksjoner.
- [ ] En Markdown-leksjon vises med lesesteg, og visualiseringen følger lesepunktet.
- [ ] Ordliste / Cheat sheet søker, filtrerer og åpner en detaljside.
- [ ] Et fagord åpner ordforklaringsdialogen.
- [ ] «Prøv selv i kodeverkstedet» laster editoren (egen chunk) og kjører koden i forhåndsvisningen.
- [ ] Forhåndsvisningen viser resultatet, og «Kjør kode» og «Tilbakestill» virker.
- [ ] Opplesning starter og stopper. Stemmene avhenger av operativsystemet.
- [ ] En dyp lenke limt rett inn i adressefeltet, for eksempel `.../#/css/intermediate/css-grid`, laster riktig leksjon.
- [ ] En ukjent rute viser «Vi fant ikke innholdet» med vei tilbake.
- [ ] Nettverksfanen viser ingen 404 og ingen forespørsler til eksterne domener.

Dersom noe bare feiler i produksjon og ikke lokalt, sjekk først om filene faktisk ble lastet opp med mappestrukturen intakt, og om serveren tvinger en annen MIME-type på `.md` eller `.json`.

## Oppdatering senere

Nytt innhold krever ingen kodeendring. Legg til Markdown og eksempler, oppdater `public/content/manifest.json`, kjør `npm run check`, og last opp `dist/` på nytt.
