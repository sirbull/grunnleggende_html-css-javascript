:::step {"id":"goal","caption":"La flere kontroller bruke samme tilstand."}
## Oppdraget

En større samling trenger en tydelig kjede: filtrer data, beregn antall sider og vis riktig utsnitt. Tilstanden består av søketekst og sidenummer. Et nytt søk starter på første side.
:::

:::step {"id":"flow","caption":"La flere kontroller bruke samme tilstand."}
## Slik samarbeider delene

Bruk slice til utsnittet og Math.ceil til antall sider. Begrens sidenummeret når antallet treff endres. Forrige og neste deaktiveres ved grensene. En statusmelding beskriver både treff og gjeldende side.
:::

:::step {"id":"html","caption":"La flere kontroller bruke samme tilstand."}
## HTML: struktur

:::example html
:::

:::step {"id":"css","caption":"La flere kontroller bruke samme tilstand."}
## CSS: utseende

:::example css
:::

:::step {"id":"js","caption":"La flere kontroller bruke samme tilstand."}
## JavaScript: oppførsel

:::example js
:::

:::step {"id":"try","caption":"Sideinndelingen skjer etter filtreringen. Søk uten treff gir en forståelig tom tilstand og ingen vei til en ugyldig side."}
## Utvid prosjektet

Legg til et kategorifilter med en select. Flytt prosjektene til objekter med navn og kategori, og kombiner begge filtrene før slice.

**Kontroller resultatet:** Sideinndelingen skjer etter filtreringen. Søk uten treff gir en forståelig tom tilstand og ingen vei til en ugyldig side.
:::
