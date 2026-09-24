:::step {"id":"concept","caption":"Hent data, vis venting og håndter feil.","traceActive":-1}
## Hva lærer du?

En datadrevet side bruker samme komponent for flere dataelementer. Først henter vi et JSON-array. Deretter lager vi et kort per element. HTML gir beholderne, CSS styrer layout og JavaScript kobler data til DOM.
:::

:::step {"id":"mechanism","caption":"Hent data, vis venting og håndter feil.","traceActive":-1}
## Fra handling til resultat

Vis en ventemelding, og fjern den når innholdet er klart. Valider at dataene har forventet form før de brukes. Feil skal gi en synlig melding og en mulighet til å prøve igjen. Data-URL-en her gjør demonstrasjonen selvstendig; en vanlig side kan hente en relativ JSON-fil.
:::

:::step {"id":"practice","caption":"Riktig form på dataene er en del av kontrakten mellom datafilen og visningen. Bruk textContent slik at turenes navn behandles som tekst.","traceActive":-1}
## Prøv selv

Legg til en tur i dataene. Endre km til en tekstverdi og se at valideringen oppdager feilen.

**Dette skal du se:** Riktig form på dataene er en del av kontrakten mellom datafilen og visningen. Bruk textContent slik at turenes navn behandles som tekst.
:::
