import * as React from 'react';
import tinycolor from 'tinycolor2';
import { camelCase } from 'lodash';
import { IRenderer } from 'fela';
import { useFela as useFelaBase } from 'react-fela';

// todo: antd-Variablen aktualisieren (z.B. "Added less variables @typography-title-margin-top, @typography-title-margin-bottom. #18746" in v3.24.0)

export interface ITheme {
  alertErrorBgColor: string;
  alertErrorBorderColor: string;
  alertErrorIconColor: string;
  alertInfoBgColor: string;
  alertInfoBorderColor: string;
  alertInfoIconColor: string;
  alertSuccessBgColor: string;
  alertSuccessBorderColor: string;
  alertSuccessIconColor: string;
  alertWarningBgColor: string;
  alertWarningBorderColor: string;
  alertWarningIconColor: string;
  animationDurationBase: string;
  animationDurationFast: string;
  animationDurationSlow: string;
  antPrefix: string;
  avatarBg: string;
  avatarBorderRadius: number | string;
  avatarColor: string;
  avatarFontSizeBase: string;
  avatarFontSizeLg: string;
  avatarFontSizeSm: string;
  avatarSizeBase: string;
  avatarSizeLg: string;
  avatarSizeSm: string;
  backTopBg: string;
  backTopColor: string;
  backTopHoverBg: string;
  backgroundColorBase: string;
  backgroundColorLight: string;
  badgeDotSize: string;
  badgeFontSize: string;
  badgeFontWeight: string;
  badgeHeight: string;
  badgeStatusSize: string;
  badgeTextColor: string;
  black: string;
  blue1: string;
  blue2: string;
  blue3: string;
  blue4: string;
  blue5: string;
  blue6: string;
  blue7: string;
  blue8: string;
  blue9: string;
  blue10: string;
  blueColor: string;
  bodyBackground: string;
  borderColorBase: string;
  borderColorInverse: string;
  borderColorSplit: string;
  borderRadiusBase: number | string;
  borderRadiusSm: number | string;
  borderStyleBase: string;
  borderWidthBase: string;
  boxShadowBase: string;
  breadcrumbBaseColor: string;
  breadcrumbFontSize: string;
  breadcrumbIconFontSize: string;
  breadcrumbLastItemColor: string;
  breadcrumbLinkColor: string;
  breadcrumbLinkColorHover: string;
  breadcrumbSeparatorColor: string;
  breadcrumbSeparatorMargin: string;
  btnBorderRadiusBase: number | string;
  btnBorderRadiusSm: number | string;
  btnBorderStyle: string;
  btnBorderWidth: string;
  btnCircleSize: string;
  btnCircleSizeLg: string;
  btnCircleSizeSm: string;
  btnDangerBg: string;
  btnDangerBorder: string;
  btnDangerColor: string;
  btnDefaultBg: string;
  btnDefaultBorder: string;
  btnDefaultColor: string;
  btnDisableBg: string;
  btnDisableBorder: string;
  btnDisableColor: string;
  btnFontSizeLg: string;
  btnFontSizeSm: string;
  btnFontWeight: number | string;
  btnGroupBorder: string;
  btnHeightBase: string;
  btnHeightLg: string;
  btnHeightSm: string;
  btnPaddingBase: string;
  btnPaddingLg: string;
  btnPaddingSm: string;
  btnPrimaryBg: string;
  btnPrimaryColor: string;
  btnPrimaryShadow: string;
  btnShadow: string;
  btnTextShadow: string;
  cardActionsBackground: string;
  cardBackground: string;
  cardHeadBackground: string;
  cardHeadColor: string;
  cardHeadPadding: string;
  cardInnerHeadPadding: string;
  cardPaddingBase: string;
  cardRadius: number | string;
  cardShadow: string;
  carouselDotActiveWidth: string;
  carouselDotHeight: string;
  carouselDotWidth: string;
  checkboxBorderWidth: string;
  checkboxCheckColor: string;
  checkboxColor: string;
  checkboxSize: string;
  codeFamily: string;
  collapseContentBg: string;
  collapseContentPadding: string;
  collapseHeaderBg: string;
  collapseHeaderPadding: string;
  collapseHeaderPaddingExtra: string;
  collapsePanelBorderRadius: number | string;
  commentActionColor: string;
  commentActionHoverColor: string;
  commentAuthorNameColor: string;
  commentAuthorTimeColor: string;
  commentFontSizeBase: string;
  commentFontSizeSm: string;
  commentNestIndent: string;
  commentPaddingBase: string;
  componentBackground: string;
  controlPaddingHorizontal: string;
  controlPaddingHorizontalSm: string;
  cyan1: string;
  cyan2: string;
  cyan3: string;
  cyan4: string;
  cyan5: string;
  cyan6: string;
  cyan7: string;
  cyan8: string;
  cyan9: string;
  cyan10: string;
  cyanColor: string;
  disabledBg: string;
  disabledColor: string;
  disabledColorDark: string;
  drawerBodyPadding: string;
  drawerHeaderPadding: string;
  dropdownFontSize: string;
  dropdownLineHeight: string;
  dropdownSelectedColor: string;
  dropdownVerticalPadding: string;
  easeBaseIn: string;
  easeBaseOut: string;
  easeIn: string;
  easeInBack: string;
  easeInCirc: string;
  easeInOut: string;
  easeInOutBack: string;
  easeInOutCirc: string;
  easeInOutQuint: string;
  easeInQuint: string;
  easeOut: string;
  easeOutBack: string;
  easeOutCirc: string;
  easeOutQuint: string;
  emptyFontSize: string;
  errorColor: string;
  fontFamily: string;
  fontFeatureSettingsBase: string;
  fontSizeBase: string;
  fontSizeLg: string;
  fontSizeSm: string;
  fontVariantBase: string;
  formErrorInputBg: string;
  formItemMarginBottom: string;
  formItemTrailingColon: string;
  formVerticalLabelMargin: number | string;
  formVerticalLabelPadding: string;
  formWarningInputBg: string;
  geekblue1: string;
  geekblue2: string;
  geekblue3: string;
  geekblue4: string;
  geekblue5: string;
  geekblue6: string;
  geekblue7: string;
  geekblue8: string;
  geekblue9: string;
  geekblue10: string;
  geekblueColor: string;
  gold1: string;
  gold2: string;
  gold3: string;
  gold4: string;
  gold5: string;
  gold6: string;
  gold7: string;
  gold8: string;
  gold9: string;
  gold10: string;
  goldColor: string;
  green1: string;
  green2: string;
  green3: string;
  green4: string;
  green5: string;
  green6: string;
  green7: string;
  green8: string;
  green9: string;
  green10: string;
  greenColor: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  grey6: string;
  grey7: string;
  grey8: string;
  grey9: string;
  grey10: string;
  greyColor: string;
  gridColumns: number | string;
  gridGutterWidth: number | string;
  heading1Size: string;
  heading2Size: string;
  heading3Size: string;
  heading4Size: string;
  headingColor: string;
  headingColorDark: string;
  highlightColor: string;
  htmlSelector: string;
  iconColor: string;
  iconColorHover: string;
  iconfontCssPrefix: string;
  infoColor: string;
  inputAddonBg: string;
  inputBg: string;
  inputBorderColor: string;
  inputColor: string;
  inputDisabledBg: string;
  inputHeightBase: string;
  inputHeightLg: string;
  inputHeightSm: string;
  inputHoverBorderColor: string;
  inputNumberHandlerActiveBg: string;
  inputOutlineOffset: string;
  inputPaddingHorizontal: string;
  inputPaddingHorizontalBase: string;
  inputPaddingHorizontalLg: string;
  inputPaddingHorizontalSm: string;
  inputPaddingVerticalBase: string;
  inputPaddingVerticalLg: string;
  inputPaddingVerticalSm: string;
  inputPlaceholderColor: string;
  itemActiveBg: string;
  itemHoverBg: string;
  labelColor: string;
  labelRequiredColor: string;
  layoutBodyBackground: string;
  layoutFooterBackground: string;
  layoutFooterPadding: string;
  layoutHeaderBackground: string;
  layoutHeaderHeight: string;
  layoutHeaderPadding: string;
  layoutSiderBackground: string;
  layoutSiderBackgroundLight: string;
  layoutTriggerBackground: string;
  layoutTriggerBackgroundLight: string;
  layoutTriggerColor: string;
  layoutTriggerColorLight: string;
  layoutTriggerHeight: string;
  layoutZeroTriggerHeight: string;
  layoutZeroTriggerWidth: string;
  lime1: string;
  lime2: string;
  lime3: string;
  lime4: string;
  lime5: string;
  lime6: string;
  lime7: string;
  lime8: string;
  lime9: string;
  lime10: string;
  limeColor: string;
  lineHeightBase: number | string;
  linkActiveColor: string;
  linkColor: string;
  linkDecoration: string;
  linkHoverColor: string;
  linkHoverDecoration: string;
  listEmptyTextPadding: string;
  listFooterBackground: string;
  listHeaderBackground: string;
  listItemMetaAvatarMarginRight: string;
  listItemMetaMarginBottom: string;
  listItemMetaTitleMarginBottom: string;
  listItemPadding: string;
  magenta1: string;
  magenta2: string;
  magenta3: string;
  magenta4: string;
  magenta5: string;
  magenta6: string;
  magenta7: string;
  magenta8: string;
  magenta9: string;
  magenta10: string;
  magentaColor: string;
  menuBg: string;
  menuCollapsedWidth: string;
  menuDarkArrowColor: string;
  menuDarkBg: string;
  menuDarkColor: string;
  menuDarkHighlightColor: string;
  menuDarkItemActiveBg: string;
  menuDarkSubmenuBg: string;
  menuHighlightColor: string;
  menuInlineToplevelItemHeight: string;
  menuItemActiveBg: string;
  menuItemActiveBorderWidth: string;
  menuItemColor: string;
  menuItemGroupTitleColor: string;
  menuItemHeight: string;
  menuPopupBg: string;
  messageNoticeContentPadding: string;
  modalBodyPadding: string;
  modalFooterBg: string;
  modalHeaderBg: string;
  modalMaskBg: string;
  normalColor: string;
  orange1: string;
  orange2: string;
  orange3: string;
  orange4: string;
  orange5: string;
  orange6: string;
  orange7: string;
  orange8: string;
  orange9: string;
  orangeColor: string;
  outlineBlurSize: number | string;
  outlineColor: string;
  outlineWidth: string;
  paddingXl: string;
  paddingLg: string;
  paddingMd: string;
  paddingSm: string;
  paddingXs: string;
  pageHeaderPaddingHorizontal: string;
  pageHeaderPaddingVertical: string;
  paginationFontFamily: string;
  paginationFontWeightActive: number | string;
  paginationItemBgActive: string;
  paginationItemSize: string;
  paginationItemSizeSm: string;
  pink1: string;
  pink2: string;
  pink3: string;
  pink4: string;
  pink5: string;
  pink6: string;
  pink7: string;
  pink8: string;
  pink9: string;
  pink10: string;
  pinkColor: string;
  popoverArrowColor: string;
  popoverArrowOuterColor: string;
  popoverArrowWidth: string;
  popoverBg: string;
  popoverColor: string;
  popoverDistance: string;
  popoverMinWidth: string;
  presetColors: string;
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;
  primary6: string;
  primary7: string;
  primary8: string;
  primary9: string;
  primary10: string;
  primaryColor: string;
  processingColor: string;
  progressDefaultColor: string;
  progressRemainingColor: string;
  progressTextColor: string;
  purple1: string;
  purple2: string;
  purple3: string;
  purple4: string;
  purple5: string;
  purple6: string;
  purple7: string;
  purple8: string;
  purple9: string;
  purple10: string;
  purpleColor: string;
  radioButtonActiveColor: string;
  radioButtonBg: string;
  radioButtonCheckedBg: string;
  radioButtonColor: string;
  radioButtonHoverColor: string;
  radioDotColor: string;
  radioSize: string;
  rateStarBg: string;
  rateStarColor: string;
  red1: string;
  red2: string;
  red3: string;
  red4: string;
  red5: string;
  red6: string;
  red7: string;
  red8: string;
  red9: string;
  red10: string;
  redColor: string;
  screenLg: string;
  screenLgMax: string;
  screenLgMin: string;
  screenMd: string;
  screenMdMax: string;
  screenMdMin: string;
  screenSm: string;
  screenSmMax: string;
  screenSmMin: string;
  screenXl: string;
  screenXlMax: string;
  screenXlMin: string;
  screenXs: string;
  screenXsMax: string;
  screenXsMin: string;
  screenXxl: string;
  screenXxlMin: string;
  secondary1: string;
  secondary2: string;
  secondary3: string;
  secondary4: string;
  secondary5: string;
  secondary6: string;
  secondary7: string;
  secondary8: string;
  secondary9: string;
  secondary10: string;
  secondaryColor: string;
  selectBorderColor: string;
  selectItemSelectedFontWeight: number | string;
  shadow1Down: string;
  shadow1Left: string;
  shadow1Right: string;
  shadow1Up: string;
  shadow2: string;
  shadowColor: string;
  shadowColorInverse: string;
  skeletonColor: string;
  sliderDisabledBackgroundColor: string;
  sliderDisabledColor: string;
  sliderDotBorderColor: string;
  sliderDotBorderColorActive: string;
  sliderHandleColor: string;
  sliderHandleColorFocus: string;
  sliderHandleColorFocusShadow: string;
  sliderHandleColorHover: string;
  sliderHandleColorTooltipOpen: string;
  sliderMargin: string;
  sliderRailBackgroundColor: string;
  sliderRailBackgroundColorHover: string;
  sliderTrackBackgroundColor: string;
  sliderTrackBackgroundColorHover: string;
  spinDotSize: string;
  spinDotSizeLg: string;
  spinDotSizeSm: string;
  statisticContentFontSize: string;
  statisticFontFamily: string;
  statisticTitleFontSize: string;
  statisticUnitFontSize: string;
  successColor: string;
  switchColor: string;
  switchDisabledOpacity: string;
  switchHeight: string;
  switchShadowColor: string;
  switchSmCheckedMarginLeft: string;
  switchSmHeight: string;
  tableBodySelectedSortBg: string;
  tableBodySortBg: string;
  tableBorderRadiusBase: number | string;
  tableExpandedRowBg: string;
  tableHeaderBg: string;
  tableHeaderColor: string;
  tableHeaderSortBg: string;
  tablePaddingHorizontal: string;
  tablePaddingVertical: string;
  tableRowHoverBg: string;
  tableSelectedRowBg: string;
  tableSelectedRowColor: string;
  tableSelectedRowHoverBg: string;
  tabsActiveColor: string;
  tabsBarMargin: string;
  tabsCardActiveColor: string;
  tabsCardHeadBackground: string;
  tabsCardHeight: string;
  tabsHighlightColor: string;
  tabsHorizontalMargin: string;
  tabsHorizontalPadding: string;
  tabsHorizontalPaddingLg: string;
  tabsHorizontalPaddingSm: string;
  tabsHoverColor: string;
  tabsInkBarColor: string;
  tabsScrollingSize: string;
  tabsTitleFontSize: string;
  tabsTitleFontSizeLg: string;
  tabsTitleFontSizeSm: string;
  tabsVerticalMargin: string;
  tabsVerticalPadding: string;
  tagDefaultBg: string;
  tagDefaultColor: string;
  tagFontSize: string;
  textColor: string;
  textColorDark: string;
  textColorInverse: string;
  textColorSecondary: string;
  textColorSecondaryDark: string;
  textSelectionBg: string;
  timePickerPanelColumnWidth: string;
  timePickerPanelWidth: string;
  timePickerSelectedBg: string;
  tooltipArrowColor: string;
  tooltipArrowWidth: string;
  tooltipBg: string;
  tooltipColor: string;
  tooltipDistance: string;
  tooltipMaxWidth: string;
  transferDisabledBg: string;
  transferHeaderHeight: string;
  transferListHeight: string;
  treeChildPadding: string;
  treeDirectorySelectedBg: string;
  treeDirectorySelectedColor: string;
  treeTitleHeight: string;
  volcano1: string;
  volcano2: string;
  volcano3: string;
  volcano4: string;
  volcano5: string;
  volcano6: string;
  volcano7: string;
  volcano8: string;
  volcano9: string;
  volcano10: string;
  volcanoColor: string;
  warningColor: string;
  waveAnimationWidth: string;
  white: string;
  yellow1: string;
  yellow2: string;
  yellow3: string;
  yellow4: string;
  yellow5: string;
  yellow6: string;
  yellow7: string;
  yellow8: string;
  yellow9: string;
  yellow10: string;
  yellowColor: string;
  zindexAffix: number | string;
  zindexBackTop: number | string;
  zindexBadge: number | string;
  zindexDropdown: number | string;
  zindexMessage: number | string;
  zindexModal: number | string;
  zindexModalMask: number | string;
  zindexNotification: number | string;
  zindexPicker: number | string;
  zindexPickerPanel: number | string;
  zindexPopover: number | string;
  zindexPopupClose: number | string;
  zindexTableFixed: string;
  zindexTooltip: number | string;
}

