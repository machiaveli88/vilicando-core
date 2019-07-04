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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var withLess = require('@zeit/next-less');
var theme = require('./theme');
exports.default = (function (modifyVars, nextConfig) {
    if (nextConfig === void 0) { nextConfig = {}; }
    var lessLoaderOptions = nextConfig.lessLoaderOptions, webpack = nextConfig.webpack, rest = __rest(nextConfig, ["lessLoaderOptions", "webpack"]);
    return withLess(__assign({ lessLoaderOptions: __assign({ javascriptEnabled: true, modifyVars: __assign({}, theme, modifyVars) }, lessLoaderOptions), webpack: function (config, options) {
            var isServer = options.isServer;
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
            if (typeof webpack === 'function') {
                return webpack(config, options);
            }
            return config;
        } }, rest));
});
//# sourceMappingURL=server.js.map