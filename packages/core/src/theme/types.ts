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

  shadow: [string, string, string, string];

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
    color: string;
    size: [
      string | number,
      string | number,
      string | number,
      string | number,
      string | number,
      string | number
    ];
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

  primary: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  primaryBase: string;

  secondary: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  secondaryBase: string;

  grey: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  greyBase: string;

  blue: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  blueBase: string;

  purple: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  purpleBase: string;

  cyan: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  cyanBase: string;

  green: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  greenBase: string;

  magenta: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  magentaBase: string;

  pink: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  pinkBase: string;

  red: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  redBase: string;

  orange: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  orangeBase: string;

  volcano: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  volcanoBase: string;

  yellow: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  yellowBase: string;

  geekblue: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  geekblueBase: string;

  lime: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  limeBase: string;

  gold: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  goldBase: string;

  black: string;
  white: string;

  [property: string]: any;
}
