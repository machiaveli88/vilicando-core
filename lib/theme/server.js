"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var withLess = require('@zeit/next-less');
var theme = require('./theme');
exports.default = (function (modifyVars) {
    return withLess({
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: __assign({}, theme, modifyVars)
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
//# sourceMappingURL=server.js.map