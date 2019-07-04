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
var React = __importStar(require("react"));
var language_1 = __importDefault(require("./language"));
// import { Loader } from './components';
var theme_1 = require("./theme");
function CoreProvider(_a) {
    var children = _a.children, 
    // db,
    theme = _a.theme, renderer = _a.renderer, 
    /* loader = () => <Loader />,
    loading = false, */
    locale = _a.locale;
    return (React.createElement(theme_1.FelaProvider, { renderer: renderer, theme: theme },
        React.createElement(language_1.default, { translation: {}, locale: locale }, 
        /* !!db ? (
        <DebeProvider loading={loader} value={db}>
          {children}
        </DebeProvider>
      ) : */ children)));
}
exports.default = CoreProvider;
//# sourceMappingURL=CoreProvider.js.map