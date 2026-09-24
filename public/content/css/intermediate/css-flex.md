:::step {"id":"concept","caption":"Fordel kort langs én hovedakse.","highlight":""}
## Hva lærer du?

[[css-flexbox|Flexbox]] aktiveres på forelderen med display: flex. Barna blir flex-elementer. Retningen er row som standard. flex-direction: column legger dem under hverandre.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

`gap` gir mellomrom uten margin på hvert barn. `justify-content` fordeler ledig plass langs hovedaksen. `align-items` plasserer barna på tvers. `flex-wrap: wrap` lar dem gå til neste linje når plassen blir knapp.
:::

:::step {"id":"practice","caption":"Fordelingen følger forelderen. Når kortene kan brytes over flere linjer, unngår du at en lang rad presses utenfor en smal skjerm.","highlight":""}
## Prøv selv

Bytt mellom row og column. Prøv justify-content: space-between. Legg til et fjerde kort og gjør resultatvinduet smalere.

**Dette skal du se:** Fordelingen følger forelderen. Når kortene kan brytes over flere linjer, unngår du at en lang rad presses utenfor en smal skjerm.
:::
