const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { rgba } = require("../lib/colors");
const { gridPoints } = require("../lib/grid");
const { even } = require("../lib/math");

const settings = {
  dimensions: [2048, 2048],
};

const margin = 550;
const offset = 100;
const randomOffset = random.rangeFloor(1, 10);

const circle = (context, position, size) => {
  context.beginPath();
  context.arc(
    settings.dimensions[0] / 2 + randomOffset,
    settings.dimensions[0] / 2 - randomOffset,
    size,
    0,
    Math.PI * 2,
    true
  );

  const gradient = context.createLinearGradient(
    position,
    -position / 2,
    position * 2,
    100
  );
  gradient.addColorStop(0, rgba(0, 50, 200, 0));
  gradient.addColorStop(1, rgba(0, 50, 200, 0.8));

  context.fillStyle = gradient;
  context.fill();
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const points = gridPoints(20, {
      margin,
      width,
      height,
    });

    circle(context, margin + offset * randomOffset, 400);

    // circle(context, margin * 1.8, 33);

    let index = 0;
    for (const [x, y] of points) {
      // const size = random.rangeFloor(15, 20);
      const size = index * 0.03;
      const variation = (size <= 5 ? 5 : size) * y * 0.0004; // increase size to the bottom right corner
      context.fillStyle = rgba(0, 0, 0, index / 1000 + 0.2);
      context.fillRect(x + offset + 50, y + offset + 50, variation, variation);
      index++;
    }

    for (const [x, y] of points) {
      // const size = random.rangeFloor(15, 20);
      const size = index * 0.03;
      const variation = (size >= 5 ? 5 : size) * y * 0.0015; // increase size to the bottom right corner
      context.fillStyle = rgba(0, 0, 0, index / 1000);
      context.fillRect(x - offset - 50, y - offset - 50, variation, variation);
      index++;
    }
  };
};

canvasSketch(sketch, settings);
