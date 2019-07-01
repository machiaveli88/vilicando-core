"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fela_1 = require("fela");
var fela_plugin_embedded_1 = require("fela-plugin-embedded");
var fela_plugin_prefixer_1 = require("fela-plugin-prefixer");
var fela_plugin_fallback_value_1 = require("fela-plugin-fallback-value");
var fela_plugin_unit_1 = require("fela-plugin-unit");
var fela_plugin_validator_1 = require("fela-plugin-validator");
var fela_plugin_named_keys_1 = require("fela-plugin-named-keys");
var normalize_1 = require("./normalize");
var theme_1 = require("./theme");
exports.default = (function (_a) {
    var _b = _a.plugins, plugins = _b === void 0 ? [] : _b, _c = _a.css, css = _c === void 0 ? '' : _c;
    var renderer = fela_1.createRenderer({
        plugins: [
            fela_plugin_embedded_1.default(),
            fela_plugin_prefixer_1.default(),
            fela_plugin_fallback_value_1.default(),
            fela_plugin_unit_1.default(),
            fela_plugin_named_keys_1.default({
                ifHugeUp: '@media (min-width: 1200px)',
                ifLargeUp: '@media (min-width: 992px)',
                ifMediumUp: '@media (min-width: 768px)',
                ifSmallUp: '@media (min-width: 480px)',
                ifLargeDown: '@media (max-width: 1199px)',
                ifMediumDown: '@media (max-width: 991px)',
                ifSmallDown: '@media (max-width: 767px)',
                ifHuge: '@media (min-width: 1200px)',
                ifLarge: '@media (max-width: 1199px, min-width: 992)',
                ifMedium: '@media (max-width: 991px, min-width: 768)',
                ifSmall: '@media (max-width: 767px, min-width: 480)',
                ifMini: '@media (max-width: 479px)'
            }),
            fela_plugin_validator_1.default()
        ].concat(plugins)
    });
    renderer.renderStatic("\n    " + normalize_1.default + "\n\n    html, body {\n      background-color: " + theme_1.default.colors.primary[0] + ";\n      height: 100%;\n      position: fixed;\n      overflow: hidden;\n      user-select: none\n    }\n\n    div#app {\n      display: flex;\n      flex-direction: column;\n      width: 100vw;\n      height: 100vh;\n      min-height: 100%;\n      overflow-y: scroll;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    " + css + "\n  ");
    return renderer;
});
