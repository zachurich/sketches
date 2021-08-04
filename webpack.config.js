const path = require('path');

console.log();

module.exports = (env) => {
  console.log(env);
  return {
    mode: 'development',
    entry: `./src/sketches/${env.filename}.js`,
    output: {
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
    },
  };
};
