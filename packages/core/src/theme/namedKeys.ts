import namedKeys from 'fela-plugin-named-keys';
import { IStyle } from 'fela';
import theme from './theme.json';

const _parseInt = (value: string | number) =>
  typeof value === 'string' ? parseInt(value) : value;

const sizes = {
  extraLarge: _parseInt(theme.screen.xxl),
  huge: _parseInt(theme.screen.xl),
  large: _parseInt(theme.screen.lg),
  medium: _parseInt(theme.screen.md),
  small: _parseInt(theme.screen.sm),
  mini: _parseInt(theme.screen.xs),
  tiny: _parseInt(theme.screen.xxs)
};

export interface INamedKeys<T = IStyle> {
  ifHugeUp?: T;
  ifExtraLargeUp?: T;
  ifLargeUp?: T;
  ifMediumUp?: T;
  ifSmallUp?: T;
  ifExtraSmallUp?: T;
  ifMiniUp?: T;
  ifExtraLargeDown?: T;
  ifLargeDown?: T;
  ifMediumDown?: T;
  ifSmallDown?: T;
  ifExtraSmallDown?: T;
  ifMiniDown?: T;
  ifTinyDown?: T;
  ifHuge?: T;
  ifExtraLarge?: T;
  ifLarge?: T;
  ifMedium?: T;
  ifSmall?: T;
  ifExtraSmall?: T;
  ifMini?: T;
  ifTiny?: T;
  ifLandscape?: T;
  ifPortrait?: T;
}

export default () =>
  namedKeys({
    // Up (z.B. hugeUp: x >= huge)
    ifHugeUp: `@media only screen and (min-width: ${sizes.extraLarge}px)`,
    ifExtraLargeUp: `@media only screen and (min-width: ${sizes.huge}px)`,
    ifLargeUp: `@media only screen and (min-width: ${sizes.large}px)`,
    ifMediumUp: `@media only screen and (min-width: ${sizes.medium}px)`,
    ifSmallUp: `@media only screen and (min-width: ${sizes.small}px)`,
    ifExtraSmallUp: `@media only screen and (min-width: ${sizes.mini}px)`,
    ifMiniUp: `@media only screen and (min-width: ${sizes.tiny}px)`,
    // Down (z.B. hugeDown: x <= huge)
    ifExtraLargeDown: `@media only screen and (max-width: ${sizes.extraLarge -
      1}px)`,
    ifLargeDown: `@media only screen and (max-width: ${sizes.huge - 1}px)`,
    ifMediumDown: `@media only screen and (max-width: ${sizes.large - 1}px)`,
    ifSmallDown: `@media only screen and (max-width: ${sizes.medium - 1}px)`,
    ifExtraSmallDown: `@media only screen and (max-width: ${sizes.small -
      1}px)`,
    ifMiniDown: `@media only screen and (max-width: ${sizes.mini - 1}px)`,
    ifTinyDown: `@media only screen and (max-width: ${sizes.tiny - 1}px)`,
    // Exact
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
    ifMini: `@media only screen and (max-width: ${sizes.mini -
      1}px) and (min-width: ${sizes.tiny}px)`,
    ifTiny: `@media only screen and (max-width: ${sizes.tiny - 1}px)`,
    // Screen-orientation
    ifLandscape: '@media all and (orientation:landscape)',
    ifPortrait: '@media all and (orientation:landscape)'
  });
