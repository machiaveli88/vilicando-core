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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var server_1 = __importDefault(require("./theme/server"));
exports.withCore = function (theme, nextConfig) {
    if (nextConfig === void 0) { nextConfig = {}; }
    var webpack = nextConfig.webpack, dir = nextConfig.dir, rest = __rest(nextConfig, ["webpack", "dir"]);
    return server_1.default(theme, __assign({ webpack: function (config, options) {
            var dirname = dir || __dirname;
            config.resolve.alias['@assets'] = path_1.default.join(dirname, 'assets');
            config.resolve.alias['@components'] = path_1.default.join(dirname, 'components');
            config.resolve.alias['@data'] = path_1.default.join(dirname, 'data');
            config.resolve.alias['@forms'] = path_1.default.join(dirname, 'forms');
            config.resolve.alias['@pages'] = path_1.default.join(dirname, 'pages');
            config.resolve.alias['@utils'] = path_1.default.join(dirname, 'utils');
            // waiting for PR https://github.com/zeit/next.js/pull/7550
            config.stats = {};
            config.stats.warnings = false;
            config.stats.warningsFilter = function (warning) {
                console.log('it works?!');
                console.log('it works?!');
                console.log('it works?!');
                console.log('it works?!');
                console.log('it works?!');
                console.log('it works?!');
                return /Conflicting order between/gm.test(warning);
            };
            if (typeof webpack === 'function') {
                return webpack(config, options);
            }
            return config;
        },
        dir: dir }, rest));
};
//# sourceMappingURL=server.js.map