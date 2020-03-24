type TBorder = {
  color?: string;
  radius?: string;
  style?: string;
  width?: string;
};
type TColor = {
  '1'?: string;
  '2'?: string;
  '3'?: string;
  '4'?: string;
  '5'?: string;
  '6'?: string;
  '7'?: string;
  '8'?: string;
  '9'?: string;
  '10'?: string;
  base?: string;
};

export interface ITheme {
  app?: {
    background?: string;
    foreground?: string;
  };

  screen?: {
    lg?: string;
    md?: string;
    sm?: string;
    xl?: string;
    xs?: string;
    xxl?: string;
    xxs?: string;
  };

  spacing?: {
    lg?: string;
    md?: string;
    sm?: string;
    xl?: string;
    xs?: string;
    xxl?: string;
    xxs?: string;
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
      lg?: string;
      md?: string;
      sm?: string;
    };
  };

  heading?: {
    '1'?: { size?: string };
    '2'?: { size?: string };
    '3'?: { size?: string };
    '4'?: { size?: string };
    '5'?: { size?: string };
    '6'?: { size?: string };
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
