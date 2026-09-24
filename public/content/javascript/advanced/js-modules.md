:::step {"id":"concept","caption":"Del ansvar og forstå hva som kjører først.","traceActive":-1}
## Hva lærer du?

ES-moduler deler kode i egne filer med import og export. Nettleseren laster dem med type="module". Modulene har eget scope, og avhengighetene kan deles mellom flere deler av appen.
:::

:::step {"id":"mechanism","caption":"Del ansvar og forstå hva som kjører først.","traceActive":-1}
## Fra handling til resultat

Synkron kode kjører først. Når den aktuelle oppgaven er ferdig, kjører ventende mikrotasks, for eksempel .then på en allerede oppfylt Promise. Det gir rekkefølgen 1, 3, 2 i eksempelet. Det er en liten demonstrasjon av event-loop, ikke hele modellen.
:::

:::step {"id":"practice","caption":"Visningen blir 1 → 3 → 2. En import i en ekte side bruker for eksempel `import { vis } from \"./visning.js\"`. Eksterne modulstier er sperret i verkstedet.","traceActive":-1}
## Prøv selv

Forutsi rekkefølgen før du kjører. På egen side: flytt vis-funksjonen til en fil som eksporterer den, og importer den fra script.js.

**Dette skal du se:** Visningen blir 1 → 3 → 2. En import i en ekte side bruker for eksempel `import { vis } from "./visning.js"`. Eksterne modulstier er sperret i verkstedet.
:::
