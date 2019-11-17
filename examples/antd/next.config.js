const server = require('vilicando-core/server');
const withAntd = require('vilicando-antd/server');
const theme = require('./theme');

module.exports = withAntd(theme, server());
