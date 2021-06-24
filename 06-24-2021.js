const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { gridPoints } = require("./lib/grid");
const { even } = require("./lib/math");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 400;
const pointWidth = 20;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "black";

    const points = gridPoints(20, {
      margin,
      width,
      height,
    });
    points.forEach(([x, y], i) => {
      if (even(i)) {
        context.fillRect(x + random.rangeFloor(0, 20), y, pointWidth, pointWidth);
      } else {
        context.fillRect(x, y + random.rangeFloor(0, 20), pointWidth, pointWidth);
      }
    });
  };
};

canvasSketch(sketch, settings);
