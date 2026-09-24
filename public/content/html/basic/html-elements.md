:::step {"id":"concept","caption":"Et element består av en åpningstagg, innholdet og en avslutningstagg.","highlight":"h1"}
## Et element har tre deler

Du har allerede skrevet noen [[html-element|elementer]]. La oss se nøyaktig hva de består av:

```html
<h1>Min filmside</h1>
```

- `<h1>` er **åpningstaggen**. Den sier hvor elementet begynner og hva slags innhold det er.
- `Min filmside` er **innholdet**. Det er dette brukeren ser på siden.
- `</h1>` er **avslutningstaggen**. Skråstreken betyr «her slutter elementet».

Ordene *tagg* og *element* blandes ofte. Taggen er selve merkelappen med vinkelparenteser. Elementet er hele pakken: åpningstagg, innhold og avslutningstagg.
:::

:::step {"id":"attributes","caption":"href er et attributt. Det forteller lenken hvor den skal gå.","highlight":"a"}
## Attributter gir ekstra informasjon

Noen ganger trenger et element mer informasjon enn bare innholdet. Da bruker du et **attributt**. Se på den siste linjen i eksempelet:

```html
<a href="https://example.com">Besøk eksempelsiden</a>
```

- `a` er et lenkeelement. Innholdet «Besøk eksempelsiden» er teksten du klikker på.
- `href` er **navnet** på attributtet. Det betyr «hvor lenken skal gå».
- `"https://example.com"` er **verdien**. Det er adressen lenken åpner.

Et attributt skrives alltid slik: `navn="verdi"`. Det står **inni åpningstaggen**, etter elementnavnet og før `>`. Uten `href` er lenken bare tekst som ikke går noen steder.
:::

:::step {"id":"class","caption":"class=\"intro\" gir avsnittet et navn. Navnet endrer ingenting før CSS eller JavaScript bruker det.","highlight":".intro"}
## class: et navn du selv velger

`class` er et attributt du kommer til å bruke hele tiden. Det gir elementet et **[[html-class|klassenavn]]**, en slags merkelapp du selv finner på:

```html
<p class="intro">Her finner du en anbefaling.</p>
```

Her har avsnittet fått klassenavnet `intro`. Tenk på det som en navnelapp på elementet.

En klasse gjør ingenting synlig alene. Den er et **håndtak** du senere kan gripe tak i:

- Med **CSS** kan du si «alle elementer med klassen intro skal ha større tekst».
- Med **JavaScript** kan du si «finn elementet med klassen intro og endre teksten».

Tre ting er nyttige å vite:

- **Mange elementer kan ha samme klasse.** Tre avsnitt kan alle ha `class="intro"` og dermed få samme utseende.
- **Ett element kan ha flere klasser.** Skriv dem med mellomrom: `class="intro viktig"`.
- **Velg navn som beskriver hva innholdet er**, for eksempel `intro`, `kort` eller `advarsel`. Unngå navn som `rod` eller `stor`, for utseendet kan endre seg senere.
:::

:::step {"id":"id","caption":"En id skal være unik. Bare ett element på siden kan ha samme id.","highlight":""}
## id: et navn som bare ett element har

`id` ligner på `class`, men med én viktig forskjell: en [[html-attr-id|id]] skal være **unik**. Bare ett element på hele siden kan ha samme id.

```html
<h2 id="tips">Tre filmtips</h2>
```

Tenk på forskjellen slik:

- `class` er som en **lagdrakt**. Mange spillere kan ha samme drakt.
- `id` er som et **personnummer**. Det peker på nøyaktig én person.

Du bruker id når du må finne akkurat ett bestemt element. For eksempel kan en lenke hoppe til en bestemt overskrift, eller JavaScript kan hente ett bestemt felt i et skjema. Til styling bruker du vanligvis `class`.
:::

:::step {"id":"mechanism","caption":"strong ligger inni p. Det gjør strong til et barn av avsnittet.","highlight":"strong"}
## Elementer inni elementer

Elementer kan ligge inni hverandre. I eksempelet ligger `strong` inni avsnittet:

```html
<p class="intro">Her finner du en <strong>anbefaling</strong>.</p>
```

`strong` betyr «dette ordet er viktig». Nettleseren viser det vanligvis med fet skrift.

Når et element ligger inni et annet, kalles det indre elementet et **barn** og det ytre en **forelder**. Her er `strong` barn av `p`.

Regelen er: **det som åpnes sist, lukkes først.** Tenk på det som esker i esker. Du må lukke den innerste esken før den ytre.

```html
<!-- Riktig -->
<p>Et <strong>viktig</strong> ord.</p>

<!-- Feil: p lukkes før strong -->
<p>Et <strong>viktig</p></strong> ord.
```

Tekst mellom `<!--` og `-->` er en **kommentar**. Den er et notat til deg og vises ikke på siden.
:::

:::step {"id":"practice","caption":"Ordet får fet skrift fordi strong betyr «viktig». Klassen alene endrer ingenting før en CSS-regel bruker den.","highlight":"p"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Endre klassenavnet på avsnittet fra `intro` til `ingress`.
2. Legg `<strong>` og `</strong>` rundt et annet ord i teksten.
3. Bytt adressen i `href` til `https://www.nrk.no`.

**Dette skal du se:** Ordet du markerte, blir fett fordi `strong` betyr «viktig». Klassenavnet endrer ingenting synlig. Det venter på at en CSS-regel skal bruke det, og det lærer du i CSS-delen.

**Sjekk forståelsen:** Kan to avsnitt ha `class="ingress"`? Kan de ha `id="ingress"`? (Ja til klassen, nei til id-en. En id skal være unik.)
:::
