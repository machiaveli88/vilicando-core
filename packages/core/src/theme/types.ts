export interface ITheme {
  screen: {
    lg: string | number;
    md: string | number;
    sm: string | number;
    xl: string | number;
    xs: string | number;
    xxl: string | number;
    xxs: string | number;
  };

  spacing: {
    lg: string | number;
    md: string | number;
    sm: string | number;
    xl: string | number;
    xs: string | number;
    xxl: string | number;
    xxs: string | number;
  };

  shadow: {
    1: { down: string; left: string; right: string; up: string };
    2: string;
  };

  ease: {
    in: string;
    out: string;
    inOut: string;
  };

  font: {
    family: string;
    size: {
      lg: string | number;
      md: string | number;
      sm: string | number;
    };
  };

  heading: {
    1: { size: string | number };
    2: { size: string | number };
    3: { size: string | number };
    4: { size: string | number };
    5: { size: string | number };
    6: { size: string | number };
    color: string;
  };

  link: {
    color: string;
    decoration: string;
    hover: {
      color: string;
      decoration: string;
    };
    active: {
      color: string;
      decoration: string;
    };
  };

  primary: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  secondary: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  grey: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  blue: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  purple: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  cyan: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  green: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  magenta: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  pink: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  red: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  orange: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  volcano: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  yellow: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  geekblue: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  lime: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  gold: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    base: string;
  };

  black: string;
  white: string;
}
