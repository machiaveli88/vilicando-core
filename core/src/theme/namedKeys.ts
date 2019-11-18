import namedKeys from 'fela-plugin-named-keys';
import { IStyle } from 'fela';
import theme from './theme.json';

const _parseInt = (value: string | number) =>
  typeof value === 'string' ? parseInt(value) : value;

const sizes = {
  extraLarge: _parseInt(theme.screenXxl),
  huge: _parseInt(theme.screenXl),
  large: _parseInt(theme.screenLg),
  medium: _parseInt(theme.screenMd),
  small: _parseInt(theme.screenSm),
  mini: _parseInt(theme.screenXs)
};

export interface INamedKeys<T = IStyle> {
  ifHugeUp?: T;
  ifExtraLargeUp?: T;
  ifLargeUp?: T;
  ifMediumUp?: T;
  ifSmallUp?: T;
  ifExtraSmallUp?: T;
  ifExtraLargeDown?: T;
  ifLargeDown?: T;
  ifMediumDown?: T;
  ifSmallDown?: T;
  ifExtraSmallDown?: T;
  ifMiniDown?: T;
  ifHuge?: T;
  ifExtraLarge?: T;
  ifLarge?: T;
  ifMedium?: T;
  ifSmall?: T;
  ifExtraSmall?: T;
  ifMini?: T;
}

export default () =>
  namedKeys({
    // From (z.B. hugeUp: x >= huge)
    ifHugeUp: `@media only screen and (min-width: ${sizes.extraLarge}px)`,
    ifExtraLargeUp: `@media only screen and (min-width: ${sizes.huge}px)`,
    ifLargeUp: `@media only screen and (min-width: ${sizes.large}px)`,
    ifMediumUp: `@media only screen and (min-width: ${sizes.medium}px)`,
    ifSmallUp: `@media only screen and (min-width: ${sizes.small}px)`,
    ifExtraSmallUp: `@media only screen and (min-width: ${sizes.mini}px)`,
    // To (z.B. hugeDown: x <= huge)
    ifExtraLargeDown: `@media only screen and (max-width: ${sizes.extraLarge -
      1}px)`,
    ifLargeDown: `@media only screen and (max-width: ${sizes.huge - 1}px)`,
    ifMediumDown: `@media only screen and (max-width: ${sizes.large - 1}px)`,
    ifSmallDown: `@media only screen and (max-width: ${sizes.medium - 1}px)`,
    ifExtraSmallDown: `@media only screen and (max-width: ${sizes.small -
      1}px)`,
    ifMiniDown: `@media only screen and (max-width: ${sizes.mini - 1}px)`,
    // On
    ifHuge: `@media only screen and (min-width: ${sizes.extraLarge}px)`,
    ifExtraLarge: `@media only screen and (max-width: ${sizes.extraLarge -
      1}px) and (min-width: ${sizes.huge}px)`,
    ifLarge: `@media only screen and (max-width: ${sizes.huge -
      1}px) and (min-width: ${sizes.large}px)`,
    ifMedium: `@media only screen and (max-width: ${sizes.large -
      1}px) and (min-width: ${sizes.medium}px)`,
    ifSmall: `@media only screen and (max-width: ${sizes.medium -
      1}px) and (min-width: ${sizes.small}px)`,
    ifExtraSmall: `@media only screen and (max-width: ${sizes.small -
      1}px) and (min-width: ${sizes.mini}px)`,
    ifMini: `@media only screen and (max-width: ${sizes.mini - 1}px)`
  });
