const random = require("canvas-sketch-util/random");

module.exports.rgb = (r = 0, g = 0, b = 0) => `rgb(${r}, ${g}, ${b})`;
module.exports.rgba = (r = 0, g = 0, b = 0, a = random.range(0, 1)) =>
  `rgba(${r},${g},${b},${a})`;
