:::step {"id":"known","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Finn elementet som før

HTML inneholder ett avsnitt med `id="melding"`. Første JavaScript-linje finner det. Nå skal vi endre en klasse i stedet for teksten. Du trenger å kjenne CSS-klasser for denne leksjonen.
:::

:::step {"id":"class","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Legg til en klasse

[[dom-classlist|classList]] gir tilgang til elementets klasser. `add("viktig")` legger til klassen `viktig`. Navnet skrives uten punktum her. CSS-regelen `.viktig` bestemmer utseendet.
:::

:::step {"id":"result","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Finn regelen som brukes

Åpne CSS-fanen. `.viktig` gir avsnittet fet skrift. Åpne **Resultat** og se at teksten er uendret, men vises med den stilen.
:::

:::step {"id":"practice","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Ta bort klassen

Sett inn `melding.classList.remove("viktig");` nederst og kjør. `remove` tar bort klassen igjen, og teksten får vanlig skrift. Fjern denne linjen etterpå.
:::

:::step {"id":"check","caption":"La CSS bestemme utseendet mens JavaScript velger klassen."}
## Sjekk hvem som gjør hva

**Stopp og forklar:** Hvor står regelen om fet skrift?

**Svar:** I CSS. JavaScript legger bare til klassen som velger regelen. `classList.toggle("viktig")` kan veksle: den tar bort klassen hvis den finnes, og legger den til hvis den mangler. Prøv den som siste linje.
:::
