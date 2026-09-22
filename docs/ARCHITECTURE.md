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
`tests/`: unit/content/E2E/axe. `docs/`: forfatter- og driftsveiledning.

## Dataflyt

Hash → manifestoppslag → Markdown + eksempel → sanitisert artikkel → IntersectionObserver/lesepunkt → aktivt steg → visualisering.update(metadata). Navigasjon avbryter fetch, tale, observer og editor. Ukjente ruter viser forståelig feil og vei tilbake. CodeMirror importeres først ved åpning.

Referansemanifestet peker til JSON-filer med komplette oppføringer. Søk indekserer ID, kodeform, aliases, norske fraser, definisjon og keywords; exact code-match rangeres først. Norsk sortering. Detaljer bruker samme oppføring som modalordforklaringen.

## Risiko og tiltak

- Markdown: rå HTML er av, resultat sanitiseres, direktiver valideres, fagord behandles bare i tekstnoder utenfor kode/lenker.
- Preview: sandbox allow-scripts, aldri allow-same-origin; CSP sperrer ekstern nettverkstilgang. postMessage sjekker source og økt-ID. Vilkårlig uendelig JavaScript kan fortsatt belaste nettleseren; stopp fjerner rammen. Dette er et lokalt øvingsverktøy, ikke en tjeneste for ukjent fiendtlig kode.
- localStorage/fetch i opaque iframe: virkelige origin-API-er er sperret. Eksempler demonstrerer lokal lagring med eksplisitt merket minnelager; fetch bruker lokal data-URL. Produksjonsbruk forklares i leksjonen.
- Tale: systemstemmene varierer, norsk prioriteres; feil og manglende API forklares. Setningsbasert pause/gjenopptaking og generasjonsteller.
- Fokus: native modal, gjenoppretting til åpner, overskrift ved ruteskift; piltaster kun i leseområdet. Tab forlater CodeMirror.
- Blur: av som standard; subtil nedtoning med unntak for hover, markering, focus-within og forced colors.
- Hosting: egne tester server dist på /kurs/web/ uten SPA fallback; aldri file://.
- Tilgjengelighet: axe og tastaturtester suppleres med dokumenterte manuelle kontroller. Automatiske tester gir ikke grunnlag for påstand om full WCAG-samsvar.

## Originaldokumentasjon

Kontrollert 22.09.2026: https://vite.dev/guide/ ; https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ ; https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis . CodeMirror-nettsiden ga 403; installerte pakkers dokumentasjon/types brukes også som primærkilde.
