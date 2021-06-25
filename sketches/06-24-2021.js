const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { gridPoints } = require("../lib/grid");
const { even } = require("../lib/math");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 400;
const pointWidth = 20;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const points = gridPoints(20, {
      margin,
      width,
      height,
    });

    context.lineWidth = pointWidth;
    context.strokeStyle = "black";

    // draw a couple random squares
    [0, 1].forEach(() => {
      const variant = random.range(1.5, 2);
      const variant2 = random.range(1, 3);
      context.strokeRect(
        margin * variant2 - margin / 2 + pointWidth,
        margin * variant2 - margin / 2 + pointWidth,
        width - margin * 2 * variant,
        height - margin * 2 * variant
      );
    });

    // draw the grid, randomize the points a bit
    points.forEach(([x, y], i) => {
      context.fillStyle = "black";
      if (even(i)) {
        context.fillRect(x + random.rangeFloor(0, 20), y, pointWidth, pointWidth);
      } else {
        context.fillRect(x, y + random.rangeFloor(0, 20), pointWidth, pointWidth);
      }
    });
  };
};

canvasSketch(sketch, settings);
