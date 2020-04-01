type TBorder = {
  color?: string;
  radius?: string | number;
  style?: string;
  width?: string | number;
};
type TColor = {
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

export interface ITheme {
  app?: {
    background?: string;
    foreground?: string;
  };

  screen?: {
    lg?: string | number;
    md?: string | number;
    sm?: string | number;
    xl?: string | number;
    xs?: string | number;
    xxl?: string | number;
    xxs?: string | number;
  };

  spacing?: {
    lg?: string | number;
    md?: string | number;
    sm?: string | number;
    xl?: string | number;
    xs?: string | number;
    xxl?: string | number;
    xxs?: string | number;
  };

  shadow?: Array<string>;

  border?: TBorder;

  ease?: {
    in?: string;
    out?: string;
    inOut?: string;
  };

  font?: {
    family?: string;
    size?: {
      lg?: string | number;
      md?: string | number;
      sm?: string | number;
    };
  };

  heading?: {
    "1"?: { size?: string | number };
    "2"?: { size?: string | number };
    "3"?: { size?: string | number };
    "4"?: { size?: string | number };
    "5"?: { size?: string | number };
    "6"?: { size?: string | number };
    color?: string;
  };

  link?: {
    color?: string;
    decoration?: string;
    hover?: {
      color?: string;
      decoration?: string;
    };
    active?: {
      color?: string;
      decoration?: string;
    };
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
