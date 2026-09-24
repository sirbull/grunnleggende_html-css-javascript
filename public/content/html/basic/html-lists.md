:::step {"id":"concept","caption":"ul er en punktliste. Hvert punkt er et li-element.","highlight":"ul"}
## En liste består av to typer elementer

En liste i HTML bygges alltid av to deler:

1. Et element for **hele listen**.
2. Et `li`-element for **hvert punkt**. `li` står for *list item*, altså listepunkt.

Her er punktlisten fra eksempelet:

```html
<ul>
  <li>En teksteditor</li>
  <li>En nettleser</li>
</ul>
```

[[html-ul|ul]] står for *unordered list*, en liste uten rekkefølge. Nettleseren setter en prikk foran hvert punkt. Bruk ul når rekkefølgen ikke betyr noe, som i en handleliste: det spiller ingen rolle om du kjøper melk eller brød først.
:::

:::step {"id":"ordered","caption":"ol er en nummerert liste. Nettleseren nummererer punktene selv.","highlight":"ol"}
## Nummerert liste når rekkefølgen betyr noe

[[html-ol|ol]] står for *ordered list*, en liste med rekkefølge:

```html
<ol>
  <li>Lag index.html</li>
  <li>Skriv en hovedoverskrift</li>
</ol>
```

Legg merke til at du **ikke skriver tallene selv**. Nettleseren nummererer punktene automatisk. Flytter du et punkt, oppdateres numrene av seg selv.

Bruk ol når rekkefølgen er en del av innholdet, for eksempel i en oppskrift, en bruksanvisning eller en topp 10-liste. Du kan ikke steke kaken før du har blandet deigen.
:::

:::step {"id":"mechanism","caption":"Listen forteller hjelpemidler hvor mange punkter den har og om rekkefølgen betyr noe.","highlight":"li"}
## Hvorfor ikke bare skrive bindestreker?

Du kunne skrevet «- En teksteditor» i et vanlig avsnitt. Det ser nesten likt ut, men nettleseren vet ikke at det er en liste.

Med ekte listeelementer får du mer:

- En **skjermleser** sier «liste, 2 punkter» før den leser innholdet. Da vet brukeren hvor mye som kommer.
- Med `ol` får brukeren vite at rekkefølgen er viktig.
- Du kan style alle listene på siden likt med CSS senere.

**Lister i lister:** Et punkt kan ha sin egen underliste. Da legger du den nye listen *inni* `li`-elementet, før `</li>`:

```html
<ul>
  <li>Frukt
    <ul>
      <li>Epler</li>
      <li>Pærer</li>
    </ul>
  </li>
</ul>
```
:::

:::step {"id":"practice","caption":"Numrene erstattes av punkter. Teksten er den samme, men informasjonen om rekkefølge blir borte.","highlight":"ol"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Legg til et tredje punkt i utstyrslisten, for eksempel «En kopp te».
2. Legg til et tredje trinn i den nummererte listen: «Lagre og åpne filen i nettleseren».
3. Bytt `<ol>` og `</ol>` til `<ul>` og `</ul>`.

**Dette skal du se:** Numrene erstattes av prikker. Teksten er den samme, men informasjonen om at trinnene skal gjøres i rekkefølge, er borte.

**Sjekk forståelsen:** Hvilken liste passer til en oppskrift på pannekaker, og hvilken passer til ingrediensene? (Fremgangsmåten er ol. Ingrediensene er ul.)
:::
