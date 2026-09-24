# Tilgjengelighet

Dette dokumentet beskriver hva som faktisk er testet, hva som er funnet, og hva som gjenstår. Det er ikke en samsvarserklæring. Automatiske tester finner en begrenset del av WCAG-kravene, og ingen skjermlesertest med ekte hjelpemiddel er gjennomført ennå.

Sist kontrollert: 22.09.2026.

## Testet automatisk

Kjøres med `npm run check` mot produksjonsbygget på `http://127.0.0.1:4178/kurs/web/`.

| Kontroll | Dekning | Status |
| --- | --- | --- |
| axe-core (wcag2a, wcag2aa, wcag21aa, wcag22aa) | Representative leksjoner i alle fire seksjoner, ordlisten, detaljside, dialog, fokusmodus og kodeverksted | Ingen brudd |
| Overskriftshierarki | Alle 63 leksjoner + ordlisten | Ingen hopp i nivå i artikkelteksten, nøyaktig én `h1` per side |
| Tastaturflyt | Hopp til innhold → artikkel → piltaster → fagorddialog → editor → neste leksjon | Passerer |
| Piltaster uten forutgaende Tab | `ArrowDown` bytter lesesteg rett etter at siden er lastet | Passerer |
| Leksjonsdialog | Åpner fra «Alle leksjoner», axe-ren, Escape gir fokus tilbake til knappen, valg av leksjon lukker den | Passerer |
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
- Piltastnavigasjon gjelder bare inne i artikkelen, så den ikke stjeler tastetrykk fra resten av siden.
- Tab forlater CodeMirror i stedet for å sette inn tabulator, slik at editoren ikke blir en felle.
- Fokusmodus er på som standard og kan slås av med én kontroll i leseverktøylinjen. Valget lagres. Nedtoningen er gradert, slik at stegene rett over og under det aktive er lettere nedtonet enn resten, og den har unntak for hover, markering, `focus-within` og forced colors.
- Nedtoningen bruker uskarphet og `--muted`, ikke `opacity`. Dempet tekst holder seg dermed innenfor kontrastkravet, slik at standardvisningen ikke først bryter WCAG for så å bli reddet av en innstilling.
- Statusmeldinger går gjennom et `role="status"`-felt i stedet for å flytte fokus.
