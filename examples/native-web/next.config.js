const server = require("vilicando-core/server");
const withNativeWeb = require("vilicando-native-web/server");

module.exports = server(withNativeWeb());
