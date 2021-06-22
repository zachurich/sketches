const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048]
};

const createGrid = () => {
  const count = 20;
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);
      points.push({
        position: [u, v],
        color: "white"
      });
    }
  }
  return points;
};

const points = createGrid().filter((pair, i) => {
  if (Math.floor(random.value() * 10) % 3 === 0) {
    pair.color = `hsl(170, 0%, 30%)`;
  }

  if (Math.floor(random.value() * 10) % 3 === 0) {
    pair.color = `hsl(170, 0%, 70%)`;
  }

  if (Math.floor(random.value() * 10) > 2) {
    return pair;
  }
});

const sketch = () => {
  const margin = 500;
  const extend = 20;
  return ({ context, width, height }) => {
    context.fillStyle = "#0f0f0f";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, color } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u); // V IMPORTANT FOR RECT & LERP, SUBTRACT SIZE FROM MAX
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.moveTo(x, y);
      context.lineWidth = 10;
      context.lineCap = "round";
      context.strokeStyle = color;
      const x1 = x + 0;
      const y1 = y + extend;
      context.lineTo(x1, y1);
      context.lineTo(x1 + extend, y1 - 0);
      context.stroke();

      // const negX = width - x;
      // const negY = height - y;
      // context.beginPath();
      // context.moveTo(negX, negY);
      // context.lineWidth = 2;
      // context.lineTo(negX + 10, negY + 10);
      // context.lineTo(x, y);
      // context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
