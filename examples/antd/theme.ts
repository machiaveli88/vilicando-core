import { themeController } from "vilicando-core";
import theme from "./theme.json";

export const { useTheme, ThemeProvider } = themeController(theme);
