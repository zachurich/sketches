const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { rgba } = require('../lib/colors');
const { variableLengthArray } = require('../lib/data');
const { gridPoints } = require('../lib/grid');
const { even } = require('../lib/math');

const settings = {
  dimensions: [2048, 2048],
  pixelsPerInch: 300,
};

const margin = 600;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = rgba(0, 0, 0, 0.96);
    context.fillRect(0, 0, width, height);

    variableLengthArray(4).forEach((val) => {
      for (const [x, y] of gridPoints(2000, {
        margin: 1000,
        width,
        height,
      })) {
        const variation = 1;
        context.fillStyle = rgba(256, 256, 256, val * 0.01);
        const dither = 200 + val * 10;
        context.fillRect(
          x + margin + random.rangeFloor(-dither, dither) - val * 100 - 100,
          y + margin + random.rangeFloor(-dither, dither) + val * 100 - 600,
          variation,
          variation,
        );
      }
    });

    variableLengthArray(4).forEach((val) => {
      for (const [x, y] of gridPoints(2000, {
        margin: 1000,
        width,
        height,
      })) {
        const variation = 1;
        context.fillStyle = rgba(256, 256, 256, val * 0.01);
        const dither = 200 + val * 10;
        context.fillRect(
          x - margin + random.rangeFloor(-dither, dither) + val * 100 + 100,
          y + margin + random.rangeFloor(-dither, dither) - val * 100 - 600,
          variation,
          variation,
        );
      }
    });

    // for (const [x, y] of gridPoints(500, {
    //   margin,
    //   width,
    //   height,
    // })) {
    //   if (even(random.rangeFloor(0, 100))) {
    //     const variation = random.range(0, 1) * 4; // increase size to the bottom right corner
    //     context.fillStyle = rgba(256, 256, 256, random.range(0, 0.4));
    //     const dither = 50;
    //     context.fillRect(
    //       x + random.rangeFloor(-dither, dither),
    //       y + random.rangeFloor(-dither, dither),
    //       variation,
    //       variation
    //     );
    //   }
    // }

    // for (const [x, y] of gridPoints(500, {
    //   margin: 800,
    //   width,
    //   height,
    // })) {
    //   if (even(random.rangeFloor(0, 100))) {
    //     const variation = random.range(0, 1) * 4; // increase size to the bottom right corner
    //     context.fillStyle = rgba(256, 256, 256, random.range(0, 0.4));
    //     const dither = 50;
    //     context.fillRect(
    //       x + random.rangeFloor(-dither, dither) - 250,
    //       y + random.rangeFloor(-dither, dither) - 250,
    //       variation,
    //       variation
    //     );
    //   }
    // }

    // for (const [x, y] of gridPoints(150, {
    //   margin: 900,
    //   width,
    //   height,
    // })) {
    //   if (even(random.rangeFloor(0, 100))) {
    //     const variation = random.range(0, 1) * 4; // increase size to the bottom right corner
    //     context.fillStyle = rgba(250, 200, 0, random.range(0, 0.4));
    //     const dither = 50;
    //     context.fillRect(
    //       x + random.rangeFloor(-dither, dither) + 250,
    //       y + random.rangeFloor(-dither, dither) + 250,
    //       variation,
    //       variation
    //     );
    //   }
    // }
  };
};

canvasSketch(sketch, settings);
