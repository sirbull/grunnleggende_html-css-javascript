# Referanseanalyse

Analysert 22. september 2026. Lokal checkout: `../_reference_hvordan-ki-fungerer`.
Kilde: https://github.com/sirbull/hvordan-ki-fungerer, commit `cbd399f7646649272cb8fc0af995e446feed73eb`.

## Struktur og stack

Roten har AGENTS.md, CLAUDE.md og `ai/`. Produksjonen består av `ai/index.html`, `css/stil.css`, `js/app.js`, `js/manus.js`, `js/scener.js`, `js/ordliste.js`, `js/quiz.js` og lokale bilder/lyd. `tekst/` inneholder Markdown-lesekopier. Ingen package.json, lockfil, byggkonfigurasjon eller automatiserte tester finnes i checkouten. LES-MEG.md beskriver direkte opplasting av ai-mappen. Entry point er index.html med globale scriptobjekter, ikke ES-moduler. Fontene lastes fra Google.

## Innhold og dataflyt

`ai/js/manus.js:26` definerer `window.MANUS`. Kapitlene har ID, tittel, scene og tre spor med ingress/avsnitt. Markdown er en parallell lesekopi, ikke runtime-kilden. `app.js:72` formaterer tekst, fet skrift og fagord. `app.js:111` bygger kapittelskallet og slår opp scenen i `window.SCENER`; `app.js:271` bygger avsnitt som `.beat`. `sceneSteg()` rundt linje 330 oversetter avsnittsindeks til sceneindeks fra manus. `aktiverBeat()` oppdaterer klasser og kaller scenens `settTilstand()` med cache for å unngå gjentakelse.

## Aktivt lesesteg og visualisering

`app.js:864` bruker requestAnimationFrame-begrenset scroll og getBoundingClientRect mot en trigger ved 44 % av skjermhøyden. Det er **ikke IntersectionObserver som velger aktivt steg**. Observeren rundt linje 1015 brukes til inntoning; `scener.js:74` bruker observer for å stoppe animasjoner utenfor skjermen. En tidsbegrenset navigasjonslås hindrer sceneflimmer under tastehopp. `scener.js` registrerer navngitte funksjoner som fyller en vert og returnerer `settTilstand` og eventuelt `stopp`. Eksempel på tilstandsgrensesnitt: linje 270 og 474. Canvas har alternative navn; ResizeObserver skalerer lerretet.

## Layout og fokus

`stil.css:345–386` bruker CSS Grid med tittel/tekst til venstre og sticky scene til høyre. På mobil kommer scenen mellom innledning og videre tekst. Tokens finnes i starten av stilarket: mørk palett, tekstfarger, avstand, lesebredde og bevegelse. `.beat` rundt linje 430 starter med opacity .14 og blur(4px); dette blir for sterkt som standard for vårt læremiddel. Skip link og :focus-visible finnes. Global tastaturlytter i `app.js:975` unntar input, textarea, select, contenteditable og dialog, men tar også Home/End/PageDown globalt. Vi avgrenser pil opp/ned til et eksplisitt leseområde og lar alle kontroller beholde tastene.

## Ordforklaring og tale

`app.js:745–833` bruker popover til enkeltord og native dialog til hele ordlisten. Ordlisteknappen gir native fokusfelle; popover har egen retur til åpneren. Fagord syntaks i referansen er vist tekst først, nøkkel sist. Nytt prosjekt følger masterpromptens nøkkel først. `app.js:1043–1254` velger norsk stemme, lytter på voiceschanged, deler tekst i setninger og knytter opplesningen til aktivt steg. Generasjonsteller forkaster gamle end/error-hendelser. Pause avbryter talen og fortsett starter gjeldende setning på nytt. Dette robuste mønsteret gjenbrukes, med tydelig informasjon om gjenopptaking. Ingen autoplay.

## Lagring og hosting

`app.js:726,1269` lagrer `ai-spor` med try/catch. Navigasjonen bruker dokumentankre, ingen serverruter. Relative CSS/JS/bildestier fungerer i undermappe. Det finnes ingen backend. Referanse-checkouten ligger utenfor prosjektet og er ikke del av runtime/build.

## Beslutninger

- Behold: tekst driver scene, få avsnitt per steg, native semantikk, lokal preferanselagring, reduced motion, relative ressurser og opprydding av tale.
- Generaliser: manifest for seksjoner/nivåer/leksjoner, scene-registry med update/destroy, data i redigerbare filer, én referansekilde for fagord og oppslagsverk.
- Forbedre: opt-in subtil fokusmodus, isolert preview, lazy CodeMirror, sanitisert Markdown, feiltilstander, tester, begrensede tastatursnarveier og eksplisitt fokusstyring ved ruteskift.
- Forkast: globale window-innholdsobjekter, dobbelt vedlikehold av Markdown/JS, sterk obligatorisk blur, eksterne fonter og en stor fil med alle scener.
- Ingen kildekode eller medier er kopiert fra referansen; implementasjonen er ny og bygger på analyserte mønstre.
