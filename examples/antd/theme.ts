import { themeController } from "vilicando-core";
import { theme } from "./config.json";

export const { useTheme, ThemeProvider } = themeController(theme);
