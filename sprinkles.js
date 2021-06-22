const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048]
};

const randRange = (min = -10, max = 10) => Math.floor(random.range(min, max));

const sketch = ({ width, height }) => {
  const count = 30;
  const margin = 400;
  const randHue = Math.floor(randRange(0, 360));
  let points = [];
  const createGrid = () => {
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const randPercent = Math.floor(randRange(50, 100));
        console.log(randPercent);
        points.push({
          position: [u, v],
          thickness: 20,
          color: `hsl(${randHue}, ${randPercent}%, ${randPercent}%)`
        });
      }
    }
    return points;
  };

  points = createGrid().filter((pair, i) => {
    return pair;
  });
  return ({ context, width, height }) => {
    context.fillStyle = `hsl(${randHue}, 100%, 95%)`;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, color, thickness } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u); // V IMPORTANT FOR RECT & LERP, SUBTRACT SIZE FROM MAX
      const y = lerp(margin, height - margin, v);

      const extendX = randRange();
      const extendY = randRange();

      context.beginPath();
      context.moveTo(x, y);
      context.strokeStyle = color;
      context.lineCap = "round";
      context.lineWidth = thickness;
      const x1 = x + extendX;
      const y1 = y + extendY;
      context.lineTo(x1, y1);
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
