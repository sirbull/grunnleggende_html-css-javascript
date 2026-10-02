console.log("1");
function skrivTo() {
  console.log("2");
}
Promise.resolve().then(skrivTo);
console.log("3");
