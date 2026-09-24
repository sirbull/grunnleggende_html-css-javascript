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

Hash → manifestoppslag → alle leksjoner i seksjonen (Markdown + eksempel) → én sanitisert side → IntersectionObserver/lesepunkt → aktivt steg → aktiv leksjon → `history.replaceState` og sidetittel. En ny leksjon i samme seksjon er et hopp nedover på samme side, ikke en ny rendring. `:::example` blir en veksler mellom kode og resultat der eksempelet omtales; visualiseringen monteres først når resultatet vises, og får metadataene til steget den står i. Navigasjon avbryter fetch, tale, observer og editor. Ukjente ruter viser forståelig feil og vei tilbake. CodeMirror importeres først ved åpning.

Referansemanifestet peker til JSON-filer med komplette oppføringer. Søk indekserer ID, kodeform, aliases, norske fraser, definisjon og keywords; exact code-match rangeres først. Norsk sortering. Detaljer bruker samme oppføring som modalordforklaringen.

## Risiko og tiltak

- Markdown: rå HTML er av, resultat sanitiseres, direktiver valideres, fagord behandles bare i tekstnoder utenfor kode/lenker.
- Preview: sandbox allow-scripts og allow-forms, aldri allow-same-origin. allow-forms er nødvendig for native skjemavalidering og submit-hendelser; CSP form-action 'none' sperrer faktiske skjemainnsendinger. CSP sperrer eksterne fetch-, bilde-, stil- og scriptressurser. postMessage sjekker source og økt-ID. Vilkårlig uendelig JavaScript kan fortsatt belaste nettleseren; stopp fjerner rammen hvis hovedsiden fortsatt svarer. Dette er et lokalt øvingsverktøy, ikke en tjeneste for ukjent fiendtlig kode.
- localStorage/fetch i opaque iframe: virkelige origin-API-er er sperret. Eksempler demonstrerer lokal lagring med eksplisitt merket minnelager; fetch bruker lokal data-URL. Produksjonsbruk forklares i leksjonen.
- Tale: global modul. Innstillingene ligger i et panel under et ikon i den faste leksjonslinjen, og en liten avspiller nede til venstre vises bare mens noe leses. Norske naturlige stemmer («Natural», som Edge eksponerer gjennom `speechSynthesis`) velges først, deretter andre norske. Valgt stemme lagres. Nettbaserte stemmer merkes, siden teksten da sendes til leverandøren. Engasjerende leser i Edge kan ikke startes fra siden. Setningsbasert pause/gjenopptaking og generasjonsteller.
- Én side per seksjon: toppmenyen scroller bort, så leksjonslinjen med leksjonsliste, fokusmodus og opplesning er `sticky`. Ellers måtte man scrolle til toppen for å starte opplesning og mistet lesepunktet. Plass under siste leksjon gjør at også den kan bli aktiv. Aktiv leksjon er den som dekker lesepunktet, ikke nødvendigvis leksjonen til nærmeste steg.
- Fokus: native modal, gjenoppretting til åpner, overskrift ved ruteskift. Tab forlater CodeMirror.
- Piltaster: `ArrowUp`/`ArrowDown` bytter lesesteg på hele leksjonssiden, ikke bare i et fokusert leseømråde, fordi kravet om å tabbe seg inn først gjorde funksjonen uoppdagbar. De virker også når fokus står på en knapp eller lenke etter Tab, og da flyttes fokus til det nye steget, slik at neste Tab fortsetter derfra. Bare kontroller som selv bruker pil opp/ned (skjemafelt, nedtrekkslister, glidebrytere, iframes, dialoger, opplesningspanelet, kodeverkstedet og CodeMirror) er unntatt, og PageUp/PageDown, mellomrom, Home og End røres ikke, slik at vanlig tastaturscrolling fortsatt finnes.
- Kursnavigasjonen ligger i en dialog, ikke en fast venstrekolonne. Det frigjør bredde til leksjonen og fjerner et permanent støyelement fra lesebildet. Dialogen viser alle nivåene i seksjonen.
- Hvert lesesteg har to kolonner: tekst og kode. Tekstkolonnen bytter side annethvert steg. Kodekolonnen har én fane per språk eksempelet bruker, med seksjonens hovedspråk (eller språket i stegets `:::example`) først, så «Resultat», og for leksjoner med visualiseringen html-document, box-model eller code-flow en ekstra fane («DOM-tre», «Boksmodell», «Programflyt») uten egen forhåndsvisning. Linjer i HTML-koden som svarer til stegets `highlight` (tagg, #id eller .klasse) markeres. Resultat og ekstra fane monteres først når de vises. Under 1000 px står koden under teksten.
- Piltastene stopper på leksjonshodet (`.reading-stop`) før første steg i en ny leksjon. Første leksjon i et nivå scroller til nivåoverskriften. Hopp fra leksjonslisten er umiddelbare, ikke myke. Piltastene scroller med `window.scrollTo` mot et beregnet mål, slik at et nytt tastetrykk alltid avbryter en myk scroll som pågår.
- Lenker i forhåndsvisningen: et srcdoc-dokument løser lenker mot hovedsidens adresse, så et klikk på `href="#tips"` lastet før hele læringssiden inn i rammen. Rammen fanger nå lenkeklikk som ikke allerede er håndtert av eksempelkoden: ankere på samme side markeres og vises, andre lenker stoppes med en melding i rammen og i konsollen. `alert()` virker ikke, fordi sandboxen mangler `allow-modals`.
- Blur: på som standard; tydelig uskarphet og delvis gjennomsiktighet på alt utenom aktivt steg og aktiv leksjons hode, med unntak for markering, focus-within, opplesning og forced colors. Hover skjerper ikke; klikk i et steg gjør det aktivt. Se `docs/ACCESSIBILITY.md` om kontrast.
- Hosting: egne tester server dist på /kurs/web/ uten SPA fallback; aldri file://.
- Tilgjengelighet: axe og tastaturtester suppleres med dokumenterte manuelle kontroller. Automatiske tester gir ikke grunnlag for påstand om full WCAG-samsvar. Se `docs/ACCESSIBILITY.md`.
- Forced colors: kodeblokker setter `Canvas`/`CanvasText` eksplisitt. Uten det arver `-webkit-text-fill-color` forfatterfargen, og kodeteksten blir nesten usynlig i høykontrast.
- Modale dialoger: nettleserens egen felle slipper fokus innom `body` mellom siste og første element. `setupDialog` legger derfor på eksplisitt Tab-ombrytning.
- Landemerker i forhåndsvisnings-iframen dupliserer sidens egne. Beholdt bevisst; eksempelsidene skal være komplette HTML-dokumenter. Testene måler WCAG-taggene, ikke `best-practice`.

## Originaldokumentasjon

Kontrollert 22.09.2026: https://vite.dev/guide/ ; https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ ; https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis . CodeMirror-nettsiden ga 403; installerte pakkers dokumentasjon/types brukes også som primærkilde.
