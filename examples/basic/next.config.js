const withCore = require('vilicando-core/server');
const theme = require('./theme');

module.exports = withCore(theme, { dir: __dirname });
