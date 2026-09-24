:::step {"id":"concept","caption":"Tilpass en komponent til plassen den faktisk får.","highlight":""}
## Hva lærer du?

`clamp(min, ønsket, maks)` begrenser en flytende verdi. Du kan la en overskrift vokse med visningsområdet uten å bli for liten eller stor. Dette er nyttig når brukeren både endrer vindu og zoomer.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":""}
## Slik henger det sammen

En container query måler en navngitt eller nærmeste relevant beholder i stedet for hele vinduet. Sett container-type: inline-size på en forelder. Komponenten kan da bytte layout når akkurat dens plass endres. Behold en brukbar grunnstil før query-reglene.
:::

:::step {"id":"practice","caption":"Det er beholderens bredde som styrer container-queryen. Fontstørrelsen med clamp har samtidig en nedre og øvre grense.","highlight":""}
## Prøv selv

Endre maksbredden på .wrapper. Se hvordan kortet skifter layout når containeren passerer 360px.

**Dette skal du se:** Det er beholderens bredde som styrer container-queryen. Fontstørrelsen med clamp har samtidig en nedre og øvre grense.
:::
