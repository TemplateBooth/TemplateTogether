let color_variables = [
  '--color1',
  '--color2'
]

var first_rule = document.styleSheets[0].cssRules[1];
var parent = document.querySelector("#parent");
var picker = new Picker(parent);
// console.log(picker);
parent.style.color = "var(--color1)";
var zs = "color1";
console.log(first_rule);
for (let i = 0; i < first_rule.styleMap.size; i++) {
  console.log(first_rule.style[i]);
}
var colors = getComputedStyle(document.documentElement).getPropertyValue(
  `${"--" + `${zs}`}`
);
var defcolor = getComputedStyle(document.documentElement).getPropertyValue(
  "--color1"
);

picker.settings.defaultColor = defcolor;
console.log(colors);
//   var color = "royalblue";
// You can do what you want with the chosen color using two callbacks: onChange and onDone.
picker.onChange = function (color) {
  console.log(color)
  document.documentElement.style.setProperty(color_variables[0], color.rgbaString);
};
// onDone is similar to onChange, but only called when you click 'Ok'.
