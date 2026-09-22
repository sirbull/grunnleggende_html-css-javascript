:::step {"id":"concept","caption":"Velg alle kortene, direkte barn eller bare det fremhevede kortet.","highlight":""}
## Hva lærer du?

[[css-descendant|.card-grid .card]] treffer kort som ligger et sted inni gruppen. Mellomrommet betyr en relasjon mellom elementer. [[css-combined|.card.featured]] uten mellomrom krever to klasser på samme element.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

[[css-child|.card-grid > .card]] velger bare direkte barn. `:nth-child(2)` velger etter plassering blant søsken. Bruk en meningsfull klasse når stylingen handler om hva elementet er. Da tåler den at rekkefølgen endres.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example css

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Kanten følger klassen featured. En regel med nth-child(2) ville fulgt plasseringen i stedet. Dette er forskjellen på tilstand og posisjon.","highlight":""}
## Prøv selv

Flytt kort 2 til første plass. Gi deretter kort 3 featured-klassen. Hvilket kort får den tykke kanten?

**Dette skal du se:** Kanten følger klassen featured. En regel med nth-child(2) ville fulgt plasseringen i stedet. Dette er forskjellen på tilstand og posisjon.
:::
