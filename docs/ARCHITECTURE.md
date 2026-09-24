# Arkitektur

## Beslutning etter referanseanalyse

Statisk Vite-app med JavaScript ES-moduler og vanlig CSS. Hashruter gjør at nettsiden kan ligge i enhver undermappe uten serveromskriving. `base: './'`. Innhold og eksempler lastes relativt til dokumentets URL. Node brukes bare under utvikling/build.

Avhengigheter: markdown-it for velprøvd Markdown med rå HTML av, DOMPurify for sanitising, CodeMirror 6 og tre språkpakker for tilgjengelig kodeeditor. Vite bygger/lazy-loader. Node test runner, Playwright og axe-core brukes til kontroll. Ingen UI-rammeverk, backend, CDN-fonter eller analyseverktøy.

## Grenser

`src/core/`: innhold, router, lesesteg, referansesøk, dialog, tale, lagring og verksted.
`src/visualizations/`: lazy moduler med mount/update/destroy.
`src/styles/`: tokens og responsiv visning.
`public/content/manifest.json`: navigasjonens eneste kilde.
`public/content/*/*/*.md`: artikkeltekst med stegdirektiver.
`public/content/reference/`: felles oppføringer for både fagord og Cheat sheet.
`public/examples/`: HTML/CSS/JS-kilder delt av demo og editor.
`tests/`: unit/content/E2E/axe. `docs/`: `ARCHITECTURE.md`, `CONTENT_AUTHORING.md`, `ACCESSIBILITY.md`, `DEPLOYMENT.md`, `CREATE_NEW_COURSE.md`, `REFERENCE_ANALYSIS.md` og `STATUS.md`.

Kursets identitet er data, ikke kode. `manifest.title` settes inn i alle sidetitler gjennom `configureSite`/`setPageTitle` i `core/dom.js`, og referansemanifestets `categories` fyller filtrene gjennom `configureCategories` i `core/reference.js`. Ingen modul i `src/` nevner kursnavnet eller fagkategoriene. Det som gjenstår av fagbinding i motoren er at kodeverkstedet arbeider med HTML, CSS og JavaScript, som følger av at forhåndsvisningen er en nettleser-iframe.

## Dataflyt

Hash → manifestoppslag → Markdown + eksempel → sanitisert artikkel → IntersectionObserver/lesepunkt → aktivt steg → visualisering.update(metadata). Navigasjon avbryter fetch, tale, observer og editor. Ukjente ruter viser forståelig feil og vei tilbake. CodeMirror importeres først ved åpning.

Referansemanifestet peker til JSON-filer med komplette oppføringer. Søk indekserer ID, kodeform, aliases, norske fraser, definisjon og keywords; exact code-match rangeres først. Norsk sortering. Detaljer bruker samme oppføring som modalordforklaringen.

## Risiko og tiltak

- Markdown: rå HTML er av, resultat sanitiseres, direktiver valideres, fagord behandles bare i tekstnoder utenfor kode/lenker.
- Preview: sandbox allow-scripts og allow-forms, aldri allow-same-origin. allow-forms er nødvendig for native skjemavalidering og submit-hendelser; CSP form-action 'none' sperrer faktiske skjemainnsendinger. CSP sperrer eksterne fetch-, bilde-, stil- og scriptressurser. postMessage sjekker source og økt-ID. Vilkårlig uendelig JavaScript kan fortsatt belaste nettleseren; stopp fjerner rammen hvis hovedsiden fortsatt svarer. Dette er et lokalt øvingsverktøy, ikke en tjeneste for ukjent fiendtlig kode.
- localStorage/fetch i opaque iframe: virkelige origin-API-er er sperret. Eksempler demonstrerer lokal lagring med eksplisitt merket minnelager; fetch bruker lokal data-URL. Produksjonsbruk forklares i leksjonen.
- Tale: systemstemmene varierer, norsk prioriteres; feil og manglende API forklares. Setningsbasert pause/gjenopptaking og generasjonsteller.
- Fokus: native modal, gjenoppretting til åpner, overskrift ved ruteskift. Tab forlater CodeMirror.
- Piltaster: `ArrowUp`/`ArrowDown` bytter lesesteg på hele leksjonssiden, ikke bare i et fokusert leseømråde, fordi kravet om å tabbe seg inn først gjorde funksjonen uoppdagbar. Kontroller, lenker, dialoger, kodeblokker og CodeMirror er unntatt, og PageUp/PageDown, mellomrom, Home og End røres ikke, slik at vanlig tastaturscrolling fortsatt finnes.
- Kursnavigasjonen ligger i en dialog, ikke en fast venstrekolonne. Det frigjør bredde til leksjonen og fjerner et permanent støyelement fra lesebildet.
- Blur: av som standard; subtil nedtoning med unntak for hover, markering, focus-within og forced colors.
- Hosting: egne tester server dist på /kurs/web/ uten SPA fallback; aldri file://.
- Tilgjengelighet: axe og tastaturtester suppleres med dokumenterte manuelle kontroller. Automatiske tester gir ikke grunnlag for påstand om full WCAG-samsvar. Se `docs/ACCESSIBILITY.md`.
- Forced colors: kodeblokker setter `Canvas`/`CanvasText` eksplisitt. Uten det arver `-webkit-text-fill-color` forfatterfargen, og kodeteksten blir nesten usynlig i høykontrast.
- Modale dialoger: nettleserens egen felle slipper fokus innom `body` mellom siste og første element. `setupDialog` legger derfor på eksplisitt Tab-ombrytning.
- Landemerker i forhåndsvisnings-iframen dupliserer sidens egne. Beholdt bevisst; eksempelsidene skal være komplette HTML-dokumenter. Testene måler WCAG-taggene, ikke `best-practice`.

## Originaldokumentasjon

Kontrollert 22.09.2026: https://vite.dev/guide/ ; https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ ; https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis . CodeMirror-nettsiden ga 403; installerte pakkers dokumentasjon/types brukes også som primærkilde.
