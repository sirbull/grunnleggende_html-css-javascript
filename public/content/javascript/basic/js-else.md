:::step {"id":"otherwise","caption":"La programmet velge mellom to kodeblokker."}
## En handling for hvert svar

Du vet at `if` kjører en blokk hvis betingelsen er sann. `else` betyr «ellers». Den andre blokken kjører når den samme betingelsen er usann.
:::

:::step {"id":"read","caption":"La programmet velge mellom to kodeblokker."}
## To blokker, ett valg

Den første blokken går fra `{` etter `if` til `}` før `else`. Den andre går fra `{` etter `else` til siste `}`. Bare én av blokkene kjører i dette valget. `else` trenger ikke et nytt spørsmål.
:::

:::step {"id":"predict","caption":"La programmet velge mellom to kodeblokker."}
## Følg alderen 17

`17 >= 18` gir `false`. Programmet hopper over voksenbilletten og skriver `Ungdomsbillett`. Åpne **Resultat** og sammenlign.
:::

:::step {"id":"practice","caption":"La programmet velge mellom to kodeblokker."}
## Test grensen igjen

Her er alderen endret til `18`. Nå skrives `Voksenbillett`. Prøv `19` selv i kodeverkstedet; det gir det samme. Endre én verdi om gangen.

```js example
const alder = 18;
if (alder >= 18) {
  console.log("Voksenbillett");
} else {
  console.log("Ungdomsbillett");
}
```
:::

:::step {"id":"check","caption":"La programmet velge mellom to kodeblokker."}
## Forklar valget

**Stopp og forklar:** Kan begge billettbeskjedene skrives i én kjøring av dette programmet?

**Svar:** Nei. If/else velger én blokk ut fra svaret på spørsmålet.
:::
