"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var debe_react_1 = require("debe-react");
var react_fela_1 = require("react-fela");
var LanguageProvider_1 = require("./LanguageProvider");
var ThemeProvider_1 = require("./ThemeProvider");
var Loader_1 = require("./Loader");
var renderer_1 = require("./renderer");
var theme_1 = require("./theme");
require("./style.less");
var defaultRenderer = renderer_1.default({});
function CoreProvider(_a) {
    var children = _a.children, db = _a.db, _b = _a.theme, theme = _b === void 0 ? theme_1.default : _b, _c = _a.renderer, renderer = _c === void 0 ? defaultRenderer : _c, _d = _a.loader, loader = _d === void 0 ? function () { return React.createElement(Loader_1.default, null); } : _d;
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement(LanguageProvider_1.default, null,
            React.createElement(ThemeProvider_1.default, { value: theme }, !!db && (React.createElement(debe_react_1.DebeProvider, { loading: loader, value: db }, children))))));
}
exports.default = CoreProvider;
