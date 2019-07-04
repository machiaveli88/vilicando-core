"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const language_1 = require("./language");
// import { Loader } from './components';
const theme_1 = require("./theme");
function CoreProvider({ children, 
// db,
theme, renderer, 
/* loader = () => <Loader />,
loading = false, */
locale }) {
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