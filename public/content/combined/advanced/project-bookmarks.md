:::step {"id":"goal","caption":"Valider URL-er og lagre en samling som JSON."}
## Oppdraget

En leseliste kombinerer skjema, datavalidering, lenker og lokal lagring. Hver oppføring får tittel, URL og id. Dataene kontrolleres både ved registrering og ved lasting fra lagring.
:::

:::step {"id":"flow","caption":"Valider URL-er og lagre en samling som JSON."}
## Slik samarbeider delene

URL-parseren sjekker strukturen, men du må også begrense protokollen. Her godtar vi bare https og http. Titler settes med textContent. I verkstedet er localStorage et minnelager; på egen side varer lagringen mellom besøk. Lenker navigerer inni det isolerte resultatvinduet.
:::

:::step {"id":"html","caption":"Valider URL-er og lagre en samling som JSON."}
## HTML: struktur

:::example html
:::

:::step {"id":"css","caption":"Valider URL-er og lagre en samling som JSON."}
## CSS: utseende

:::example css
:::

:::step {"id":"js","caption":"Valider URL-er og lagre en samling som JSON."}
## JavaScript: oppførsel

:::example js
:::

:::step {"id":"try","caption":"Bare tillatte protokoller lagres. Tekst fra brukeren blir ikke tolket som HTML."}
## Utvid prosjektet

Prøv en vanlig https-adresse og en URL med en annen protokoll. Legg deretter til en knapp for å sortere listen alfabetisk.

**Kontroller resultatet:** Bare tillatte protokoller lagres. Tekst fra brukeren blir ikke tolket som HTML.
:::
