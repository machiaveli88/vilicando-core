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
const react_fela_1 = require("react-fela");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
function colorPalette(color, index) {
    const hueStep = 2;
    const saturationStep = 16;
    const saturationStep2 = 5;
    const brightnessStep1 = 5;
    const brightnessStep2 = 15;
    const lightColorCount = 5;
    const darkColorCount = 4;
    const isLight = index <= 6;
    const hsv = tinycolor2_1.default(color).toHsv();
    const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
    const getHue = (hsv, i, isLight) => {
        let hue;
        if (hsv.h >= 60 && hsv.h <= 240) {
            hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
        }
        else {
            hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
        }
        if (hue < 0) {
            hue += 360;
        }
        else if (hue >= 360) {
            hue -= 360;
        }
        return Math.round(hue);
    };
    const getSaturation = (hsv, i, isLight) => {
        let saturation;
        if (isLight) {
            saturation = Math.round(hsv.s * 100) - saturationStep * i;
        }
        else if (i === darkColorCount) {
            saturation = Math.round(hsv.s * 100) + saturationStep;
        }
        else {
            saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
        }
        if (saturation > 100) {
            saturation = 100;
        }
        if (isLight && i === lightColorCount && saturation > 10) {
            saturation = 10;
        }
        if (saturation < 6) {
            saturation = 6;
        }
        return Math.round(saturation);
    };
    const getValue = (hsv, i, isLight) => {
        if (isLight) {
            return Math.round(hsv.v * 100) + brightnessStep1 * i;
        }
        return Math.round(hsv.v * 100) - brightnessStep2 * i;
    };
    return tinycolor2_1.default({
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight)
    }).toHexString();
}
const replaceLessVars = (theme) => {
    const newTheme = { ...theme };
    Object.keys(theme).forEach(key => {
        // @var +- something
        if (theme[key].indexOf('ceil(') < 0)
            newTheme[key] = theme[key].replace(/\(?\@[a-z0-9]+(-[a-z0-9]*)* [\+\-\*] (.+)\w\)?/g, (match) => `calc(${match})`);
        // @var
        newTheme[key] = newTheme[key].replace(/\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?/g, (match) => newTheme[match.replace(/\@\{?/g, '').replace(/\}?/g, '')]);
    });
    // detect and replace nested vars
    const stringifiedTheme = JSON.stringify(newTheme);
    if (stringifiedTheme.indexOf('@') >= 0 &&
        JSON.stringify(theme) !== stringifiedTheme)
        return replaceLessVars(newTheme);
    return newTheme;
};
const parseTheme = (theme) => {
    Object.keys(theme).forEach(key => {
        // hsv()
        theme[key] = theme[key].replace(/hsv\(.+\)/g, (match) => tinycolor2_1.default(match).toRgbString());
        // hsl()
        theme[key] = theme[key].replace(/hsl\(.+\)/g, (match) => tinycolor2_1.default(match).toRgbString());
        // fade()
        theme[key] = theme[key].replace(/fade\(([^,]+),([^,]+)\)/g, (match, color, alpha) => tinycolor2_1.default(color)
            .setAlpha(parseInt(alpha) / 100)
            .toRgbString());
        // tint()
        theme[key] = theme[key].replace(/tint\(([^,]+),([^,]+)\)/g, (match, color, weight) => tinycolor2_1.default(color)
            .lighten(parseInt(weight))
            .toRgbString());
        // colorPalette
        theme[key] = theme[key].replace(/(color\()?\~\`colorPalette\(\'([^,]+)\',([^,]+)\)[ ]?\`\)?/g, (match, stuff, color, index) => colorPalette(color, parseInt(index)));
        // ceil()
        theme[key] = theme[key].replace('ceil', 'calc');
    });
    return theme;
};
exports.ThemeContext = React.createContext({});
exports.useTheme = () => React.useContext(exports.ThemeContext);
exports.useFela = () => {
    const theme = React.useContext(exports.ThemeContext);
    const { css } = react_fela_1.useFela();
    // replacing @-vars & functions with values
    const parsedTheme = React.useMemo(() => parseTheme(replaceLessVars(theme)), [
        theme
    ]);
    return [css, parsedTheme];
};
exports.default = exports.ThemeContext.Provider;
//# sourceMappingURL=ThemeProvider.js.map