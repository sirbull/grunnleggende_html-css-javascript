:::step {"id":"concept","caption":"Juster størrelse, linjehøyde og linjelengde.","highlight":""}
## Hva lærer du?

`font-family` velger skrifttype, `font-size` størrelse og `font-weight` vekt. Med en systemfont bruker siden en skrift som allerede finnes på maskinen. Bruk relative enheter som rem for å følge brukerens tekstinnstillinger.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

En enhetsløs line-height, for eksempel 1.65, følger skriftstørrelsen. Begrens lange tekstlinjer med max-width. `ch` er basert på bredden til nulltegnet i skriften og kan gi en nyttig lesebredde. Tekstjustering til venstre passer vanlig brødtekst på norsk.
:::

:::step {"id":"code","caption":"Koden og resultatet er to visninger av det samme eksempelet.","highlight":""}
## Se koden

:::example css

Eksempelet i kodeverkstedet bruker disse samme kildefilene.
:::

:::step {"id":"practice","caption":"Linjehøyde gir luft mellom linjene. Den endrer ikke avstanden mellom separate bokser; der bruker du margin eller gap.","highlight":""}
## Prøv selv

Endre line-height fra 1.65 til 1 og tilbake. Prøv max-width på 30ch og 60ch. Beskriv forskjellen i lesbarhet.

**Dette skal du se:** Linjehøyde gir luft mellom linjene. Den endrer ikke avstanden mellom separate bokser; der bruker du margin eller gap.
:::
