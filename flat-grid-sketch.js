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
  const palette = random.pick(palettes);
  const count = 30;
  const margin = 200;
  const padding = 0;
  const tileSize = (width - margin * 2) / count - padding;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const rand = random.value();
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const diag = rand > 0.4 ? rand : u * v;
        points.push({
          randColor: random.pick(palette),
          color: `hsl(${30 + y}, 50%, 100%)`,
          position: [u, v],
          area: tileSize * diag // need to make small
        });
      }
    }
    return points;
  };

  random.setSeed();
  const points = createGrid().filter((l, i) => {
    return i % 3 == 1 || random.value() > 0.5;
    // return l;
    // return random.value() > 0.2;
  });

  return ({ context, width, height }) => {
    context.fillStyle = palette[0];
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, area, color, randColor } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin - area, u); // V IMPORTANT FOR RECT & LERP, SUBTRACT SIZE FROM MAX
      const y = lerp(margin, height - margin - area, v);

      context.beginPath();
      // context.arc(x, y, tileSize * 0.5, 0, Math.PI * 2, false);
      context.rect(
        x,
        y,
        area, // * width because it needs to be relative to width of canvas
        area
      );
      context.lineWidth = 2;
      context.fillStyle = randColor;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
