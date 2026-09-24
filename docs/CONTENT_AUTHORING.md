# Skrive innhold

All artikkeltekst ligger utenfor applikasjonskoden, i `public/content/`. Du kan legge til en hel leksjon uten å røre en eneste `.js`-fil.

Kjør `npm run build` (eller `npm run check`) etter endringer. Validatoren stopper de vanligste feilene før de når nettleseren.

## En leksjon består av fire ting

1. En oppføring i `public/content/manifest.json`.
2. En Markdown-fil i `public/content/<seksjon>/<nivå>/<id>.md`.
3. En eksempelmappe i `public/examples/<seksjon>/<navn>/` med `index.html`, `style.css` og `script.js`.
4. Et visualiseringsnavn fra registeret i `src/visualizations/registry.js`.

## Manifestet

`public/content/manifest.json` er navigasjonens eneste kilde. Rekkefølgen i filen er rekkefølgen brukeren møter.

```json
{
  "id": "webverkstedet",
  "title": "Webverkstedet",
  "reference": "content/reference/manifest.json",
  "sections": [
    {
      "id": "html",
      "title": "HTML",
      "tracks": [
        {
          "id": "basic",
          "title": "Grunnleggende",
          "lessons": [
            {
              "id": "intro",
              "title": "Hva er HTML?",
              "description": "Gi innholdet en struktur som både mennesker og nettleseren kan forstå.",
              "minutes": 4,
              "content": "content/html/basic/intro.md",
              "example": "examples/html/document",
              "visualization": "html-document"
            }
          ]
        }
      ]
    }
  ]
}
```

`id` på toppnivå bestemmer nøkkelprefikset i `localStorage`. Endrer du den, mister brukerne lagret fremdrift og kode. `title` brukes i `document.title`.

Leksjons-ID-er må være unike på tvers av hele kurset, ikke bare innenfor ett nivå. Ruten blir `#/<seksjon>/<nivå>/<leksjon>`.

`minutes` er valgfri og faller tilbake til 5.

## Markdown-filen

Hele teksten må ligge inne i lesesteg. Tekst utenfor et steg er en feil, ikke en stilltiende utelatelse.

````markdown
:::step {"id":"tags","highlight":"p","caption":"Avsnittene er p-elementer."}
## Tagger forteller hva teksten er

Skriv en åpningstagg før teksten og en avslutningstagg etter:

```html
<p>Her samler jeg filmer jeg liker.</p>
```

Skråstreken i `</p>` markerer slutten.
:::
````

Regler validatoren håndhever:

- `id` må matche `^[a-z0-9-]+$` og være unik i filen.
- Hvert steg må ha en `## `-overskrift. `h1` kommer fra manifestets `title`, så ikke skriv den i Markdown.
- Hvert steg må lukkes med `:::` på egen linje.
- `:::step` og `:::` inne i en kodeblokk blir ignorert, så du kan vise syntaksen i en leksjon.

Metadata på `:::step`-linjen er JSON og sendes videre til visualiseringen:

| Nøkkel | Brukes av | Betydning |
| --- | --- | --- |
| `id` | lesesteg, ankere | Obligatorisk. Blir `#step-<id>`. |
| `caption` | alle visualiseringer | Bildetekst under visualiseringen. |
| `highlight` | `preview`, `html-document`, `code-flow` | CSS-selektor som markeres i forhåndsvisningen. Ugyldig selektor ignoreres stille. |
| `highlight` | `box-model` | Verdien `padding` markerer kanten. |
| `trace`, `traceActive` | `code-flow` | Liste med forklaringssteg, og hvilket som er aktivt. |

Ukjente nøkler er harmløse. En visualisering som ikke forstår dem, bruker sine egne standardtekster.

### Rå HTML er av

Markdown rendres med `html: false` og sanitiseres deretter med DOMPurify. Skriver du `<div>` i teksten, vises det som tekst. Det er med vilje: innholdsfiler skal ikke kunne endre applikasjonens DOM.

