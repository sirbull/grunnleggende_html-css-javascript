:::step {"id":"concept","caption":"En tabell består av rader, og hver rad består av celler.","highlight":"table"}
## En tabell er rader med celler

En tabell passer når informasjonen har **rader og kolonner** som hører sammen, som en timeplan, en resultatliste eller en prisoversikt.

En tabell bygges fra ytterst til innerst:

- [[html-table|table]] er **hele tabellen**.
- [[html-tr|tr]] er **én rad**. Navnet står for *table row*.
- [[html-td|td]] er **én celle** med data. Navnet står for *table data*.

Den minste tabellen du kan lage, ser slik ut:

```html
<table>
  <tr>
    <td>09.00</td>
    <td>HTML</td>
  </tr>
</table>
```

HTML beskriver tabellen **rad for rad**. Kolonnene oppstår av seg selv: den første cellen i hver rad havner i første kolonne, den andre i andre kolonne, og så videre.
:::

:::step {"id":"mechanism","caption":"th er overskriftsceller. scope=\"col\" betyr at overskriften gjelder hele kolonnen under.","highlight":"th"}
## Overskrifter og navn på tabellen

En god tabell forteller hva radene og kolonnene betyr:

- `caption` er **tabellens navn**, «Onsdagens økter». Den står rett etter `<table>`.
- [[html-th|th]] er en **overskriftscelle**, *table header*. Den vises vanligvis med fet skrift.
- `scope="col"` betyr at overskriften gjelder **kolonnen** under. For overskrifter som står først i hver rad, bruker du `scope="row"`.

Tabellen er også delt i to grupper:

- `thead` inneholder **overskriftsraden**.
- `tbody` inneholder **selve dataene**.

Hvorfor så mange detaljer? En skjermleser leser én celle om gangen. Når brukeren står på «CSS», kan skjermleseren si «Fag: CSS», fordi den vet hvilken overskrift cellen hører til.

**Ikke bruk tabeller til oppsett.** Tidligere ble tabeller brukt for å plassere ting ved siden av hverandre. Til det bruker du nå CSS, som du lærer senere.
:::

:::step {"id":"media","caption":"Video og lyd legges inn med egne elementer. controls gir brukeren knapper for å styre avspillingen.","highlight":""}
## Video og lyd

Eksempelet har ingen video, men du legger inn video og lyd på samme måte som bilder, med `src`:

```html
<video src="film.mp4" controls width="480">
  <track kind="captions" src="teksting.vtt" srclang="nb" label="Norsk">
</video>

<audio src="podkast.mp3" controls></audio>
```

- [[html-video|video]] og [[html-audio|audio]] spiller av film og lyd.
- `controls` gir brukeren **knapper** for start, pause og lydstyrke. Uten den kan brukeren ikke styre avspillingen.
- `track` legger til **teksting**. Video med tale trenger teksting, slik at også de som ikke hører lyden, får med seg innholdet.

**Ikke start lyd automatisk.** Uventet lyd er forstyrrende og gjør det vanskelig for skjermleserbrukere å høre sin egen skjermleser.
:::

:::step {"id":"practice","caption":"Tabellen beholder sammenhengen mellom tid og fag. Hver rad må ha like mange celler som det finnes kolonner.","highlight":"tbody"}
## Prøv selv

Åpne kodeverkstedet og gjør disse endringene:

1. Kopier en av radene i `tbody`, og lim den inn under den siste raden.
2. Endre tiden til 11.00 og faget til «JavaScript».
3. Legg til en tredje kolonne, «Rom»: en ny `th` i overskriftsraden og en ny `td` i hver rad.

**Dette skal du se:** Tabellen får en ny rad og en ny kolonne. Glemmer du en celle i én rad, blir tabellen skjev. Hver rad må ha like mange celler som det finnes kolonner.
:::
