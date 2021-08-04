const canvasSketch = require('canvas-sketch');
const { gridPoints } = require('../lib/grid');

const settings = {
  duration: 3,
  dimensions: [2048, 2048],
  animate: true,
  fps: 60,
  scaleToView: true,
  playbackRate: 'throttle',
};

const count = 10;

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const grid = gridPoints(count, {
      margin: 500,
      width,
      height,
    });

    let index = 0;
    let reverseIndex = count * count - 1;
    for (const [x, y, u, v] of grid) {
      const size = index >= (count * count) / 2 ? Math.abs(reverseIndex) * 0.5 : 30;
      context.save();

      context.fillStyle = 'white';
      context.translate(x, y);

      const offset = u * 0.2 + v * 0.1;
      const t = (playhead + offset) % 1;

      // now we get a value that varies from 0..1 and back
      let mod = Math.sin(t * Math.PI);

      // we make it 'ease' a bit more dramatically with exponential
      mod = Math.pow(mod, 3);

      // now choose a length, thickness and initial rotation
      const initialRotation = Math.PI / 2;

      // And rotate each line a bit by our modifier
      const rotation = initialRotation + mod * Math.PI;
      context.rotate(rotation);
      context.translate(-x, -y);

      context.fillRect(x, y, size, size);
      context.restore();
      index++;
      reverseIndex--;
    }
  };
};

canvasSketch(sketch, settings);
