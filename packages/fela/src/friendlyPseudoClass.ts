import friendlyPseudoClass from "fela-plugin-friendly-pseudo-class";
import { IStyle } from "fela";

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

export default friendlyPseudoClass;