### Fagord

`[[html-element]]` blir en knapp som åpner ordforklaringsdialogen. `[[html-element|element]]` viser en annen ledetekst.

ID-en må finnes i referanseverket, ellers feiler bygget. Fagord behandles bare i vanlig tekst, aldri inne i `code`, `pre`, `a` eller `button`.

### Del eksempelkoden i stedet for å kopiere den

````markdown
:::example html
````

Alle steg viser eksempelkoden ved siden av teksten, med resultatet én fane unna. Direktivet bestemmer hvilket språk som vises først i steget det står i; uten direktiv vises seksjonens hovedspråk. Direktivlinjen fjernes fra teksten. `highlight` markerer elementene i resultatet og, for enkle velgere, linjene i HTML-koden. `html`, `css` og `js` er gyldige. Da kan ikke teksten og det kjørbare eksempelet komme i utakt. Legg direktivet i steget som forklarer koden, siden det er der leseren ser resultatet.

Overskrifter skrives fortsatt med `##` og `###`. På seksjonssiden vises de to nivåer lavere, under seksjon, nivå og leksjonstittel.

## Eksempelmappen

Hver leksjon peker på en mappe med nøyaktig tre filer: `index.html`, `style.css` og `script.js`. Alle tre må finnes, også når en av dem er tom. Samme mappe mater forhåndsvisningen, kodeverkstedet og `:::example`.

Eksempelet kjører i en `sandbox`-iframe uten `allow-same-origin`, med en CSP som sperrer eksterne ressurser. Derfor:

- ingen `fetch` mot internett, bruk en lokal data-URL,
- ingen ekte `localStorage`, bruk et tydelig merket minnelager og forklar forskjellen i teksten,
- ingen eksterne fonter, bilder eller skript.

## Referanseverket

Oppføringene ligger i JSON-filene som `public/content/reference/manifest.json` peker på. Manifestet definerer også kategoriene som vises som filtre.

Obligatoriske felt: `id`, `title`, `sortTitle`, `category`, `type`, `short`, `syntax`, `explanation`, `when`, `mistakes`. I tillegg må oppføringen ha enten `example` (sti til en eksempelmappe) eller `files` med `html`, `css` og `js`.

Valgfritt: `keywords` og `aliases` (norske søkeord slik en nybegynner ville formulert seg), `english`, `displayCode`, `related` (må peke på ID-er som finnes) og `lesson` (hashrute til leksjonen).

En grunnforklaring kan også ha `overviewFor`, for eksempel `"overviewFor": "html"`. Verdien knytter oppføringen til en kategori i referansemanifestet. Ordlisten viser da `short` i et eget introduksjonsfelt når kategorien velges, eller når søket treffer oppføringens tittel eller et alias nøyaktig. Bruk én slik oppføring per kategori. Forklar både hva navnet står for og hvilken jobb teknologien gjør i `short`. Se `overview.json` for eksempler. Beslektede begreper som Web API og WCAG kan ha vanlige oppføringer uten `overviewFor`.

`sortTitle` styrer alfabetisk sortering, så `.class` kan sorteres under C. Søket rangerer eksakt treff på kodeform først, deretter ID, aliases, norske fraser, definisjon og nøkkelord.

Skriv oppføringer for det brukerne faktisk søker på, inkludert par som ofte blandes sammen: `margin` mot `padding`, `.a .b` mot `.a.b`, `let` mot `const`, `textContent` mot `innerHTML`.

## Sjekkliste før du committer

```bash
npm run check
```

- [ ] Bygget skriver `Innhold OK` med forventet antall leksjoner og oppføringer.
- [ ] Leksjonen åpnes på sin rute, og visualiseringen følger lesepunktet.
- [ ] Alle fagord i teksten åpner en dialog.
- [ ] Kodeverkstedet kjører eksempelet uten feil i konsollen.
- [ ] Teksten gir mening for en som aldri har skrevet kode før.
