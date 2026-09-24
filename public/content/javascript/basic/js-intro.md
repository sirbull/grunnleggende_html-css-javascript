:::step {"id":"why","caption":"Programmet skriver fire linjer i konsollen, én for hver console.log.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":0}
## HTML, CSS og så JavaScript

Du kjenner allerede to av språkene på en nettside:

- **HTML** bestemmer *hva* som står på siden.
- **CSS** bestemmer *hvordan* det ser ut.
- **[[what-is-javascript|JavaScript]]** bestemmer *hva som skjer*.

HTML og CSS beskriver en side som står stille. JavaScript kan få siden til å gjøre ting: huske, regne, velge og svare når du trykker på noe.
:::

:::step {"id":"examples","caption":"Programmet skriver fire linjer i konsollen, én for hver console.log.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":0}
## Hva kan JavaScript brukes til?

Nesten alle nettsider du bruker, har JavaScript. Noen eksempler:

- En **handlekurv** som regner ut totalprisen når du legger til en vare.
- Et **skjema** som sier fra at e-postadressen mangler @, før du sender det.
- En **meny** som åpner seg når du trykker på den.
- Et **spill** som teller poeng og sier fra når tiden er ute.
- En **mørk modus** som husker valget ditt til neste besøk.

Eksemplene har noe til felles. Siden må *huske* noe, *regne* eller *bestemme* noe, og så *vise* resultatet. Det er nettopp det du skal lære å gjøre, ett lite steg om gangen.
:::

:::step {"id":"program","caption":"Nettleseren leser koden ovenfra og ned og gjør én ting per linje.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":0}
## Et program er en liste med instruksjoner

Å programmere betyr å skrive instruksjoner som datamaskinen følger. Det ligner på en oppskrift: gjør dette, så dette, så dette.

Nettleseren leser koden **ovenfra og ned**, én linje om gangen. Den gjør nøyaktig det som står, og den gjetter ikke hva du mente. En liten skrivefeil kan derfor stoppe hele programmet. Det er helt normalt, og du lærer fort å finne feilene.

Linjene øverst i eksempelet starter med `//`. Det er **kommentarer**: notater til den som leser koden. Datamaskinen hopper over dem.
:::

:::step {"id":"first-line","caption":"console.log skriver det som står inni parentesene. Åpne fanen Resultat og se konsollen.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":0}
## Din første instruksjon

```js
console.log("Hei! Jeg er ditt første program.");
```

Slik leser du linjen:

- `console` er **[[js-console|konsollen]]**, et lite vindu der programmet kan skrive beskjeder til deg.
- `.log` betyr «skriv». Punktumet binder de to ordene sammen.
- Det som står inni **parentesene**, er det som skal skrives.
- **Anførselstegnene** viser at dette er tekst.
- **Semikolonet** `;` markerer at instruksjonen er slutt.

Åpne fanen **Resultat**. Under siden ser du konsollen med det programmet har skrevet.
:::

:::step {"id":"text-or-math","caption":"Uten anførselstegn regner JavaScript ut 2 + 3. Med anførselstegn skrives teksten akkurat slik den står.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":2}
## Regne eller skrive tekst?

Se på disse to linjene:

```js
console.log(2 + 3);
console.log("2 + 3");
```

Den første skriver `5`. Uten anførselstegn *regner* JavaScript ut svaret.

Den andre skriver `2 + 3`. Med anførselstegn er det bare tekst, og teksten skrives akkurat slik den står.

Anførselstegn betyr altså noe i JavaScript. Du kommer til å se forskjellen mellom tekst og tall mange ganger.
:::

:::step {"id":"practice","caption":"Hver nye console.log gir en ny linje i konsollen, i samme rekkefølge som i koden.","trace":["Linje 4: skriv en hilsen.","Linje 5: regn ut 2 + 3 og skriv svaret.","Linje 6: skriv teksten «2 + 3» akkurat slik den står.","Linje 7: skriv «Ferdig!»."],"traceActive":3}
## Prøv selv

Åpne kodeverkstedet og gjør små endringer:

1. Bytt ut hilsenen med din egen tekst.
2. Legg til en ny linje som skriver navnet ditt.
3. Regn ut `7 * 6`. Stjernen `*` betyr gange.

**Sjekk forståelsen:** Hva tror du `console.log("7 * 6")` skriver? Prøv og se om du hadde rett.

I de neste leksjonene lærer du hvordan et program *husker* verdier. Etter det lærer du å ta valg, lage egne funksjoner og til slutt endre selve nettsiden når noen trykker på en knapp.
:::
