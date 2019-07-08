"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_fela_1 = require("react-fela");
var tinycolor2_1 = __importDefault(require("tinycolor2"));
function colorPalette(color, index) {
    var hueStep = 2;
    var saturationStep = 16;
    var saturationStep2 = 5;
    var brightnessStep1 = 5;
    var brightnessStep2 = 15;
    var lightColorCount = 5;
    var darkColorCount = 4;
    var isLight = index <= 6;
    var hsv = tinycolor2_1.default(color).toHsv();
    var i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
    var getHue = function (hsv, i, isLight) {
        var hue;
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
    var getSaturation = function (hsv, i, isLight) {
        var saturation;
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
    var getValue = function (hsv, i, isLight) {
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
var replaceLessVars = function (theme) {
    var newTheme = __assign({}, theme);
    Object.keys(theme).forEach(function (key) {
        // @var +- something
        if (theme[key].indexOf('ceil(') < 0)
            newTheme[key] = theme[key].replace(/\(?\@[a-z0-9]+(-[a-z0-9]*)* [\+\-\*] (.+)\w\)?/g, function (match) { return "calc(" + match + ")"; });
        // @var
        newTheme[key] = newTheme[key].replace(/\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?/g, function (match) {
            return newTheme[match.replace(/\@\{?/g, '').replace(/\}?/g, '')];
        });
    });
    // detect and replace nested vars
    var stringifiedTheme = JSON.stringify(newTheme);
    if (stringifiedTheme.indexOf('@') >= 0 &&
        JSON.stringify(theme) !== stringifiedTheme)
        return replaceLessVars(newTheme);
    return newTheme;
};
var parseTheme = function (theme) {
    Object.keys(theme).forEach(function (key) {
        // hsv()
        theme[key] = theme[key].replace(/hsv\(.+\)/g, function (match) {
            return tinycolor2_1.default(match).toRgbString();
        });
        // hsl()
        theme[key] = theme[key].replace(/hsl\(.+\)/g, function (match) {
            return tinycolor2_1.default(match).toRgbString();
        });
        // fade()
        theme[key] = theme[key].replace(/fade\(([^,]+),([^,]+)\)/g, function (match, color, alpha) {
            return tinycolor2_1.default(color)
                .setAlpha(parseInt(alpha) / 100)
                .toRgbString();
        });
        // tint()
        theme[key] = theme[key].replace(/tint\(([^,]+),([^,]+)\)/g, function (match, color, weight) {
            return tinycolor2_1.default(color)
                .lighten(parseInt(weight))
                .toRgbString();
        });
        // colorPalette
        theme[key] = theme[key].replace(/(color\()?\~\`colorPalette\(\'([^,]+)\',([^,]+)\)[ ]?\`\)?/g, function (match, stuff, color, index) {
            return colorPalette(color, parseInt(index));
        });
        // ceil()
        theme[key] = theme[key].replace('ceil', 'calc');
    });
    return theme;
};
exports.ThemeContext = React.createContext({});
exports.useTheme = function () { return React.useContext(exports.ThemeContext); };
exports.useFela = function () {
    var theme = React.useContext(exports.ThemeContext);
    var css = react_fela_1.useFela().css;
    // replacing @-vars & functions with values
    var parsedTheme = React.useMemo(function () { return parseTheme(replaceLessVars(theme)); }, [
        theme
    ]);
    return [css, parsedTheme];
};
exports.default = exports.ThemeContext.Provider;
//# sourceMappingURL=ThemeProvider.js.map