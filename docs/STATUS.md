# Status

## Current phase
FASE 14 – malifisering fullført. Løsningen er funksjonelt komplett for 1.0.

## Completed
- [x] FASE 0: separat lokal referanse-checkout, faktisk kildekodeanalyse og arkitekturbeslutning.
- [x] Hele masterprompten lest. Brukerens mål er en ferdig 1.0; faseplanen gjennomføres videre uten ekstra godkjenning mellom reversible steg.
- [x] FASE 1–2: Vite, tokens, responsiv struktur, manifest, Markdown og ruter. Fire unit-tester passerer.
- [x] FASE 3–4: observer, lesepunkt, visualiseringsmoduler, piltaster og lagret fokusmodus.
- [x] FASE 5: referanseoppføringer, søk, filtre, bokstaver, deep links og fagorddialog.
- [x] FASE 6–7: opplesning og lazy CodeMirror, isolert HTML/CSS/JS, kjøring, reset og lagring.
- [x] FASE 8: komplett dokumentstruktur-leksjon testet, inkludert axe og 320px reflow.
- [x] FASE 9–11: 63 leksjoner over HTML, CSS, JavaScript og Samspill på tre nivåer, med eksempler og visualiseringer. Samspill har 19 cases: 7 grunnleggende, 6 videre og 6 fordypning.
- [x] FASE 10B: 219 referanseoppføringer med norske aliases, sortering, relaterte begreper og kjørbare eksempler. Grunnforklaringer viser hva HTML, CSS, JavaScript, JSON, DOM, Web API, universell utforming, WCAG og ARIA betyr og gjør. Emneintroduksjoner vises ved kategorifiltrering og søk på emnenavn. JSON er også forklart i leksjonen om lokal lagring.
- [x] FASE 12: tre feilende robusthetstester diagnostisert og rettet. Hele kjeden er grønn: 4 unit-tester, innholdsvalidering og 18 Playwright-scenarier mot produksjonsbygget på `/kurs/web/`. De 12 nye Samspill-casene er testet med inndata og handlinger. JSON-oppslaget, det kjørbare eksempelet og leksjonslenken er testet.
- [x] FASE 13: `docs/DEPLOYMENT.md` med konkrete steg og verifiseringsliste. Undermappebygget er dekket av egne tester.
- [x] FASE 14: kursnavn og referansekategorier flyttet fra kode til manifest. `docs/CREATE_NEW_COURSE.md` og `docs/CONTENT_AUTHORING.md` skrevet.

## In progress
- [ ] Ingen pågående kodearbeid.

## Blocked
- Ingen teknisk blocker.

## Known issues
- Skjermlesertest med NVDA og VoiceOver er ikke gjennomført. Ingen samsvarspåstand er gjort. Gjenstående manuelle kontroller er listet i `docs/ACCESSIBILITY.md`.
- axe melder `landmark-unique` på tre leksjoner fordi forhåndsvisnings-iframen inneholder komplette eksempelsider med egne landemerker. Beholdt bevisst, begrunnet i `docs/ACCESSIBILITY.md`.
- `combined/advanced/project-cart` gir `heading-order` fra en `h3` uten forutgående `h2` inne i eksempelsiden. Ligger i `public/examples/combined/project-cart/index.html` og er ikke rettet, siden innholdet er under arbeid.

## Rettet i FASE 12
1. Kodeblokker var tilnærmet usynlige under forced colors. `-webkit-text-fill-color` arvet forfatterfargen når nettleseren tvang `color`. Løst med eksplisitte `Canvas`/`CanvasText`-farger.
2. Fokus forlot den modale dialogen innom `body` mellom siste og første element. `setupDialog` fikk eksplisitt Tab-ombrytning.
3. Robusthetstesten navigerte til samme hash-URL på nytt, noe nettleseren behandler som ingen navigasjon, og stubbet 404-svar ble i tillegg hurtiglagret. Testen bruker nå appens egen «Prøv igjen»-knapp og `reload()`, og dekker dermed også gjenopprettingsveien i brukergrensesnittet.

## Endret etter brukertest (22.09.2026)
Fire funn fra gjennomgang i nettleser, alle rettet:
1. Piltastnavigasjon krevde at man først tabbet inn i artikkelen, noe ingen oppdager. Lytteren ligger nå på dokumentet, med unntak for kontroller, dialoger og CodeMirror.
2. Forhåndsvisningen klippet eksempelet, og kodeblokker skjulte lange linjer bak horisontal scrolling. Rammen melder nå høyden sin og vokser med innholdet, og kodeblokker bryter linjer i stedet for å scrolle.
3. Fokusmodus var av som standard og effekten var for svak til å merkes. Den er nå på som standard, tydeligere, og gradert mot nabostegene.
4. «Forrige steg»/«Neste steg» er fjernet. Scrolling og piltaster driver lesepunktet.

Kursnavigasjonen flyttet fra fast venstrekolonne til dialog. Leksjonen får hele bredden, og oppsettet er to kolonner over 1100px og én kolonne under.

## Endret etter brukertest (24.09.2026)
1. Hver seksjon (HTML, CSS, JavaScript, Samspill) er én lang side. Nivåer har egne skillelinjer, og hver leksjon starter med et tydelig leksjonshode. En fast leksjonslinje viser hvilken leksjon du er i. Adressefeltet og sidetittelen følger lesingen.
2. Sidepanelet «Se det i praksis» er erstattet av en veksler mellom kode og resultat der eksempelet står i teksten.
3. Fokusmodus demper sterkere, med mer uskarphet og delvis gjennomsiktighet. Dette går bevisst på bekostning av kontrasten i dempet tekst; se `docs/ACCESSIBILITY.md`.
4. Opplesning: ikon med innstillingspanel (stemme, hastighet, omfang) i leksjonslinjen og en liten avspiller nede til venstre. Naturlige norske stemmer i Edge velges automatisk.
5. Visuell læring tilbake: hvert steg har tekst og kode side om side, med tekstkolonnen annethvert steg til venstre og høyre. Koden vises først, med stegets linjer markert, og resultatet er én fane unna. DOM-tre, boksmodell og programflyt er egne faner.
6. Piltastene stopper på leksjonsoverskriftene.
7. Lenker i forhåndsvisningen laster ikke lenger hovedsiden inn i rammen; se `docs/ARCHITECTURE.md`.
8. Innstillingsdialogen er fjernet (endret i en parallell økt). Knappen «Slett mine lokale data» finnes dermed ikke lenger. Personvernteksten om nettbaserte stemmer står nå i opplesningspanelet.

## Next
1. Manuell skjermlesertest og resten av listen i `docs/ACCESSIBILITY.md`.
2. Produksjonsbuild lastes opp etter `docs/DEPLOYMENT.md`, og verifiseringslisten fylles ut på den ferdige adressen.
3. Innholdsgjennomgang med ferske øyne: språk, progresjon og vanskegrad for en helt fersk leser.
