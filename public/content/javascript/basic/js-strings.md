:::step {"id":"pieces","caption":"Bygg en beskjed av tekst og en verdi du har lagret."}
## Tre deler blir én tekst

Du vet at `+` kan sette sammen tekst. Her bruker vi det til å sette sammen `"Hei, "`, verdien i `navn` og `"!"`.
:::

:::step {"id":"read","caption":"Bygg en beskjed av tekst og en verdi du har lagret."}
## Les delene fra venstre

Først blir `"Hei, " + navn` til `Hei, Ada`. Så legges `!` til. Hele svaret lagres i variabelen `hilsen`. Det er lov å bruke en variabel til å gi en annen variabel en verdi.
:::

:::step {"id":"space","caption":"Bygg en beskjed av tekst og en verdi du har lagret."}
## Mellomrom er også tegn

Resultatet er `Hei, Ada!`. Mellomrommet etter kommaet står inni den første teksten. JavaScript legger ikke inn mellomrom automatisk når `+` setter sammen tekst.
:::

:::step {"id":"practice","caption":"Bygg en beskjed av tekst og en verdi du har lagret."}
## Endre én del

Her er mellomrommet etter kommaet fjernet: `"Hei,"`. Forutsi hele beskjeden før du åpner **Resultat**. Den blir `Hei,Ada!`, uten mellomrom.

Prøv selv: bytt `Ada` med ditt eget navn, og fjern og sett tilbake mellomrommet.

```js example
const navn = "Ada";
const hilsen = "Hei," + navn + "!";
console.log(hilsen);
```
:::

:::step {"id":"check","caption":"Bygg en beskjed av tekst og en verdi du har lagret."}
## Lag en egen beskjed

Her er `"Hei, "` byttet med `"Velkommen, "`.

**Sjekk:** Konsollen viser `Velkommen, Ada!`. Forklar hvorfor `navn` står uten anførselstegn midt i uttrykket: det skal hente variabelens verdi.

```js example
const navn = "Ada";
const hilsen = "Velkommen, " + navn + "!";
console.log(hilsen);
```
:::
