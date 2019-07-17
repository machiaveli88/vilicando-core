"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fela_plugin_embedded_1 = __importDefault(require("fela-plugin-embedded"));
const fela_plugin_fallback_value_1 = __importDefault(require("fela-plugin-fallback-value"));
const fela_plugin_named_keys_1 = __importDefault(require("fela-plugin-named-keys"));
const normalize_1 = __importDefault(require("./normalize"));
const fela_plugin_prefixer_1 = __importDefault(require("fela-plugin-prefixer"));
const fela_plugin_unit_1 = __importDefault(require("fela-plugin-unit"));
const fela_plugin_validator_1 = __importDefault(require("fela-plugin-validator"));
const fela_preset_web_1 = __importDefault(require("fela-preset-web"));
const fela_1 = require("fela");
exports.default = ({ plugins = [], css = '' }) => {
    const renderer = fela_1.createRenderer({
        plugins: [
            fela_plugin_embedded_1.default(),
            fela_plugin_prefixer_1.default(),
            fela_plugin_fallback_value_1.default(),
            fela_plugin_unit_1.default(),
            fela_plugin_named_keys_1.default({
                // From
                ifHugeUp: '@media (min-width: 1200px)',
                ifLargeUp: '@media (min-width: 992px)',
                ifMediumUp: '@media (min-width: 768px)',
                ifSmallUp: '@media (min-width: 480px)',
                // To
                ifLargeDown: '@media (max-width: 1199px)',
                ifMediumDown: '@media (max-width: 991px)',
                ifSmallDown: '@media (max-width: 767px)',
                // On
                ifHuge: '@media (min-width: 1200px)',
                ifLarge: '@media (max-width: 1199px, min-width: 992)',
                ifMedium: '@media (max-width: 991px, min-width: 768)',
                ifSmall: '@media (max-width: 767px, min-width: 480)',
                ifMini: '@media (max-width: 479px)'
            }),
            fela_plugin_validator_1.default(),
            ...fela_preset_web_1.default,
            ...plugins
        ]
    });
    renderer.renderStatic(`
    ${normalize_1.default}

    ${css}
  `);
    return renderer;
};
//# sourceMappingURL=create-renderer.js.map