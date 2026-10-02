:::step {"id":"event","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Noe kan skje etter at programmet har startet

En [[dom-event|hendelse]] er en beskjed fra nettleseren om at noe har skjedd. Vi bruker `click`: knappen er aktivert. En ekte `<button>` kan aktiveres med både mus og tastatur.

:::example html
:::

:::step {"id":"find","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Finn de to elementene

De første to linjene finner knappen og avsnittet. Det er samme `querySelector` som før. Funksjonen `visHilsen` beskriver hva som skal skje: avsnittet får teksten `Hei!`.
:::

:::step {"id":"listen","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Registrer jobben som skal gjøres

`knapp.addEventListener("click", visHilsen);` betyr «når knappen aktiveres, kall visHilsen». Komma skiller hendelsens navn fra funksjonen som skal kjøre.

Vi skriver `visHilsen` **uten** `()`. Vi gir nettleseren funksjonen, slik at den kan kalle den senere. En funksjon som gis til annen kode for å bli kalt, kalles en **callback**.
:::

:::step {"id":"wait","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Se forskjellen på nå og senere

Åpne **Resultat**. Det står først `Venter på et klikk.`. Trykk knappen. Nå kjører funksjonen, og teksten blir `Hei!`. Registrering av lytteren kjørte med en gang; innholdet i funksjonen ventet på klikket.
:::

:::step {"id":"practice","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Prøv med tastaturet

Bruk Tab til knappen i resultatvinduet og aktiver den med Enter eller mellomrom. Bytt deretter bare hilsenen i funksjonen og test på nytt. Du trenger ingen teller eller if-setning for denne hendelsen.
:::

:::step {"id":"check","caption":"Registrer én hendelseslytter med en funksjon du kjenner."}
## Forklar ventingen

Her står `visHilsen()` **med** parenteser i `addEventListener`. Åpne **Resultat** uten å trykke knappen. Teksten er allerede `Hei!`. Funksjonen ble kalt med en gang, mens lytteren ble registrert, og knappen gjør ingenting når du trykker den.

**Stopp og forklar:** Hvorfor skriver vi ikke `visHilsen()` i `addEventListener`?

**Svar:** Det kaller funksjonen med en gang. Da får `addEventListener` svaret fra kallet, ikke funksjonen. Nettleseren trenger selve funksjonen for å kalle den når hendelsen skjer.

```js example
const knapp = document.querySelector("button");
const resultat = document.querySelector("#resultat");
function visHilsen() {
  resultat.textContent = "Hei!";
}
knapp.addEventListener("click", visHilsen());
```
:::
