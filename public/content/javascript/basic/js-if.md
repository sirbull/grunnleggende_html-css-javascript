:::step {"id":"choice","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 18.","Spør om alder >= 18.","Hvis sant: skriv Du er voksen.","Fortsett og skriv Ferdig."],"traceActive":0}
## Programmet kan ta et valg

Hittil har instruksjonene kjørt i rekkefølge. En **if-setning** lar programmet utføre noen instruksjoner bare når en betingelse er sann. `if` betyr «hvis».
:::

:::step {"id":"condition","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 18.","Spør om alder >= 18.","Hvis sant: skriv Du er voksen.","Fortsett og skriv Ferdig."],"traceActive":1}
## Spørsmålet står i parentes

`if (alder >= 18)` bruker sammenligningen du kjenner. Programmet regner ut spørsmålet. Hvis svaret er `true`, kjører koden mellom `{` og `}`. Disse krøllparentesene avgrenser en **kodeblokk**.
:::

:::step {"id":"block","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 18.","Spør om alder >= 18.","Hvis sant: skriv Du er voksen.","Fortsett og skriv Ferdig."],"traceActive":2}
## Les blokken

Linjen `console.log("Du er voksen.");` står inne i blokken. Innrykket gjør det lettere for oss å se det. Siste `console.log` står etter avsluttende `}`, altså utenfor blokken.
:::

:::step {"id":"true","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 18.","Spør om alder >= 18.","Hvis sant: skriv Du er voksen.","Fortsett og skriv Ferdig."],"traceActive":2}
## Når betingelsen er sann

Med alderen `18` kjører begge utskriftene:

```text
Du er voksen.
Ferdig.
```

Programmet fortsetter etter if-setningen når blokken er ferdig.
:::

:::step {"id":"practice","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 17.","Spør om alder >= 18. Svaret er false.","Hopp over blokken.","Fortsett og skriv Ferdig."],"traceActive":2}
## Når betingelsen er usann

Her er alderen endret til `17`. Forutsi hvilke beskjeder som kommer, og åpne **Resultat**. Du ser bare `Ferdig.`. Blokken hoppes over, men resten av programmet fortsetter.

```js example
const alder = 17;
if (alder >= 18) {
  console.log("Du er voksen.");
}
console.log("Ferdig.");
```
:::

:::step {"id":"check","caption":"Bruk if til å kjøre eller hoppe over én kodeblokk.","trace":["Les alder: 19.","Spør om alder >= 18. Svaret er true.","Skriv Du er voksen.","Fortsett og skriv Ferdig."],"traceActive":3}
## Sjekk begge veier

Her er alderen `19`. Åpne **Resultat**: både `Du er voksen.` og `Ferdig.` skrives.

**Stopp og forklar:** Hvorfor skrives `Ferdig.` ved både 17 og 19?

**Svar:** Den instruksjonen står utenfor if-blokken og kjøres etter valget.

```js example
const alder = 19;
if (alder >= 18) {
  console.log("Du er voksen.");
}
console.log("Ferdig.");
```
:::
