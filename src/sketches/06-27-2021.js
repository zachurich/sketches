const canvasSketch = require("canvas-sketch");
const { gridPoints } = require("../lib/grid");
const { even } = require("../lib/math");
const random = require("canvas-sketch-util/random");
const { rgba } = require("../lib/colors");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 400;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#F5F5F5";
    context.fillRect(0, 0, width, height);

    const points = gridPoints(15, {
      margin,
      width,
      height,
    });

    for (const [x, y] of points) {
      if (even(random.rangeFloor(1, 3))) {
        const size = random.rangeFloor(0, 150);
        context.fillStyle = rgba(0, 0, 0, x / 5000);
        context.fillRect(x, y, size, size);
      }
    }
  };
};

canvasSketch(sketch, settings);
