"use strict";
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
const React = __importStar(require("react"));
const theme_json_1 = __importDefault(require("./theme.json"));
const ThemeProvider_1 = __importDefault(require("./ThemeProvider"));
const react_fela_1 = require("react-fela");
function FelaProvider({ children, theme = {}, renderer }) {
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement(ThemeProvider_1.default, { value: { ...theme_json_1.default, ...theme } }, children)));
}
exports.default = FelaProvider;
//# sourceMappingURL=FelaProvider.js.map