
var first_rule = document.styleSheets[0].cssRules[0];
var parent = document.querySelector("#parent");
var picker = new Picker(parent);
// console.log(picker);
parent.style.color = "var(--color_1)";
var zs = "color1""${"--" + "${zs}"}"
);
var defcolor = getComputedStyle(document.documentElement).getPropertyValue(
  "--color1"
);
picker.settings.defaultColor = defcolor;
console.log(colors);
// "var(--color_7)"
// "hsl(140, 100%, 70%)"
//   var color = "var(--color_8)";
// You can do what you want with the chosen color using two callbacks: onChange and onDone.
picker.onChange = function (color) {
  parent.style.color = color.rgbaString;
};
// onDone is similar to onChange, but only called when you click "Ok".
