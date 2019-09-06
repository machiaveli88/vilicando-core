const { withCore } = require('vilicando-core');
const theme = require('./theme');
const path = require('path');

module.exports = withCore(
  { theme, env: path.join(__dirname, '.env') },
  { dir: __dirname }
);
