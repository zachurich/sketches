const { lerp } = require("canvas-sketch-util/math");

module.exports.createGrid = (
  count = 5,
  determineX = (coord, count) => coord / (count - 1),
  determineY = determineX
) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = determineX(x, count);
      const v = determineY(y, count);
      points.push({
        position: [u, v],
      });
    }
  }
  return points;
};

module.exports.gridPoints = (count, options = {}) => {
  const { margin, width, height, determineX, determineY } = options;
  const gridPoints = this.createGrid(count, determineX, determineY);
  return gridPoints.map(({ position }) => {
    const [u, v] = position;
    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);
    return [x, y];
  });
};
