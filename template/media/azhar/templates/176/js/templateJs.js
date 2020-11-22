
var rellax = new Rellax(".rellax", {
  speed: 1.5,
  breakpoints: [567, 768, 1201],
});
let once = true;
function samplefunc() {
  let thirdColumn = document.querySelector(".floating-banner .third-col");
  let viewPortOffset = thirdColumn.getBoundingClientRect();
  let distanceFromTop = viewPortOffset.top;
  let windowHeight = window.innerHeight;
  console.log(distanceFromTop);
  console.log(windowHeight);
  console.log(windowHeight - distanceFromTop);

  let distanceFromBottom = windowHeight - distanceFromTop;
  if (distanceFromBottom > 0 && once) {
    once = false;
  }
}

window.addEventListener("scroll", function () {
  samplefunc();
});