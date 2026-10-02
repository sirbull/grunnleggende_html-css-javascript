:::step {"id":"known","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Finn elementet som før

HTML inneholder ett avsnitt med `id="melding"`. Første JavaScript-linje finner det. Nå skal vi endre en klasse i stedet for teksten. Du trenger å kjenne CSS-klasser for denne leksjonen.

:::example html
:::

:::step {"id":"class","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Legg til en klasse

[[dom-classlist|classList]] gir tilgang til elementets klasser. `add("viktig")` legger til klassen `viktig`. Navnet skrives uten punktum her. CSS-regelen `.viktig` bestemmer utseendet.
:::

:::step {"id":"result","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Finn regelen som brukes

Koden ved siden av viser CSS-fanen. `.viktig` gir avsnittet fet skrift. Åpne **Resultat** og se at teksten er uendret, men vises med den stilen.

:::example css
:::

:::step {"id":"practice","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Ta bort klassen

Her står `melding.classList.remove("viktig");` nederst. `remove` tar bort klassen igjen. Åpne **Resultat**: teksten har vanlig skrift.

```js example
const melding = document.querySelector("#melding");
melding.classList.add("viktig");
melding.classList.remove("viktig");
```
:::

:::step {"id":"toggle","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Veksle med toggle

`classList.toggle("viktig")` veksler: den tar bort klassen hvis den finnes, og legger den til hvis den mangler. Her kommer `toggle` etter `add`. Klassen finnes allerede, så `toggle` tar den bort. Åpne **Resultat**: teksten har vanlig skrift.

Fjern `add`-linjen i kodeverkstedet. Da mangler klassen når `toggle` kjører, og teksten blir fet.

```js example
const melding = document.querySelector("#melding");
melding.classList.add("viktig");
melding.classList.toggle("viktig");
```
:::

:::step {"id":"check","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Sjekk hvem som gjør hva

**Stopp og forklar:** Hvor står regelen om fet skrift?

**Svar:** I CSS. JavaScript legger bare til klassen som velger regelen.
:::
