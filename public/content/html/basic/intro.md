:::step {"id":"meaning","highlight":"h1","caption":"Overskriften er et h1-element. Nettleseren gir den en standardstil."}
## Innhold trenger struktur

HTML står for HyperText Markup Language. Det beskriver hva innholdet på en nettside er: en overskrift, et avsnitt, et bilde eller en lenke.

En nettleser leser HTML og viser innholdet. På høyresiden ser du en liten filmside. Overskriften er et [[html-element|element]].

HTML brukes sammen med CSS for utseende og JavaScript for handlinger. Her begynner vi med strukturen.
:::
:::step {"id":"tags","highlight":"p","caption":"Avsnittene er p-elementer. De får sin egen plass i dokumentet."}
## Tagger forteller hva teksten er

Skriv en åpningstagg før teksten og en avslutningstagg etter:

```html
<p>Her samler jeg filmer jeg liker.</p>
```

Skråstreken i `</p>` markerer slutten. Nettleseren viser teksten, ikke selve taggene. I DOM-treet under eksempelet ser du hvordan elementene hører sammen.
:::
:::step {"id":"try","highlight":"h2","caption":"h2 innleder en del av siden under hovedoverskriften."}
## Gjør filmsiden til din egen

Åpne kodeverkstedet. Bytt ut «Min filmside» med et tema du liker. Endre deretter teksten inni et avsnitt.

Legg til et nytt avsnitt med `<p>` og `</p>`. Resultatet oppdateres mens du skriver. Du kan alltid tilbakestille koden.

**Sjekk forståelsen:** Hva skjer hvis du endrer en p-tagg til [[html-h2|h2]]? Du endrer betydningen til en underoverskrift, og nettleseren viser også en annen standardstil.
:::
