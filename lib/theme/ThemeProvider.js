"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_fela_1 = require("react-fela");
var parseTheme = function (theme) {
    Object.keys(theme).forEach(function (key) {
        theme[key] = theme[key].replace(/(\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?)/g, function (match) {
            var removeBraces = match.replace('@{', '@').replace('}', '');
            return theme[removeBraces.substring(1)];
        });
    });
    return theme;
};
exports.ThemeContext = React.createContext({});
exports.useTheme = function () { return React.useContext(exports.ThemeContext); };
exports.useFela = function () {
    var theme = React.useContext(exports.ThemeContext);
    var css = react_fela_1.useFela().css;
    // replacing @-vars with values
    var parsedTheme = React.useMemo(
    // 3-fach damit auch nested Variablen ersetzt werden!
    function () { return parseTheme(parseTheme(parseTheme(theme))); }, [theme]);
    return [css, parsedTheme];
};
exports.default = exports.ThemeContext.Provider;
//# sourceMappingURL=ThemeProvider.js.map