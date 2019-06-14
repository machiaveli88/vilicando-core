"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fela_1 = require("react-fela");
exports.ThemeContext = React.createContext({});
exports.useTheme = function () { return React.useContext(exports.ThemeContext); };
exports.useFela = function () {
    var theme = React.useContext(exports.ThemeContext);
    var css = react_fela_1.useFela().css;
    return [css, theme];
};
exports.default = exports.ThemeContext.Provider;
