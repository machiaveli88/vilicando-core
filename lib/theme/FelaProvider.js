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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_fela_1 = require("react-fela");
var ThemeProvider_1 = __importDefault(require("./ThemeProvider"));
var renderer_1 = __importDefault(require("./renderer"));
var theme_json_1 = __importDefault(require("./theme.json"));
var defaultRenderer = renderer_1.default({});
function FelaProvider(_a) {
    var children = _a.children, _b = _a.theme, theme = _b === void 0 ? {} : _b, _c = _a.renderer, renderer = _c === void 0 ? defaultRenderer : _c;
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement(ThemeProvider_1.default, { value: __assign({}, theme_json_1.default, theme) }, children)));
}
exports.default = FelaProvider;
//# sourceMappingURL=FelaProvider.js.map