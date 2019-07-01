"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withLess = require('@zeit/next-less');
exports.default = (function (modifyVars) {
    return withLess({
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: modifyVars
        },
        webpack: function (config, _a) {
            var isServer = _a.isServer;
            if (isServer) {
                var antStyles_1 = /antd\/.*?\/style.*?/;
                var origExternals_1 = config.externals.slice();
                config.externals = [
                    function (context, request, callback) {
                        if (request.match(antStyles_1))
                            return callback();
                        if (typeof origExternals_1[0] === 'function') {
                            origExternals_1[0](context, request, callback);
                        }
                        else {
                            callback();
                        }
                    }
                ].concat((typeof origExternals_1[0] === 'function' ? [] : origExternals_1));
                config.module.rules.unshift({
                    test: antStyles_1,
                    use: 'null-loader'
                });
            }
            return config;
        }
    });
});
