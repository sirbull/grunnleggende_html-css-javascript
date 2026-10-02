:::step {"id":"before","caption":"Følg én teller før du lager en til."}
## Bygg på funksjoner og scope

Du vet at en funksjon kan lese navn fra området utenfor den. Her lager vi funksjonen `tell` inni `lagTeller`. Den skal fortsette å ha tilgang til `antall` etter at `lagTeller` har returnert. Dette kalles en **closure**.
:::

:::step {"id":"create","caption":"Følg én teller før du lager en til."}
## Lag en teller

`lagTeller()` lager først `antall` med verdien `0`, og så funksjonen `tell`. `return tell` gir tilbake selve funksjonen, uten å kalle den. Variabelen `teller` får denne funksjonen som verdi.
:::

:::step {"id":"first","caption":"Følg én teller før du lager en til."}
## Kall funksjonen du fikk

`teller()` kjører `tell`. Den leser `antall`, øker fra 0 til 1 og returnerer 1. Funksjonen har beholdt tilgangen til variabelen fra området der den ble laget.
:::

:::step {"id":"second","caption":"Følg én teller før du lager en til."}
## Samme teller husker verdien

Neste `teller()` bruker samme `antall`, som nå er 1. Den øker til 2 og returnerer 2. Konsollen viser `1` og `2`, ikke `1` og `1`.
:::

:::step {"id":"practice","caption":"Følg én teller før du lager en til."}
## Lag en uavhengig teller

Legg til `const annenTeller = lagTeller();` og `console.log(annenTeller());` nederst. Forutsi og kjør: den nye telleren gir `1`, fordi det nye kallet til `lagTeller` lager sitt eget område med en ny `antall`.
:::

:::step {"id":"check","caption":"Følg én teller før du lager en til."}
## Forklar hva som huskes

**Stopp og forklar:** Hva skiller `teller()` fra `lagTeller()`?

**Svar:** `teller()` øker en eksisterende teller. `lagTeller()` lager en ny funksjon med en egen antall-variabel.
:::
