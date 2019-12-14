const server = require('vilicando-core/server');
const withAntd = require('vilicando-antd/server');

module.exports = withAntd(server());
