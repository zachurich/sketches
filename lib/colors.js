/**
 *
 * Get rgb values from image pixel data
 * Returns vary large array
 */
module.exports.colorsFromImage = (image, context, width, height) => {
  // Render to canvas
  context.drawImage(image, 0, 0, width, height);

  // Extract bitmap pixel data
  const imageData = context.getImageData(0, 0, width, height);

  // Manipulate pixels
  let pixels = imageData.data;
  const colors = [];
  for (let i = 0; i <= pixels.length; i++) {
    if ((i + 1) % 3 === 0) {
      colors.push(rgb(pixels[i - 2], pixels[i - 1], pixels[i]));
    }
  }

  context.clearRect(0, 0, width, height);

  return colors;
};

module.exports.rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
