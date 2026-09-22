:::step {"id":"skeleton","highlight":"html","caption":"html er roten i dokumentet. head og body er de to viktigste barna."}
## Start med dokumentets ramme

Et HTML-dokument er en tekstfil, vanligvis kalt `index.html`. Den første linjen, `<!doctype html>`, ber nettleseren bruke standardmodus.

Alt innhold ligger inne i [[html-element|html-elementet]]. Attributtet `lang="nb"` sier at hovedspråket er norsk bokmål. Det hjelper blant annet skjermleseren med uttalen.

Du skal lære å skille mellom informasjon **om siden** og innholdet **på siden**.
:::
:::step {"id":"head","highlight":"head","caption":"head inneholder metadata. Dette er del av DOM, men vises ikke som vanlig sideinnhold."}
## head beskriver siden

Inni `head` ligger blant annet tegnsett, sidetittel og innstillinger for mobilvisning.

- `charset="UTF-8"` gjør at æ, ø og å tolkes riktig.
- `title` er tittelen i nettleserfanen.
- `viewport` lar siden følge skjermens bredde på mobil.

Tittelen i fanen er forskjellig fra hovedoverskriften inne på siden. I det innebygde resultatvinduet ser du ikke en egen nettleserfane.
:::
:::step {"id":"body","highlight":"body","caption":"body inneholder det synlige innholdet. h1, p og h2 er barn av body."}
## body inneholder siden brukeren ser

Overskrifter, avsnitt og lenker legges i `body`. Her bruker vi [[html-h2|h2]] til en underoverskrift og `h1` til hovedoverskriften.

Nettleseren bygger et [[dom|DOM-tre]] av koden. Et element inni et annet er et barn. body er forelder til overskriften og avsnittene i dette eksempelet.

Innhold blir lettere å lese når det har en tydelig struktur. Velg elementet ut fra hva teksten betyr.
:::
:::step {"id":"source","highlight":"h1","caption":"Den samme HTML-filen brukes her og i kodeverkstedet."}
## Se hele dokumentet

:::example html

Innrykk gjør det lettere for deg å se hvilke elementer som hører sammen. Nettleseren trenger ikke innrykket for å vise siden.
:::
:::step {"id":"build","highlight":"h2","caption":"Prøv å legge til et nytt avsnitt under denne underoverskriften."}
## Bygg videre selv

Åpne kodeverkstedet og gjør tre endringer:

1. Skriv et nytt navn inni `h1`.
2. Endre anbefalingen i det siste avsnittet.
3. Legg til et nytt avsnitt før `</body>`.

**Forventet resultat:** Du får en ny hovedoverskrift og to avsnitt under anbefalingen. Endring av `title` alene endrer ikke overskriften på siden.

Du har nå et komplett dokument. I neste leksjon ser vi nærmere på tagger og attributter.
:::
