const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2074, 2074],
  orientation: "portrait"
  // units: "cm",
  // pixelsPerInch: 300
};

const sketch = ({ width, height }) => {
  const palette = random.pick(palettes).slice(0, 1);
  const count = 30;
  const margin = 200;
  const padding = 0;
  const bg = `hsl(${random.rangeFloor(0, 361)}, 50%, 10%)`;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u + 10.0, v * 10.0)) * 0.05;
        points.push({
          randColor: `hsl(0, 0%, ${random.noise2D(u + 10.0, v * 10.0) * 100}%)`,
          position: [u, v],
          rotation: random.noise2D(x * 2.0, y * 2.0),
          radius // need to make small
        });
      }
    }
    return points;
  };

  random.setSeed();
  const points = createGrid().filter((l, i) => {
    return l;
    // return random.value() > 0.2;
  });

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, randColor, rotation } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(
        x,
        y,
        radius * width < 20 ? radius * width : 20,
        0,
        Math.PI * 2,
        false
      );
      context.fillStyle = randColor;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
