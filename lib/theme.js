"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var palettes_1 = require("./palettes");
var grey = palettes_1.material.grey, blue = palettes_1.material.blue, green = palettes_1.material.green, orange = palettes_1.material.orange, red = palettes_1.material.red, yellow = palettes_1.material.yellow, deeporange = palettes_1.material.deeporange;
var boxShadowColor = [
    'rgba(0, 0, 0, .06)',
    'rgba(0, 0, 0, .09)',
    'rgba(0, 0, 0, .12)'
];
exports.Theme = {
    colors: {
        blue: [blue[5]].concat(blue),
        green: [green[5]].concat(green),
        orange: [orange[5]].concat(orange),
        red: [red[5]].concat(red),
        yellow: [yellow[5]].concat(yellow),
        grey: ['#ffffff'].concat(grey),
        primary: [deeporange[5]].concat(deeporange),
        secondary: [red[5]].concat(red),
        success: [green[5]].concat(green),
        info: [blue[5]].concat(blue),
        warning: [orange[5]].concat(orange),
        danger: [red[5]].concat(red)
    },
    space: [0, '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem'],
    fontFamily: [
        '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    ],
    fontWeight: [200, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    fontSize: [
        '1rem',
        '0.75rem',
        '0.85rem',
        '1rem',
        '1.05rem',
        '1.125rem',
        '1.2rem',
        '1.4rem'
    ],
    borderRadius: [0],
    boxShadow: [
        "0 0 12px " + boxShadowColor[0],
        "0 0 12px " + boxShadowColor[1],
        "0 0 12px " + boxShadowColor[2]
    ],
    boxShadowColor: boxShadowColor,
    breakpoints: ['480px', '576px', '768px', '992px', '1200px', '1600px'],
    layoutHeaderHeight: '56px',
    easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
};
exports.default = exports.Theme;
