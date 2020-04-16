import { TextStyle, ViewStyle, ShadowStyleIOS, FlexStyle } from "react-native";

type DeepRequired<T> = T extends
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null
  | Function
  | Date
  | Error
  | RegExp
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U>
  ? Set<DeepRequired<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepRequired<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepRequired<U>>
  : T extends Promise<infer U>
  ? Promise<DeepRequired<U>>
  : T extends {}
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : NonNullable<T>;

export type TThemeIn<T = {}> = ITheme & T;
export type TThemeOut<T = {}> = DeepRequired<ITheme & T>;

export type TBorder = {
  borderWidth?: ViewStyle["borderWidth"];
  borderStyle?: ViewStyle["borderStyle"];
  borderColor?: ViewStyle["borderColor"];
  borderRadius?: ViewStyle["borderRadius"];
};

type TColor = {
  base?: string;
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
  [k: string]: string;
};
type TPalette = {
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

  [k: string]: TColor;
};

export type TFont = {
  color?: TextStyle["color"];
  fontFamily?: TextStyle["fontFamily"];
  fontSize?: TextStyle["fontSize"];
  fontStyle?: TextStyle["fontStyle"];
  fontWeight?: TextStyle["fontWeight"];
  textAlign?: TextStyle["textAlign"];
  textDecorationLine?: TextStyle["textDecorationLine"];
  textDecorationStyle?: TextStyle["textDecorationStyle"];
  textDecorationColor?: TextStyle["textDecorationColor"];
  letterSpacing?: TextStyle["letterSpacing"];
  lineHeight?: TextStyle["lineHeight"];
  textTransform?: TextStyle["textTransform"];
};

// export type TInput = {
//   height?: number;
//   border?: TBorder;
//   // todo: spacing?
//   // todo: boxShadow?
//   // todo: textShadow?
//   font?: TFont; // todo: nested beachten (sogar doppelt, wegen fontDeco)
// };

export type TTextShadow = {
  textShadowOffset?: TextStyle["textShadowOffset"];
  textShadowRadius?: TextStyle["textShadowRadius"];
  textShadowColor?: TextStyle["textShadowColor"];
};
export type TBoxShadow = {
  shadowColor?: ShadowStyleIOS["shadowColor"];
  shadowOffset?: ShadowStyleIOS["shadowOffset"];
  shadowOpacity?: ShadowStyleIOS["shadowOpacity"];
  shadowRadius?: ShadowStyleIOS["shadowRadius"];
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

  boxShadow?: {
    base?: TBoxShadow;
    1?: TBoxShadow;
    2?: TBoxShadow;
    3?: TBoxShadow;
    // todo: elevation??? für android, siehe /Users/machiaveli88/Server/ex1f/packages/ui/src/shadow.ts
    [k: string]: TBoxShadow;
  };
  textShadow?: { base?: TTextShadow; [k: string]: TTextShadow };
  border?: { base?: TBorder; [k: string]: TBorder };
  font?: {
    base?: TFont;
    lg?: TFont;
    md?: TFont;
    sm?: TFont;
    [k: string]: TFont;
  };

  /* HTML-Elements */
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
  // input?: {
  //   base?: TInput;
  //   hover?: TInput;
  //   focus?: TInput;
  //   active?: TInput;
  //   [k: string]: TInput;
  // }
  // btn?: {
  //   base?: TInput;
  //   hover?: TInput;
  //   focus?: TInput;
  //   active?: TInput;
  //   [k: string]: TInput;
  // }

  ease?: {
    in?: string;
    out?: string;
    inOut?: string;
  };

  black?: string;
  white?: string;
  palette?: TPalette;
}
