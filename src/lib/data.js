module.exports.variableLengthArray = (length, mapFn = (_, index) => index) => [...new Array(length + 1)].map(mapFn);
