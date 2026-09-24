:::step {"id":"concept","caption":"Koden du skriver, er en oppskrift. DOM-treet er det nettleseren bygger ut fra den.","highlight":"html"}
## Koden og DOM-treet er to forskjellige ting

Du har sett at nettleseren bygger et [[dom|DOM-tre]] av HTML-koden. La oss se nærmere på hva det betyr.

- **Kildekoden** er teksten du skriver i `index.html`. Den er en *oppskrift*.
- **DOM-treet** er det nettleseren *bygger* ut fra oppskriften, og det er det som faktisk vises på skjermen.

Oftest er de to helt like. Men når koden inneholder feil, prøver nettleseren å **reparere** den på egen hånd. Den gir ikke feilmelding. Den gjetter hva du mente og bygger et tre som er gyldig.

Det høres praktisk ut, men det betyr at siden kan få en annen struktur enn du tror. Det kan gi rare feil i CSS og JavaScript som er vanskelige å finne.
:::

:::step {"id":"repair","caption":"Et avsnitt kan ikke inneholde en section. Nettleseren lukker avsnittet før section-elementet.","highlight":"section"}
## Når nettleseren reparerer koden

Noen elementer har regler for hva de kan inneholde. Et avsnitt, `p`, kan bare inneholde tekst og små elementer som `strong` og `a`. Det kan ikke inneholde store blokker som `section`.

Tenk deg at du skriver dette:

```html
<p>
  <section>Åpningstider</section>
</p>
```

Nettleseren godtar ikke en section inni et avsnitt. Derfor lukker den avsnittet *før* section. DOM-treet blir slik:

```html
<p></p>
<section>Åpningstider</section>
<p></p>
```

Nå finnes det to tomme avsnitt, og section ligger ikke lenger inni p. Hvis CSS-en din var skrevet for «section inni p», virker den ikke, og du skjønner kanskje ikke hvorfor.
:::

:::step {"id":"mechanism","caption":"head beskriver siden: språk, tegnsett, beskrivelse og tittel.","highlight":"head"}
## Metadata: informasjon om siden

Du kjenner allerede `charset` og `title` i `head`. Eksempelet har én linje til:

```html
<meta name="description" content="En enkel guide til nabolagskafeen.">
```

`description` er en **kort oppsummering** av siden. Søkemotorer viser den ofte som den lille teksten under lenken i søkeresultatet.

Sjekkliste for en solid side:

- `lang` på `html` stemmer med språket på siden.
- `title` beskriver siden, slik at den er lett å kjenne igjen blant mange faner.
- Alle **id-er er unike**. To elementer med samme id kan få lenker og JavaScript til å treffe feil element.
- Elementene er **lukket i riktig rekkefølge**.
:::

:::step {"id":"validator","caption":"En validator leser koden og lister opp feil med linjenummer.","highlight":"html"}
## Sjekk koden med en validator

Fordi nettleseren skjuler feilene, trenger du et verktøy som finner dem. En **validator** leser HTML-koden din og lister opp alt som bryter reglene, med linjenummer og forklaring.

Den offisielle validatoren fra W3C, organisasjonen som lager standardene for nettet, finner du på [validator.w3.org/nu](https://validator.w3.org/nu/). Du kan lime inn koden eller laste opp filen.

Du kan også se DOM-treet i nettleseren din. Høyreklikk på en side og velg **Inspiser** eller **Undersøk element**. Da ser du treet nettleseren faktisk bygde, ikke koden du skrev.
:::

:::step {"id":"practice","caption":"Nettleseren reparerer strukturen, men reparasjon er ingen god strategi. Bruk en validator for å finne feilene.","highlight":"section"}
## Prøv selv

1. Åpne kodeverkstedet. Flytt `section`-elementet inn i et nytt `<p>`-element, slik som i eksempelet over.
2. Se på DOM-treet under resultatet. Ligger section fortsatt inni p?
3. Kopier hele koden og lim den inn i W3C-validatoren. Hvilken feilmelding får du?

**Dette skal du se:** Nettleseren flytter section ut av avsnittet, og validatoren forklarer hvorfor. Nettleseren reparerer strukturen, men du bør ikke stole på reparasjonen. Skriv gyldig kode, så får du ingen overraskelser.
:::
