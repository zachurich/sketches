const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const { createGrid } = require("./lib/grid");

const settings = {
  dimensions: [2048, 2048],
};

const points = createGrid(5);
const margin = 300;

const sketch = async () => {
  return ({ context, width, height }) => {
    context.beginPath();
    // context.moveTo(0, 0);

    points.forEach(({ position }) => {
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.lineWidth = 10;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(x, y);
      context.lineTo(y, x);
    });
    // colorsFromImage(image, context, 100, 100).forEach((color, i) => {});
    context.strokeStyle = "black";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
