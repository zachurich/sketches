import * as P5 from 'p5';
import { gradient } from '../lib/colors';

const count = 10;
const margin = 200;
const size = {
  width: 800,
  height: 800,
};

const sketch = (context) => {
  context.setup = () => {
    context.createCanvas(size.width, size.height);
  };

  context.draw = () => {
    context.background(0);

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let rectSize = 20;

        if (x < count / 2) {
          rectSize = count + y - x;
        } else {
          rectSize = count - y + x;
        }

        const color1 = context.color('hsl(20, 100%, 50%)');
        const color2 = context.color('hsl(220, 100%, 50%)');
        const grad = gradient(context, y, color1, color2, rectSize);
        const x1 = context.lerp(margin, size.width - margin - rectSize, x / (count - 1));
        const y1 = context.lerp(margin, size.height - margin - rectSize, y / (count - 1));
        // context.fill(context.color('hsl(220, 100%, 20%)'));
        // context.rect(x1 + 5, y1 + 5, rectSize, rectSize);

        context.fill(grad);
        context.rect(x1, y1, rectSize, rectSize);
      }
    }

    context.noLoop();
    // context.save('grid-squares-radial-size-increase.png');
  };
};

new P5(sketch);
