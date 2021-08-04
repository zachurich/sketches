const fs = require('fs');
const express = require('express');

const [sketchName] = process.argv.slice(2);

const template = `import * as P5 from 'p5';

const count = 10;
const margin = 50;
const size = {
  width: 600,
  height: 600,
};

const sketch = (context) => {
  context.setup = () => {
    context.createCanvas(size.width, size.height);
  };

  context.draw = () => {
    context.background('black');
    context.fill('white');
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const rectSize = 20;
        const x1 = context.lerp(margin, size.width - margin - rectSize, x / (count - 1));
        const y1 = context.lerp(margin, size.height - margin - rectSize, y / (count - 1));
        context.rect(x1, y1, rectSize, rectSize);
      }
    }
  };
};

new P5(sketch);
`;

fs.writeFile(`./src/sketches/${sketchName}.js`, template, (err) => {
  if (err) throw err;
  console.log(`Created sketch file ${sketchName}.js`);
});
