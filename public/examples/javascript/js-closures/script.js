function lagTeller() {
  let antall = 0;
  function tell() {
    antall = antall + 1;
    return antall;
  }
  return tell;
}
const teller = lagTeller();
console.log(teller());
console.log(teller());
