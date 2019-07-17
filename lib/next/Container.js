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
const CoreProvider_1 = __importDefault(require("../CoreProvider"));
const nprogress_1 = __importDefault(require("nprogress"));
const router_1 = __importDefault(require("next/router"));
const app_1 = require("next/app");
/*
  Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:

  - Persisting layout between page changes
  - Keeping state when navigating pages
  - Custom error handling using componentDidCatch
  - Inject additional data into pages (for example by processing GraphQL queries)
*/
router_1.default.events.on('routeChangeStart', () => nprogress_1.default.start());
router_1.default.events.on('routeChangeComplete', () => nprogress_1.default.done());
router_1.default.events.on('routeChangeError', () => nprogress_1.default.done());
exports.default = ({ children, theme, renderer }) => (React.createElement(app_1.Container, null,
    React.createElement(CoreProvider_1.default, { theme: theme, renderer: renderer }, children)));
//# sourceMappingURL=Container.js.map