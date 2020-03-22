const server = require('vilicando-core/server');
const withAntd = require('vilicando-antd/server');
const theme = require('./theme.json');

module.exports = withAntd(theme, server());
