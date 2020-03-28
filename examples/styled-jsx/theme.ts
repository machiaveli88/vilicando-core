import tinycolor from "tinycolor2";
import { theme, themeController } from "vilicando-core";

export const colors = ["yellow", "green", "red", "blue", "magenta", "volcano"];

const themes = themeController({
  primary: { base: "#00bcd4" },
  secondary: { base: "#9c27b0" },
  heading: { color: "#00bcd4" },
  text: "rgba(0, 0, 0, 0.87)" as string,
  shadow: "rgba(255, 255, 255, 1)" as string,
});
colors.forEach((_color) => {
  const color = theme[_color].base;
  const complement = tinycolor(color).complement().toRgbString();

  themes.set(_color, {
    primary: { base: color },
    secondary: { base: complement },
    heading: { color },
    text: tinycolor(color).isLight()
      ? "rgba(0, 0, 0, 0.87)"
      : "rgba(255, 255, 255, 1)",
    shadow: !tinycolor(color).isLight()
      ? "rgba(0, 0, 0, 0.87)"
      : "rgba(255, 255, 255, 1)",
  });
});

export const { useThemeContext, useTheme, ThemeProvider } = themes;
