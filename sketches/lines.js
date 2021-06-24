const { lerp } = require("canvas-sketch-util/math");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048]
};

const createGrid = () => {
  const count = 10;
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);
      points.push({
        position: [u, v]
      });
    }
  }
  return points;
};

const points = createGrid();

const sketch = () => {
  const margin = 200;
  return ({ context, width, height }) => {
    context.fillStyle = "#0f0f0f";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u); // V IMPORTANT FOR RECT & LERP, SUBTRACT SIZE FROM MAX
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.moveTo(x, y);
      context.lineWidth = 2;
      context.lineTo(x + 10, y + 10);
      context.lineTo(y, x);
      context.stroke();

      const negX = width - x;
      const negY = height - y;
      context.beginPath();
      context.moveTo(negX, negY);
      context.lineWidth = 2;
      context.lineTo(negX + 10, negY + 10);
      context.lineTo(x, y);
      context.stroke();

      context.strokeStyle = "white";
    });
  };
};

canvasSketch(sketch, settings);