function colorPalette(color: string, index: number) {
  const hueStep = 2;
  const saturationStep = 16;
  const saturationStep2 = 5;
  const brightnessStep1 = 5;
  const brightnessStep2 = 15;
  const lightColorCount = 5;
  const darkColorCount = 4;

  const isLight = index <= 6;
  const hsv = tinycolor(color).toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const getHue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let hue;
    if (hsv.h >= 60 && hsv.h <= 240) {
      hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
      hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  };

  const getSaturation = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let saturation;
    if (isLight) {
      saturation = Math.round(hsv.s * 100) - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = Math.round(hsv.s * 100) + saturationStep;
    } else {
      saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
    }
    if (saturation > 100) {
      saturation = 100;
    }
    if (isLight && i === lightColorCount && saturation > 10) {
      saturation = 10;
    }
    if (saturation < 6) {
      saturation = 6;
    }
    return Math.round(saturation);
  };

  const getValue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    if (isLight) {
      return Math.round(hsv.v * 100) + brightnessStep1 * i;
    }
    return Math.round(hsv.v * 100) - brightnessStep2 * i;
  };

  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  }).toHexString();
}

const replaceLessVars = (theme: object): object => {
  const newTheme: object = { ...theme };
  Object.keys(theme).forEach(key => {
    if (typeof theme[key] === 'string') {
      // @var +- something
      if (theme[key].indexOf('ceil(') < 0)
        newTheme[key] = theme[key].replace(
          /\(?\@[a-z0-9]+(-[a-z0-9]*)* [\+\-\*] (.+)\w\)?/g,
          (match: string) => `calc(${match})`
        );

      // @var
      newTheme[key] = newTheme[key].replace(
        /\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?/g,
        (match: string) =>
          newTheme[match.replace(/\@\{?/g, '').replace(/\}?/g, '')]
      );

      // string => int
      if (`${parseInt(theme[key])}` === theme[key])
        newTheme[key] = parseInt(newTheme[key]);
    }
  });

  // detect and replace nested vars
  const stringifiedTheme = JSON.stringify(newTheme);
  if (
    stringifiedTheme.indexOf('@') >= 0 &&
    JSON.stringify(theme) !== stringifiedTheme
  )
    return replaceLessVars(newTheme);

  return newTheme;
};

