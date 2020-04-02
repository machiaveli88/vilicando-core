import { TextStyle, ViewStyle, ShadowStyleIOS, FlexStyle } from "react-native";

// todo: TForm: { border, shadow, ... } für input, select, button, ...?
// button.base, .danger, ...?

export type TBorder = {
  borderColor?: ViewStyle["borderColor"];
  borderRadius?: ViewStyle["borderRadius"];
  borderStyle?: ViewStyle["borderStyle"];
  borderWidth?: ViewStyle["borderWidth"];
  toString?: () => string;
  toObject?: () => Pick<
    ViewStyle,
    "borderWidth" | "borderStyle" | "borderColor" | "borderRadius"
  >;
};

export type TColor = {
  "1"?: string;
  "2"?: string;
  "3"?: string;
  "4"?: string;
  "5"?: string;
  "6"?: string;
  "7"?: string;
  "8"?: string;
  "9"?: string;
  "10"?: string;
  base?: string;
};

export type TFontDecoration = {
  textDecorationLine?: TextStyle["textDecorationLine"];
  textDecorationStyle?: TextStyle["textDecorationStyle"];
  textDecorationColor?: TextStyle["textDecorationColor"];
  toString?: () => string;
  toObject?: () => Pick<
    TextStyle,
    "textDecorationLine" | "textDecorationStyle" | "textDecorationColor"
  >;
};
export type TFont = {
  color?: TextStyle["color"];
  secondary?: TextStyle["color"];
  inverse?: TextStyle["color"];
  fontFamily?: TextStyle["fontFamily"];
  textDecoration?: TFontDecoration;
  textAlign?: TextStyle["textAlign"];
  fontStyle?: TextStyle["fontStyle"];
  fontWeight?: TextStyle["fontWeight"];
  fontSize?: TextStyle["fontSize"];
  letterSpacing?: TextStyle["letterSpacing"];
  lineHeight?: TextStyle["lineHeight"]; // todo: bei withAntd kein px hinzufügen!
  textTransform?: TextStyle["textTransform"];
  toObject?: () => Pick<
    TextStyle,
    | "color"
    | "fontFamily"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "textAlign"
    | "textDecorationLine"
    | "textDecorationStyle"
    | "textDecorationColor"
    | "letterSpacing"
    | "lineHeight"
    | "textTransform"
  >;
};

export type TInput = {
  height?: number;
  border?: TBorder;
  font?: TFont;
};

export type TTextShadow = {
  offset?: {
    x: TextStyle["textShadowOffset"]["width"];
    y: TextStyle["textShadowOffset"]["height"];
  };
  blur?: TextStyle["textShadowRadius"];
  color?: TextStyle["textShadowColor"];
  toString?: () => string;
  toObject?: () => Pick<
    TextStyle,
    "textShadowColor" | "textShadowOffset" | "textShadowRadius"
  >;
};
export type TBoxShadow = {
  offset?: {
    x: ShadowStyleIOS["shadowOffset"]["width"];
    y: ShadowStyleIOS["shadowOffset"]["height"];
  };
  blur?: ShadowStyleIOS["shadowRadius"];
  color?: ShadowStyleIOS["shadowColor"];
  spread?: number;
  inset?: boolean;
  opacity?: ShadowStyleIOS["shadowOpacity"];
  toString?: () => string;
  toObject?: () => ShadowStyleIOS;
};

export interface ITheme {
  app?: {
    background?: string;
    foreground?: string;
  };

  screen?: {
    lg?: FlexStyle["width"];
    md?: FlexStyle["width"];
    sm?: FlexStyle["width"];
    xl?: FlexStyle["width"];
    xs?: FlexStyle["width"];
    xxl?: FlexStyle["width"];
    xxs?: FlexStyle["width"];
  };

  spacing?: {
    lg?: FlexStyle["padding"];
    md?: FlexStyle["padding"];
    sm?: FlexStyle["padding"];
    xl?: FlexStyle["padding"];
    xs?: FlexStyle["padding"];
    xxl?: FlexStyle["padding"];
    xxs?: FlexStyle["padding"];
  };

  boxShadow?: { base?: TBoxShadow; [k: string]: TBoxShadow };
  textShadow?: { base?: TTextShadow; [k: string]: TTextShadow };
  border?: { base?: TBorder; [k: string]: TBorder };
  font?: {
    base?: TFont;
    lg?: TFont;
    md?: TFont;
    sm?: TFont;
    [k: string]: TFont;
  };
  heading?: {
    base?: TFont;
    1?: TFont;
    2?: TFont;
    3?: TFont;
    4?: TFont;
    5?: TFont;
    6?: TFont;
    [k: string]: TFont;
  };
  link?: {
    base?: TFont;
    hover?: TFont;
    focus?: TFont;
    active?: TFont;
    [k: string]: TFont;
  };

  input?: {
    base?: TInput;
    lg?: TInput;
    md?: TInput;
    sm?: TInput;
    [k: string]: TInput;
  };

  ease?: {
    in?: string;
    out?: string;
    inOut?: string;
  };

  black?: string;
  white?: string;

  primary?: TColor;
  secondary?: TColor;
  success?: TColor;
  error?: TColor;
  info?: TColor;
  warning?: TColor;
  grey?: TColor;
  blue?: TColor;
  purple?: TColor;
  cyan?: TColor;
  green?: TColor;
  magenta?: TColor;
  pink?: TColor;
  red?: TColor;
  orange?: TColor;
  volcano?: TColor;
  yellow?: TColor;
  geekblue?: TColor;
  lime?: TColor;
  gold?: TColor;
}
