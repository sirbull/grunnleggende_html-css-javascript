# Tilgjengelighet

Dette dokumentet beskriver hva som faktisk er testet, hva som er funnet, og hva som gjenstår. Det er ikke en samsvarserklæring. Automatiske tester finner en begrenset del av WCAG-kravene, og ingen skjermlesertest med ekte hjelpemiddel er gjennomført ennå.

Sist kontrollert: 22.09.2026.

## Testet automatisk

Kjøres med `npm run check` mot produksjonsbygget på `http://127.0.0.1:4178/kurs/web/`.

| Kontroll | Dekning | Status |
| --- | --- | --- |
| axe-core (wcag2a, wcag2aa, wcag21aa, wcag22aa) | Representative leksjoner i alle fire seksjoner, ordlisten, detaljside, dialog, fokusmodus og kodeverksted | Ingen brudd |
| Overskriftshierarki | Alle 63 leksjoner + ordlisten | Ingen hopp i nivå i artikkelteksten, nøyaktig én `h1` per side |
| Tastaturflyt | Hopp til innhold → dyplenke til leksjon → piltaster → fagorddialog → editor → neste seksjon | Passerer |
| Piltaster uten forutgaende Tab | `ArrowDown` bytter lesesteg rett etter at siden er lastet | Passerer |
| Leksjonsdialog | Åpner fra «Alle leksjoner» i den faste leksjonslinjen, viser alle nivåer, Escape gir fokus tilbake til knappen, valg av leksjon lukker den og flytter fokus til leksjonstittelen | Passerer |
| Kode/resultat-veksler | Faner med piltaster, Home og End; resultatet monteres først når det vises | Passerer |
| Opplesning | Panel fra ikonet i leksjonslinjen, avspiller nede til venstre med navngitte ikonknapper; fokus går til Pause ved start og tilbake til ikonet ved stopp | Passerer |
| Fokusfelle i dialog | Åtte Tab-trykk holder fokus i `dialog`, Escape og klikk på bakgrunnen lukker og gir fokus tilbake til utløseren | Passerer |
| Reflow 320 px | Ingen horisontal scroll, alle tre editorruter synlige | Passerer |
| Zoom 200 % | Ingen horisontal scroll | Passerer |
| Forced colors | Kontroller og kodeblokker lesbare, fokusmodus slår av nedtoning | Passerer |
| `prefers-reduced-motion` | Animasjon og `scroll-behavior` slås av | Passerer |
| Fallback | Ukjent rute, manglende innholdsfil og blokkert `localStorage` gir forståelig tekst og vei videre | Passerer |

## Kjente funn som ikke er rettet

**Dupliserte landemerker på tvers av forhåndsvisnings-iframen.** axe-regelen `landmark-unique` (best practice, ikke et WCAG A/AA-krav) melder fra på tre leksjoner der eksempelet er en komplett HTML-side med egen `header`, `main` og `footer`. Disse ligger inne i forhåndsvisnings-iframen, men axe vurderer sider og rammer under ett.

Vurdering: dette er selve poenget med leksjonene. Å fjerne landemerkene fra eksempelsidene ville gjort dem feil som pedagogisk materiale. Iframen har en beskrivende `title` (`Resultat: <leksjonstittel>`), så en skjermleserbruker får vite hva rammen inneholder før hen går inn i den. Funnet beholdes bevisst, og testene måler derfor bare WCAG-taggene, ikke `best-practice`.

**Kodeblokker bryter linjer.** `pre` bruker `pre-wrap` og `overflow-wrap: anywhere`, slik at lange linjer vises i sin helhet i stedet for å skjules bak horisontal scrolling. Fordi blokkene dermed ikke lenger er rullbare, er `tabindex="0"` fjernet: det ga et tabstopp per kodeblokk uten å gi tilgang til noe.

## Rettet underveis

- Kodeblokker fikk eksplisitte `Canvas`/`CanvasText`-farger under `forced-colors: active`. Uten det arvet `-webkit-text-fill-color` forfatterfargen, og teksten kunne bli tilnærmet usynlig i høykontrastmodus.
- `setupDialog` fikk eksplisitt Tab-ombrytning. Nettleserens egen modal holder fokus inne i dialogen, men lot fokus innom `body` mellom siste og første element. Da hadde et Tab-trykk tilsynelatende ingen mottaker.

## Manuelle kontroller som gjenstår

Disse må gjøres av et menneske før løsningen kan omtales som testet for universell utforming:

- [ ] NVDA på Windows: les en hel leksjon, bruk fagorddialogen, åpne kodeverkstedet, naviger mellom leksjoner.
- [ ] VoiceOver på macOS eller iOS: samme flyt.
- [ ] Kontroller at forhåndsvisnings-iframen annonseres forståelig, og at brukeren kommer ut av den igjen.
- [ ] Kontroller at opplesningen ikke kolliderer med skjermleserens egen tale.
- [ ] Windows høykontrast med et ekte tema, ikke bare nettleserens emulering. Emuleringen tvinger ikke alle farger på samme måte som operativsystemet.
- [ ] Test med forstørrelse på mobil i liggende format.

Skriv funn inn i dette dokumentet når de er gjort, med dato og hvilket hjelpemiddel og hvilken versjon som ble brukt.

## Prinsipper koden hviler på

- Semantisk HTML først. ARIA brukes bare der det ikke finnes et element som gjør jobben.
- Native `dialog` med `showModal()` for modaler, med fokus tilbake til utløseren ved lukking.
- Piltaster bytter lesesteg på hele leksjonssiden, også når fokus står på en knapp eller lenke. Fokus følger da med til det nye steget. Unntatt er kontroller som selv bruker pil opp/ned, dialoger, iframes, kodeverkstedet og CodeMirror. De stopper også på hvert leksjonshode, slik at ingen leksjon starter uten at overskriften har vært på skjermen.
- Illustrasjonene er `figure`-elementer merket `no-speech`, så opplesningen leser bare teksten.
- En seksjon er én lang side med `h1` (seksjon), `h2` (nivå), `h3` (leksjon) og `h4`/`h5` (steg). Overskriftene i Markdown flyttes to nivåer ned ved visning.
- Tab forlater CodeMirror i stedet for å sette inn tabulator, slik at editoren ikke blir en felle.
- Fokusmodus er på som standard og kan slås av med én kontroll i leksjonslinjen. Valget lagres. Nedtoningen er gradert, slik at stegene rett over og under det aktive er mindre nedtonet enn resten, og den har unntak for markering, `focus-within`, opplesning og forced colors. Leksjonshoder, leksjonsslutt og nivåoverskrifter utenfor det som leses nå dempes også. Hover skjerper ikke lenger (endret 24.09.2026): en mus som hviler på siden avslørte tilfeldig tekst. Klikk i et steg gjør det aktivt i stedet. Knappen vises som en bryter, og lagringsnøkkelen er ny, så alle starter med fokusmodus på.
- Nedtoningen bruker både uskarphet og `opacity` (0,22, og 0,38 for nabostegene). Det er et bevisst valg etter brukertest 24.09.2026: den svakere nedtoningen var fortsatt forstyrrende. Dempet tekst oppfyller dermed ikke kontrastkravet mens den er dempet. Det er meningen, siden det ikke er den teksten som leses nå, og den blir skarp med én gang den får fokus, holdes over eller blir aktiv. Axe kjører kontrastregelen uten elementene som faktisk er dempet (`tests/e2e/helpers.js`); alle andre regler dekker hele siden. Vurder på nytt om fokusmodus heller skal være av som standard.
- Statusmeldinger går gjennom et `role="status"`-felt i stedet for å flytte fokus.
