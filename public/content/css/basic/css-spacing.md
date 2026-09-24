:::step {"id":"concept","caption":"Se hvor avstanden rundt en boks kommer fra.","highlight":"margin"}
## Hva lærer du?

[[css-box-model|Boksmodellen]] består av innhold, padding, border og margin. Padding er mellom innholdet og kanten. Margin er utenfor kanten. Bakgrunnsfargen dekker normalt innhold og padding.
:::

:::step {"id":"mechanism","caption":"Se hvordan strukturen og resultatet hører sammen.","highlight":"padding"}
## Slik henger det sammen

`box-sizing: border-box` gjør at oppgitt bredde inkluderer padding og border. Margin er fortsatt utenfor. Med standard content-box kommer padding og border i tillegg til width. Bruk skyvekontrollen i figuren til å utforske padding.
:::

:::step {"id":"practice","caption":"Mer padding gjør den fargede flaten romsligere. Mer margin øker avstanden til andre elementer uten å farge mellomrommet.","highlight":"border"}
## Prøv selv

Endre padding til 32px i verkstedet. Endre så margin til 32px. Hvilket område får bakgrunnsfarge?

**Dette skal du se:** Mer padding gjør den fargede flaten romsligere. Mer margin øker avstanden til andre elementer uten å farge mellomrommet.
:::
