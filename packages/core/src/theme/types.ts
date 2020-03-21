export interface ITheme {
  app?: {
    background?: string;
    foreground?: string;
    logo?: {
      background?: string;
    };
    progress?: {
      color?: string;
      size?: string;
    };
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

  shadow?: {
    '1'?: { down?: string; left?: string; right?: string; up?: string };
    '2'?: string;
  };

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

  primary?: {
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

  secondary?: {
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

  grey?: {
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

  blue?: {
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

  purple?: {
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

  cyan?: {
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

  green?: {
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

  magenta?: {
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

  pink?: {
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

  red?: {
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

  orange?: {
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

  volcano?: {
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

  yellow?: {
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

  geekblue?: {
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

  lime?: {
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

  gold?: {
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
}
