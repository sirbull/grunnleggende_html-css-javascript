// Tekst (string) står i anførselstegn
const navn = "Ada";

// Tall (number) står uten anførselstegn
const alder = 15;

// Sant eller usant (boolean)
const erInnlogget = true;

console.log(navn, alder, erInnlogget);

// Med tall kan du regne
console.log(alder + 1);

// Tekst setter du sammen med +
console.log("Hei, " + navn + "!");

// Et ja/nei-spørsmål gir true eller false
console.log(alder >= 18);

// Samme tegn, ulik type
console.log("2" + 3);
console.log(2 + 3);

// typeof forteller hvilken type en verdi har
console.log(typeof navn, typeof alder, typeof erInnlogget);