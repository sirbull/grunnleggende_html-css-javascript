:::step {"id":"concept","caption":"form samler feltene. input er feltet brukeren skriver i, og button sender skjemaet.","highlight":"form"}
## Et skjema samler opplysninger

Et skjema er en del av siden der brukeren kan skrive inn noe og sende det, for eksempel en påmelding, et søk eller en innlogging.

Skjemaet i eksempelet består av fire deler:

- [[html-form|form]] er **rammen rundt hele skjemaet**. Alt som skal sendes sammen, ligger inni.
- [[html-label|label]] er **ledeteksten**, teksten som forteller hva feltet er til: «E-post».
- [[html-input|input]] er **feltet** brukeren skriver i. Som `img` har det ingen avslutningstagg.
- [[html-button|button]] med `type="submit"` er **knappen** som sender skjemaet.

`<br>` er et linjeskift. Det legger feltet på en egen linje under ledeteksten.
:::

:::step {"id":"label","caption":"for=\"epost\" på label peker til id=\"epost\" på input. Da hører de to sammen.","highlight":"label"}
## Koble ledeteksten til feltet

Det er ikke nok at «E-post» står *ved siden av* feltet. Du må fortelle nettleseren at teksten hører til akkurat dette feltet:

```html
<label for="epost">E-post</label>
<input id="epost" name="epost" type="email" required>
```

- Feltet får en id: `id="epost"`.
- Ledeteksten peker på den id-en med `for="epost"`.

Verdiene må være **helt like**. Da får du to fordeler:

1. En **skjermleser** leser «E-post» når brukeren kommer til feltet. Uten koblingen hører brukeren bare «redigeringsfelt» og må gjette.
2. Du kan **klikke på ledeteksten** for å komme til feltet. Det gir et større klikkområde, som er fint på mobil.

**Placeholder er ikke nok.** Attributtet `placeholder` viser en grå eksempeltekst inni feltet. Teksten forsvinner når brukeren begynner å skrive, og da er det lett å glemme hva feltet var til. Bruk alltid en synlig label.
:::

:::step {"id":"mechanism","caption":"type=\"email\" sjekker at det står en e-postadresse. required gjør feltet obligatorisk.","highlight":"input"}
## Attributtene på input

Feltet har tre attributter i tillegg til `id`. Hver har en egen jobb:

- `type` bestemmer **hva slags felt** det er. `email` gjør at nettleseren sjekker at teksten ligner en e-postadresse. På mobil får du også et tastatur med @.
- `name` er **navnet på opplysningen** når skjemaet sendes. Mottakeren får noe som ligner `epost=ola@example.com`.
- `required` betyr at feltet er **obligatorisk**. Nettleseren stopper innsendingen hvis det er tomt.

Noen vanlige typer:

| type | Brukes til |
| --- | --- |
| `text` | Vanlig tekst, som navn |
| `email` | E-postadresse |
| `number` | Tall |
| `password` | Passord (tegnene skjules) |
| `checkbox` | Avkrysning, av eller på |

Til vanlig sendes et skjema til en server. I dette eksempelet stopper en liten JavaScript-kode innsendingen og viser en takkemelding i stedet. Det lærer du å skrive selv i JavaScript-delen.
:::

:::step {"id":"practice","caption":"Nettleseren varsler om manglende eller ugyldige felt. En ekte tjeneste må også kontrollere data på serveren; nettleservalidert betyr ikke sikker data.","highlight":"form"}
## Prøv selv

Åpne kodeverkstedet og legg til et felt for navn over e-postfeltet:

1. Kopier hele `<p>`-blokken med label og input.
2. Endre ledeteksten til «Navn».
3. Gi feltet `type="text"`, og bruk `navn` som verdi i `id`, `name` og `for`.
4. Prøv å sende skjemaet helt tomt. Prøv deretter med et navn og en ugyldig e-post, som «hei».

**Dette skal du se:** Nettleseren sier fra om felt som mangler eller har feil format, og sender ikke skjemaet før alt er i orden.

**Viktig å vite:** Kontrollen i nettleseren er en hjelp til brukeren, ikke en sikring. En ekte tjeneste må alltid sjekke opplysningene på nytt på serveren.
:::
