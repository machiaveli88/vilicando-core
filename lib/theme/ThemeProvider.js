"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_fela_1 = require("react-fela");
const parseTheme = (theme) => {
    Object.keys(theme).forEach(key => {
        theme[key] = theme[key].replace(/(\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?)/g, (match) => {
            const removeBraces = match.replace('@{', '@').replace('}', '');
            return theme[removeBraces.substring(1)];
        });
    });
    return theme;
};
exports.ThemeContext = React.createContext({});
exports.useTheme = () => React.useContext(exports.ThemeContext);
exports.useFela = () => {
    const theme = React.useContext(exports.ThemeContext);
    const { css } = react_fela_1.useFela();
    // replacing @-vars with values
    const parsedTheme = React.useMemo(
    // 3-fach damit auch nested Variablen ersetzt werden!
    () => parseTheme(parseTheme(parseTheme(theme))), [theme]);
    return [css, parsedTheme];
};
exports.default = exports.ThemeContext.Provider;
//# sourceMappingURL=ThemeProvider.js.map