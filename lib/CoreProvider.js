"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var debe_react_1 = require("debe-react");
var react_fela_1 = require("react-fela");
var LanguageProvider_1 = require("./LanguageProvider");
var components_1 = require("./components");
var theme_1 = require("./theme");
var defaultRenderer = theme_1.createRenderer({});
function CoreProvider(_a) {
    var children = _a.children, db = _a.db, _b = _a.theme, theme = _b === void 0 ? theme_1.theme : _b, _c = _a.renderer, renderer = _c === void 0 ? defaultRenderer : _c, _d = _a.loader, loader = _d === void 0 ? function () { return React.createElement(components_1.Loader, null); } : _d, phrases = _a.phrases, locale = _a.locale;
    return React.createElement("div", null,
        "...ks",
        children);
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement(LanguageProvider_1.default, { phrases: phrases, locale: locale },
            React.createElement(theme_1.ThemeProvider, { value: theme }, !!db && (React.createElement(debe_react_1.DebeProvider, { loading: loader, value: db }, children))))));
}
exports.default = CoreProvider;
