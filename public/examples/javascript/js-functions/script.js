function totalpris(pris, antall) {
  return pris * antall;
}
const total = totalpris(40, 3);
console.log("Du betaler", total, "kr.");
console.log("To kaffe:", totalpris(35, 2), "kr.");