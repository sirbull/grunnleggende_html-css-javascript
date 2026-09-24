:::step {"id":"concept","caption":"header, main og footer forteller hvor toppen, hovedinnholdet og bunnen av siden er.","highlight":"header"}
## Elementer som forteller hva en del er

Du møtte `header`, `nav`, `main`, `section` og `footer` i leksjonen om din første side. Nå skal vi se *hvorfor* de er nyttige, og lære noen flere.

Sammenlign disse to versjonene av toppen på en side:

```html
<!-- Uten semantikk -->
<div>
  <div>Nabolagsavisa</div>
</div>

<!-- Med semantikk -->
<header>
  <h1>Nabolagsavisa</h1>
</header>
```

På skjermen kan de se helt like ut. Forskjellen er hva nettleseren og hjelpemidlene **forstår**. I den andre versjonen vet de at dette er toppen av siden og at teksten er hovedoverskriften.

[[a11y-semantic|Semantisk]] betyr «som handler om betydning». Et semantisk element beskriver hvilken rolle innholdet har.
:::

:::step {"id":"landmarks","caption":"nav samler menyen. aria-label gir menyen et navn skjermleseren kan lese opp.","highlight":"nav"}
## Landemerker gjør det lett å hoppe rundt

Skjermlesere lager en oversikt over sidens hoveddeler, kalt **landemerker**. Brukeren kan hoppe rett til «hovedinnhold» eller «navigasjon», omtrent som å bla til riktig kapittel i en bok.

| Element | Landemerke | Typisk innhold |
| --- | --- | --- |
| `header` | Topp | Logo, hovedoverskrift, meny |
| `nav` | Navigasjon | Lenker til andre sider eller deler |
| `main` | Hovedinnhold | Det siden egentlig handler om |
| `aside` | Utfyllende | Tips, faktabokser, relaterte lenker |
| `footer` | Bunn | Kontaktinfo, hvem som har laget siden |

I eksempelet har menyen fått `aria-label="Hovedmeny"`. Det gir menyen et navn som skjermleseren leser opp. Det er nyttig hvis en side har flere menyer, for eksempel én øverst og én i bunnen.
:::

:::step {"id":"mechanism","caption":"article er en nyhet som kan stå alene. aside er et tips ved siden av hovedsaken.","highlight":"article, aside"}
## article, section og aside

Inni `main` kan du dele opp innholdet videre. Disse tre er lette å blande sammen:

- `article` er innhold som **kan stå alene**. Test: Kan du klippe det ut og legge det på en annen side, og det gir fortsatt mening? En nyhetssak, et blogginnlegg og en produktomtale er typiske eksempler.
- `section` er en **del av noe større**, med sin egen overskrift. Kapitlene i en lang artikkel kan være sections.
- `aside` er **utfyllende innhold** som ikke er hovedsaken, som en faktaboks eller «Tips oss».

I eksempelet er «Ny nabolagskafé» en `article`, fordi saken kan stå alene. «Tips oss» er en `aside`, fordi den ikke er en del av nyheten.

**Og div?** [[html-div|div]] er en boks *uten* betydning. Bruk den når du bare trenger å samle elementer for å style dem, og ingen av de semantiske elementene passer.
:::

:::step {"id":"practice","caption":"Den visuelle forskjellen er liten uten CSS. Semantikken gir likevel nettleser og hjelpemidler mer informasjon enn en samling div-er.","highlight":"aside"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Legg til en ny `article` inni `main`, med en egen `h2` og et avsnitt. Skriv om en ny sak i nabolaget.
2. Legg den nye artikkelen *før* `aside`, slik at nyhetene står samlet.
3. Tenk gjennom: Hvorfor er «Tips oss» ikke hovedinnhold?

**Dette skal du se:** Siden ser nesten lik ut, fordi semantiske elementer ikke har noe særlig utseende uten CSS. Forskjellen ligger i hva nettleseren og hjelpemidlene forstår.

**Sjekk forståelsen:** Et værvarsel i hjørnet på en nyhetsside. Er det `article`, `section` eller `aside`? (aside. Det er utfyllende og ikke en del av nyhetene.)
:::
