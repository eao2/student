module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Use Expo's Babel preset
  };
};