const parseTheme = (theme: object): ITheme => {
  const newTheme = {};

  Object.keys(theme).forEach(key => {
    if (typeof theme[key] === 'string') {
      // hsv()
      theme[key] = theme[key].replace(/hsv\(.+\)/g, (match: string) =>
        tinycolor(match).toRgbString()
      );

      // hsl()
      theme[key] = theme[key].replace(/hsl\(.+\)/g, (match: string) =>
        tinycolor(match).toRgbString()
      );

      // fade()
      theme[key] = theme[key].replace(
        /fade\(([^,]+),([^,]+)\)/g,
        (match: string, color: string, alpha: string) =>
          tinycolor(color)
            .setAlpha(parseInt(alpha) / 100)
            .toRgbString()
      );

      // tint()
      theme[key] = theme[key].replace(
        /tint\(([^,]+),([^,]+)\)/g,
        (match: string, color: string, weight: string) =>
          tinycolor(color)
            .lighten(parseInt(weight))
            .toRgbString()
      );

      // colorPalette
      theme[key] = theme[key].replace(
        /(color\()?\~\`colorPalette\(\'([^,]+)\',([^,]+)\)[ ]?\`\)?/g,
        (match: string, stuff: string, color: string, index: string) =>
          colorPalette(color, parseInt(index))
      );

      // ceil()
      theme[key] = theme[key].replace('ceil', 'calc');
    }

    newTheme[camelCase(key)] = theme[key];
  });

  return newTheme as ITheme;
};

export const ThemeContext = React.createContext({});

export const useFela = (): {
  css: (css: object) => string;
  theme: ITheme;
  renderer: IRenderer;
} => {
  const theme = React.useContext(ThemeContext);
  const { css, renderer } = useFelaBase();

  // replacing @-vars & functions with values
  const parsedTheme = React.useMemo(() => parseTheme(replaceLessVars(theme)), [
    theme
  ]);

  renderer.renderStatic(`
    html, body {
      background-color: ${parsedTheme.primaryColor};
    }
    #__next {
      background-color: ${parsedTheme.white};
    }
  `);

  return { css, theme: parsedTheme, renderer };
};

export default ThemeContext.Provider;
