"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fela_1 = require("react-fela");
var fela_1 = require("fela");
var theme_1 = require("../theme");
var renderer = fela_1.createRenderer();
var pulseRing = function () { return ({
    '0%': {
        transform: 'scale(.33)'
    },
    '80%, 100%': {
        opacity: 0
    }
}); };
renderer.renderKeyframe(pulseRing, {});
var pulseDot = function () { return ({
    '0%': {
        transform: 'scale(.8)'
    },
    '50%': {
        transform: 'scale(1)'
    },
    '100%': {
        transform: 'scale(.8)'
    }
}); };
renderer.renderKeyframe(pulseDot, {});
function ComponentLoader(_a) {
    var _b = _a.size, size = _b === void 0 ? 250 : _b, logo = _a.logo;
    var _c = theme_1.useFela(), css = _c[0], theme = _c[1];
    return (React.createElement(react_fela_1.RendererProvider, { renderer: renderer },
        React.createElement("div", { className: css({
                bottom: 0,
                left: 0,
                margin: 0,
                position: 'fixed',
                pointerEvents: 'none',
                right: 0,
                top: 0,
                background: "linear-gradient(135deg, " + theme.colors.primary[7] + " 0%," + theme.colors.primary[9] + " 100%)",
                zIndex: 2000
            }) },
            React.createElement("div", { className: css({
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    height: size * 3,
                    width: size * 3,
                    display: 'block',
                    marginLeft: -size * 1.5,
                    marginTop: -size * 1.5,
                    borderRadius: size * 1.5,
                    backgroundColor: theme.colors.primary[7],
                    animation: "k1 1.25s " + theme.easeOut + " infinite"
                }) }),
            React.createElement("div", { className: css({
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    height: size,
                    width: size,
                    display: 'block',
                    marginLeft: -size * 0.5,
                    marginTop: -size * 0.5,
                    backgroundColor: theme.colors.grey[0],
                    borderRadius: size * 0.5,
                    boxShadow: theme.boxShadow[1],
                    animation: "k2 1.25s " + theme.easeInOut + " -.4s infinite"
                }) },
                React.createElement("div", { className: css({
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        display: 'block',
                        '> img': {
                            width: size,
                            height: size
                        }
                    }) }, !!logo && React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }))),
            React.createElement("div", { className: css({
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    display: 'block',
                    color: 'white',
                    fontFamily: theme.fontFamily[0],
                    fontSize: theme.fontSize[3],
                    padding: theme.space[5]
                }) },
                React.createElement("b", null, "Tipp:"),
                " Trask ist einfach genial!"))));
}
ComponentLoader.displayName = 'ComponentLoader';
exports.default = ComponentLoader;
