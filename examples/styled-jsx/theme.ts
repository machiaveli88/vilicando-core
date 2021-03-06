import tinycolor from "tinycolor2";
import { theme, themeController } from "vilicando-core";

export const colors = ["yellow", "green", "red", "blue", "magenta", "volcano"];

const themes = themeController({
  palette: {
    primary: { base: "#00bcd4" },
    secondary: { base: "#9c27b0" },
  },
  heading: { base: { color: "#00bcd4" } },
  shadow: ["rgba(255, 255, 255, 1)"],
  text: "rgba(0, 0, 0, 0.87)", // own prop!
});
colors.forEach((_color) => {
  const color = theme.palette[_color].base;
  const complement = tinycolor(color).complement().toRgbString();

  themes.set(_color, {
    palette: {
      primary: { base: color },
      secondary: { base: complement },
    },
    heading: { base: { color } },
    text: tinycolor(color).isLight()
      ? "rgba(0, 0, 0, 0.87)"
      : "rgba(255, 255, 255, 1)",
    shadow: [
      !tinycolor(color).isLight()
        ? "rgba(0, 0, 0, 0.87)"
        : "rgba(255, 255, 255, 1)",
    ],
  });
});

export const { useThemeContext, useTheme, ThemeProvider } = themes;
