"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var CoreProvider_1 = require("./CoreProvider");
exports.CoreProvider = CoreProvider_1.default;
var language_1 = require("./language");
exports.LanguageProvider = language_1.default;
exports.useLanguage = language_1.useLanguage;
__export(require("./components"));
__export(require("./theme"));
//# sourceMappingURL=index.js.map