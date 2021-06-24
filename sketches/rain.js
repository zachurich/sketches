const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = ({ width, height }) => {
  const extend = 20;
  const count = 60;
  const margin = 300;
  let points = [];
  const createGrid = () => {
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const diag = u * v;
        points.push({
          position: [u, v],
          thickness: diag < 0.1 ? 1 : 8 * diag,
          color: "white"
        });
      }
    }
    return points;
  };

  points = createGrid().filter((pair, i) => {
    if (Math.floor(random.value() * 10) % 3 === 0) {
      pair.color = `hsl(52, 25%, ${80 + i / 200}%)`;
    } else {
      pair.color = `hsl(${250 + i / 100}, 90%, ${50 + i / 200}%)`;
    }
    return pair;
  });
  return ({ context, width, height }) => {
    context.fillStyle = "#f7f6ef";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, color, thickness } = data;
      const [u, v] = position;
      const diag = u * v;

      const x = lerp(margin, width - margin, u); // V IMPORTANT FOR RECT & LERP, SUBTRACT SIZE FROM MAX
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.moveTo(x, y);
      context.strokeStyle = color;
      context.lineWidth = thickness;
      const x1 = x + extend;
      const y1 = y + extend;
      context.lineTo(x1, y1);
      context.stroke();

      context.lineCap = "square";
    });
  };
};

canvasSketch(sketch, settings);
