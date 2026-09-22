:::step {"id":"concept","caption":"La en handling endre siden.","trace":["Finn knappen i DOM.","Registrer en click-lytter.","Vent på klikk.","Bytt tekst i avsnittet."],"traceActive":0}
## Hva lærer du?

JavaScript kan reagere på handlinger, regne med verdier og endre innholdet på en nettside. I dette eksempelet endrer et klikk teksten i et avsnitt. HTML lager knappen og avsnittet; JavaScript knytter handlingen til knappen.
:::

:::step {"id":"mechanism","caption":"La en handling endre siden.","trace":["Finn knappen i DOM.","Registrer en click-lytter.","Vent på klikk.","Bytt tekst i avsnittet."],"traceActive":1}
## Fra handling til resultat

[[dom-queryselector|querySelector()]] finner elementene. [[dom-listener|addEventListener()]] registrerer hva som skal skje ved et klikk. Koden inni funksjonen kjører senere, når hendelsen kommer. I en vanlig side kan script lastes som en modul med `<script type="module" src="script.js"></script>`.
:::

:::step {"id":"code","caption":"La en handling endre siden.","trace":["Finn knappen i DOM.","Registrer en click-lytter.","Vent på klikk.","Bytt tekst i avsnittet."],"traceActive":2}
## Følg koden

:::example js
:::

:::step {"id":"practice","caption":"Teksten endres ved klikk. Den blir ikke endret bare fordi lytteren registreres.","trace":["Finn knappen i DOM.","Registrer en click-lytter.","Vent på klikk.","Bytt tekst i avsnittet."],"traceActive":3}
## Prøv selv

Endre teksten som vises når du klikker. Kjør koden og bruk knappen i resultatvinduet.

**Dette skal du se:** Teksten endres ved klikk. Den blir ikke endret bare fordi lytteren registreres.
:::
