import { material } from "./palettes";

const {
  grey,
  blue,
  green,
  orange,
  red,
  yellow,
  deeporange
  // ...rest
} = material;

const boxShadowColor = [
  "rgba(0, 0, 0, .06)",
  "rgba(0, 0, 0, .09)",
  "rgba(0, 0, 0, .12)"
];

export type ITheme = typeof theme;

export const theme = {
  // Colors
  colors: {
    // colors
    blue: [blue[5], ...blue],
    green: [green[5], ...green],
    orange: [orange[5], ...orange],
    red: [red[5], ...red],
    yellow: [yellow[5], ...yellow],
    grey: ["#ffffff", ...grey],
    /* ...Object.keys(rest).reduce((acc, color) => {
      if (rest[color] && typeof rest[color] === 'object')
        acc[color] = [rest[color][5], ...rest[color]];

      return acc;
    }, {}), */

    // special
    primary: [deeporange[5], ...deeporange],
    secondary: [red[5], ...red],
    success: [green[5], ...green],
    info: [blue[5], ...blue],
    warning: [orange[5], ...orange],
    danger: [red[5], ...red]
  },

  // Spacing
  space: [0, "0.25rem", "0.5rem", "0.75rem", "1rem", "1.5rem"], // base 12

  // Font
  fontFamily: [
    '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  ],
  fontWeight: [200, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  fontSize: [
    "1rem",
    "0.75rem",
    "0.85rem",
    "1rem",
    "1.05rem",
    "1.125rem",
    "1.2rem",
    "1.4rem"
  ],

  // Shadows & Radius
  borderRadius: [0],
  boxShadow: [
    `0 0 12px ${boxShadowColor[0]}`,
    `0 0 12px ${boxShadowColor[1]}`,
    `0 0 12px ${boxShadowColor[2]}`
  ],
  boxShadowColor,

  breakpoints: ["480px", "576px", "768px", "992px", "1200px", "1600px"],

  // Antd
  layoutHeaderHeight: "56px",
  easeOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)"
};
export default theme;
