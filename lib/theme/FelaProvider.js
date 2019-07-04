"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_fela_1 = require("react-fela");
const ThemeProvider_1 = require("./ThemeProvider");
const renderer_1 = require("./renderer");
const theme_json_1 = require("./theme.json");
const defaultRenderer = renderer_1.default({});
function FelaProvider({ children, theme = {}, renderer = defaultRenderer }) {
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement(ThemeProvider_1.default, { value: { ...theme_json_1.default, ...theme } }, children)));
}
exports.default = FelaProvider;
//# sourceMappingURL=FelaProvider.js.map