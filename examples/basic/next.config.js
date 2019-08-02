const withCore = require('vilicando-core/server');
const theme = require('./theme');
const path = require('path');

module.exports = withCore(
  { theme, env: path.join(__dirname, 'test.env') },
  { dir: __dirname }
);
