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
Object.defineProperty(exports, "__esModule", { value: true });
var fuse_box_1 = require("fuse-box");
var theme_1 = require("./theme");
var getColor = function (name) {
    var obj = {};
    theme_1.default.colors[name].forEach(function (color, i) {
        if (i)
            obj[name + "-" + i] = color;
    });
    return obj;
};
exports.default = (function (paths) {
    return fuse_box_1.LESSPlugin({
        paths: paths,
        javascriptEnabled: true,
        modifyVars: __assign({}, getColor('blue'), getColor('green'), getColor('orange'), getColor('red'), getColor('yellow'), getColor('grey'), getColor('primary'), { 'info-color': theme_1.default.colors.blue[2], 'success-color': theme_1.default.colors.green[0], 'error-color': theme_1.default.colors.red[0], 'warning-color': theme_1.default.colors.orange[0], white: theme_1.default.colors.grey[0], black: theme_1.default.colors.grey[10], 'font-family': theme_1.default.fontFamily[0], 'font-size-base': theme_1.default.fontSize[0], 'font-size-lg': theme_1.default.fontSize[4], 'font-size-sm': theme_1.default.fontSize[1], 'shadow-color1': theme_1.default.boxShadowColor[0], 'shadow-color2': theme_1.default.boxShadowColor[1], 'shadow-1': theme_1.default.boxShadow[0], 'shadow-2': theme_1.default.boxShadow[0], 'border-radius-base': theme_1.default.borderRadius[0], 'border-radius-sm': theme_1.default.borderRadius[0], 'layout-header-height': theme_1.default.layoutHeaderHeight, 'ease-out': theme_1.default.easeOut, 'ease-in-out': theme_1.default.easeInOut, 'screen-xs': theme_1.default.breakpoints[0], 'screen-sm': theme_1.default.breakpoints[1], 'screen-md': theme_1.default.breakpoints[2], 'screen-lg': theme_1.default.breakpoints[3], 'screen-xl': theme_1.default.breakpoints[4], 'screen-xxl': theme_1.default.breakpoints[5] })
    });
});
