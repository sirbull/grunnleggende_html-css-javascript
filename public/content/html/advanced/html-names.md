:::step {"id":"concept","caption":"Knappen får navnet «Lagre brukernavn» fra teksten sin. Feltet får navnet «Brukernavn» fra label.","highlight":"button"}
## Alle kontroller trenger et navn

En **kontroll** er noe brukeren kan bruke: en knapp, en lenke eller et skjemafelt. Hver kontroll trenger et **tilgjengelig navn**. Det er teksten en skjermleser leser opp når brukeren kommer til kontrollen.

Navnet kommer vanligvis fra synlig tekst:

- En **knapp** får navnet fra teksten mellom taggene. `<button>Lagre brukernavn</button>` heter «Lagre brukernavn».
- Et **skjemafelt** får navnet fra ledeteksten som er koblet til det med `for` og `id`. Dette lærte du i leksjonen om skjemaer.
- En **lenke** får navnet fra lenketeksten.

Navnet bør beskrive **handlingen**. «Lagre brukernavn» er bedre enn «OK», fordi den sier hva som skjer.
:::

:::step {"id":"mechanism","caption":"aria-describedby=\"hjelp\" kobler hjelpeteksten med id=\"hjelp\" til feltet.","highlight":"#hjelp"}
## En hjelpetekst i tillegg til navnet

Noen felt trenger mer forklaring enn bare navnet. Da kan du skrive en hjelpetekst og koble den til feltet med [[a11y-aria-describedby|aria-describedby]]:

```html
<input id="brukernavn" aria-describedby="hjelp" minlength="3">
<p id="hjelp">Bruk minst tre tegn. Ikke skriv fullt navn.</p>
```

- Hjelpeteksten får en id: `id="hjelp"`.
- Feltet peker på den med `aria-describedby="hjelp"`.

Koblingen fungerer som `for` og `id` på label, men med en annen rolle. Skjermleseren leser først **navnet** og deretter **beskrivelsen**: «Brukernavn, redigeringsfelt. Bruk minst tre tegn. Ikke skriv fullt navn.»

Uten koblingen står hjelpeteksten bare på siden. En skjermleserbruker som hopper rett til feltet, hører den aldri.

`minlength="3"` betyr at feltet må ha minst tre tegn for å være gyldig.
:::

:::step {"id":"aria","caption":"ARIA endrer bare det hjelpemidlene hører. Det endrer ikke hvordan elementet oppfører seg.","highlight":"input"}
## Hva er ARIA?

Attributter som begynner med `aria-`, kalles [[what-is-aria|ARIA]]. De gir hjelpemidler ekstra informasjon som HTML ikke har egne attributter for.

[[a11y-aria-label|aria-label]] gir en kontroll et navn når det ikke finnes synlig tekst. Et typisk eksempel er en knapp med bare et ikon:

```html
<button aria-label="Lukk">✕</button>
```

To viktige regler:

1. **Bruk synlig tekst først.** Den hjelper alle, også dem som styrer datamaskinen med stemmen og sier «klikk Lagre brukernavn». Da må det som står på skjermen, være navnet.
2. **ARIA endrer bare hva som leses opp.** Det gir ikke en `div` tastaturstøtte eller gjør den klikkbar. Trenger du en knapp, bruk `button`.
:::

:::step {"id":"practice","caption":"Feltet har både navn og beskrivelse. Den synlige ledeteksten hjelper også den som styrer med stemmen.","highlight":"#hjelp"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Skriv en ny hjelpetekst som forklarer hva et godt brukernavn er.
2. Endre id-en på hjelpeteksten til `brukernavn-hjelp`.
3. Oppdater `aria-describedby` slik at den peker på den nye id-en.
4. Endre knappeteksten til noe som beskriver handlingen enda tydeligere.

**Dette skal du se:** Siden ser lik ut, men koblingen mellom feltet og hjelpeteksten virker bare når id-ene er nøyaktig like.

**Sjekk forståelsen:** En knapp har bare et søppelkasseikon. Hvordan gir du den et navn? (Med `aria-label="Slett"`, eller aller helst synlig tekst ved siden av ikonet.)
:::
