// import friendlyPseudoClass from 'fela-plugin-friendly-pseudo-class'; // todo: wait for PR https://github.com/robinweser/fela/pull/747 , then remove function below
import { IStyle } from 'fela';
import isPlainObject from 'isobject';

export interface IFriendlyPseudoClass<T = IStyle> {
  /**
   * Pseudo-elements
   * https://developer.mozilla.org/en-US/docs/Web/CSS/pseudo-classes
   */
  onActive?: T;
  onAny?: T;
  onChecked?: T;
  onDefault?: T;
  onDisabled?: T;
  onEmpty?: T;
  onEnabled?: T;
  onFirst?: T;
  onFirstChild?: T;
  onFirstOfType?: T;
  onFullscreen?: T;
  onFocus?: T;
  onHover?: T;
  onIndeterminate?: T;
  onInRange?: T;
  onInvalid?: T;
  onLastChild?: T;
  onLastOfType?: T;
  onLeft?: T;
  onLink?: T;
  onOnlyChild?: T;
  onOnlyOfType?: T;
  onOptional?: T;
  onOutOfRange?: T;
  onReadOnly?: T;
  onReadWrite?: T;
  onRequired?: T;
  onRight?: T;
  onRoot?: T;
  onScope?: T;
  onTarget?: T;
  onValid?: T;
  onVisited?: T;

  /**
   * Pseudo-elements
   * https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements
   */
  onAfter?: T;
  onBefore?: T;
  onFirstLetter?: T;
  onFirstLine?: T;
  onSelection?: T;
  onBackdrop?: T;
  onPlaceholder?: T;
  onMarker?: T;
  onSpellingError?: T;
  onGrammarError?: T;
}

// todo: remove below, if PR is merged!

const regex = new RegExp('^on([A-Z])');
const pseudoElements = [
  'after',
  'before',
  'first-letter',
  'first-line',
  'selection',
  'backdrop',
  'placeholder',
  'marker',
  'spelling-error',
  'grammar-error'
];

function friendlyPseudoClass(style: Object): Object {
  for (const property in style) {
    const value = style[property];

    if (isPlainObject(value)) {
      const resolvedValue = friendlyPseudoClass(value);

      if (regex.test(property)) {
        const pseudo = property
          .replace(/([A-Z])/g, (match: string) => '-' + match.toLowerCase())
          .replace(
            /^on-(.*)/g,
            (match, p1: string) =>
              `${pseudoElements.includes(p1) ? '::' : ':'}${p1}`
          );
        console.log(pseudo);

        style[pseudo] = resolvedValue;
        delete style[property];
      } else {
        style[property] = resolvedValue;
      }
    }
  }

  return style;
}

export default () => friendlyPseudoClass;
