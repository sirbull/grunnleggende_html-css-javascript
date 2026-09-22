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
- [x] FASE 9–11: 51 leksjoner over HTML, CSS, JavaScript og Samspill på tre nivåer, med eksempler og visualiseringer.
- [x] FASE 10B: 211 referanseoppføringer med norske aliases, sortering, relaterte begreper og kjørbare eksempler.
- [x] FASE 12: tre feilende robusthetstester diagnostisert og rettet. Hele kjeden er grønn: 4 unit-tester, innholdsvalidering og 13 Playwright-scenarier mot produksjonsbygget på `/kurs/web/`.
- [x] FASE 13: `docs/DEPLOYMENT.md` med konkrete steg og verifiseringsliste. Undermappebygget er dekket av egne tester.
- [x] FASE 14: kursnavn og referansekategorier flyttet fra kode til manifest. `docs/CREATE_NEW_COURSE.md` og `docs/CONTENT_AUTHORING.md` skrevet.

## In progress
- [ ] Ingen pågående kodearbeid.

## Blocked
- Ingen teknisk blocker.

## Known issues
- Skjermlesertest med NVDA og VoiceOver er ikke gjennomført. Ingen samsvarspåstand er gjort. Gjenstående manuelle kontroller er listet i `docs/ACCESSIBILITY.md`.
- axe melder `landmark-unique` på tre leksjoner fordi forhåndsvisnings-iframen inneholder komplette eksempelsider med egne landemerker. Beholdt bevisst, begrunnet i `docs/ACCESSIBILITY.md`.

## Rettet i FASE 12
1. Kodeblokker var tilnærmet usynlige under forced colors. `-webkit-text-fill-color` arvet forfatterfargen når nettleseren tvang `color`. Løst med eksplisitte `Canvas`/`CanvasText`-farger.
2. Fokus forlot den modale dialogen innom `body` mellom siste og første element. `setupDialog` fikk eksplisitt Tab-ombrytning.
3. Robusthetstesten navigerte til samme hash-URL på nytt, noe nettleseren behandler som ingen navigasjon, og stubbet 404-svar ble i tillegg hurtiglagret. Testen bruker nå appens egen «Prøv igjen»-knapp og `reload()`, og dekker dermed også gjenopprettingsveien i brukergrensesnittet.

## Next
1. Manuell skjermlesertest og resten av listen i `docs/ACCESSIBILITY.md`.
2. Produksjonsbuild lastes opp etter `docs/DEPLOYMENT.md`, og verifiseringslisten fylles ut på den ferdige adressen.
3. Innholdsgjennomgang med ferske øyne: språk, progresjon og vanskegrad for en helt fersk leser.
