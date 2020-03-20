export interface IAntdTheme {
  alert?: {
    close?: { color?: string; hover?: { color?: string } };
    error?: {
      bg?: { color?: string };
      border?: { color?: string };
      icon?: { color?: string };
    };
    info?: {
      bg?: { color?: string };
      border?: { color?: string };
      icon?: { color?: string };
    };
    message?: { color?: string };
    success?: {
      bg?: { color?: string };
      border?: { color?: string };
      icon?: { color?: string };
    };
    text?: { color?: string };
    warning?: {
      bg?: { color?: string };
      border?: { color?: string };
      icon?: { color?: string };
    };
  };
  anchor?: { bg?: string; border?: { color?: string } };
  animation?: { duration?: { base?: string; fast?: string; slow?: string } };
  ant?: { prefix?: string };
  avatar?: {
    bg?: string;
    border?: { radius?: number | string };
    color?: string;
    font?: {
      size?: {
        base?: number | string;
        lg?: number | string;
        sm?: number | string;
      };
    };
    size?: {
      base?: number | string;
      lg?: number | string;
      sm?: number | string;
    };
  };
  back?: { top?: { bg?: string; color?: string; hover?: { bg?: string } } };
  background?: { color?: { base?: string; light?: string } };
  badge?: {
    dot?: { size?: number | string };
    font?: { size?: number | string; weight?: string };
    height?: number | string;
    status?: { size?: number | string };
    text?: { color?: string };
  };
  black?: string;
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
  body?: { background?: string };
  border?: {
    color?: { base?: string; inverse?: string; split?: string };
    radius?: { base?: number | string; sm?: number | string };
    style?: { base?: string };
    width?: { base?: number | string };
  };
  box?: { shadow?: { base?: string } };
  breadcrumb?: {
    base?: { color?: string };
    font?: { size?: number | string };
    icon?: { font?: { size?: number | string } };
    last?: { item?: { color?: string } };
    link?: { color?: string; colorHover?: string };
    separator?: { color?: string; margin?: string };
  };
  btn?: {
    border?: {
      radius?: { base?: number | string; sm?: number | string };
      style?: string;
      width?: number | string;
    };
    circle?: {
      size?: number | string;
      sizeLg?: number | string;
      sizeSm?: number | string;
    };
    danger?: { bg?: string; border?: string; color?: string };
    default?: {
      bg?: string;
      border?: string;
      color?: string;
      ghost?: { bg?: string; border?: string; color?: string };
    };
    disable?: { bg?: string; border?: string; color?: string };
    font?: {
      size?: { lg?: number | string; sm?: number | string };
      weight?: number | string;
    };
    group?: { border?: string };
    height?: {
      base?: number | string;
      lg?: number | string;
      sm?: number | string;
    };
    link?: { ghost?: { color?: string } };
    padding?: {
      horizontal?: {
        base?: number | string;
        lg?: number | string;
        sm?: number | string;
      };
    };
    primary?: { bg?: string; color?: string; shadow?: string };
    shadow?: string;
    square?: {
      size?: number | string;
      sizeLg?: number | string;
      sizeSm?: number | string;
    };
    text?: { shadow?: string };
  };
  calendar?: {
    bg?: string;
    border?: { color?: string };
    full?: { bg?: string; panel?: { bg?: string } };
    input?: { bg?: string };
    item?: { active?: { bg?: string } };
  };
  card?: {
    actions?: { background?: string };
    background?: string;
    head?: { background?: string; color?: string; padding?: number | string };
    inner?: { head?: { padding?: number | string } };
    padding?: { base?: number | string };
    radius?: number | string;
    shadow?: string;
    skeleton?: { bg?: string };
  };
  carousel?: {
    dot?: {
      active?: { width?: number | string };
      height?: number | string;
      width?: number | string;
    };
  };
  cascader?: {
    bg?: string;
    dropdown?: {
      edge?: { child?: { vertical?: { padding?: number | string } } };
      font?: { size?: number | string };
      line?: { height?: number | string };
      vertical?: { padding?: number | string };
    };
    item?: { selected?: { bg?: string } };
    menu?: { bg?: string; border?: { color?: { split?: string } } };
  };
  checkbox?: {
    border?: { width?: number | string };
    check?: { bg?: string; color?: string };
    color?: string;
    size?: number | string;
  };
  code?: { family?: string };
  collapse?: {
    content?: { bg?: string; padding?: number | string };
    header?: { bg?: string; padding?: string; paddingExtra?: number | string };
    panel?: { border?: { radius?: number | string } };
  };
  comment?: {
    action?: { color?: string; hover?: { color?: string } };
    author?: { name?: { color?: string }; time?: { color?: string } };
    bg?: string;
    font?: { size?: { base?: number | string; sm?: number | string } };
    nest?: { indent?: number | string };
    padding?: { base?: string };
  };
  component?: { background?: string };
  control?: {
    padding?: { horizontal?: number | string; horizontalSm?: number | string };
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
  descriptions?: { bg?: string };
  disabled?: { bg?: string; color?: string; colorDark?: string };
  drawer?: {
    bg?: string;
    body?: { padding?: number | string };
    footer?: {
      padding?: { horizontal?: number | string; vertical?: number | string };
    };
    header?: { padding?: string };
  };
  dropdown?: {
    edge?: { child?: { vertical?: { padding?: number | string } } };
    font?: { size?: number | string };
    line?: { height?: number | string };
    menu?: { bg?: string; submenu?: { disabled?: { bg?: string } } };
    selected?: { color?: string };
    vertical?: { padding?: number | string };
  };
  ease?: {
    base?: { in?: string; out?: string };
    in?: string;
    inBack?: string;
    inCirc?: string;
    inOut?: string;
    inOutBack?: string;
    inOutCirc?: string;
    inOutQuint?: string;
    inQuint?: string;
    out?: string;
    outBack?: string;
    outCirc?: string;
    outQuint?: string;
  };
  empty?: { font?: { size?: number | string } };
  error?: { color?: string };
  font?: {
    family?: string;
    feature?: { settings?: { base?: string } };
    size?: {
      base?: number | string;
      lg?: number | string;
      sm?: number | string;
    };
    variant?: { base?: string };
  };
  form?: {
    error?: { input?: { bg?: string } };
    item?: {
      label?: {
        colon?: {
          margin?: { left?: number | string; right?: number | string };
        };
        font?: { size?: number | string };
      };
      margin?: { bottom?: number | string };
      trailing?: { colon?: string };
    };
    vertical?: { label?: { margin?: number | string; padding?: string } };
    warning?: { input?: { bg?: string } };
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
  grid?: { columns?: number | string; gutter?: { width?: number | string } };
  heading?: {
    '1'?: { size?: number | string };
    '2'?: { size?: number | string };
    '3'?: { size?: number | string };
    '4'?: { size?: number | string };
    color?: string;
    colorDark?: string;
  };
  highlight?: { color?: string };
  html?: { selector?: string };
  icon?: { color?: string; colorHover?: string };
  iconfont?: { css?: { prefix?: string } };
  info?: { color?: string };
  input?: {
    addon?: { bg?: string };
    bg?: string;
    border?: { color?: string };
    color?: string;
    disabled?: { bg?: string };
    height?: {
      base?: number | string;
      lg?: number | string;
      sm?: number | string;
    };
    hover?: { border?: { color?: string } };
    icon?: { color?: string; hover?: { color?: string } };
    number?: {
      handler?: {
        active?: { bg?: string };
        bg?: string;
        border?: { color?: string };
        hover?: { bg?: string };
      };
      hover?: { border?: { color?: string } };
    };
    outline?: { offset?: string };
    padding?: {
      horizontal?: number | string;
      horizontalBase?: number | string;
      horizontalLg?: number | string;
      horizontalSm?: number | string;
      vertical?: {
        base?: number | string;
        lg?: number | string;
        sm?: number | string;
      };
    };
    placeholder?: { color?: string };
  };
  item?: { active?: { bg?: string }; hover?: { bg?: string } };
  label?: { color?: string; required?: { color?: string } };
  layout?: {
    body?: { background?: string };
    footer?: { background?: string; padding?: string };
    header?: {
      background?: string;
      color?: string;
      height?: number | string;
      padding?: string;
    };
    sider?: { background?: string; backgroundLight?: string };
    trigger?: {
      background?: string;
      backgroundLight?: string;
      color?: string;
      colorLight?: string;
      height?: number | string;
    };
    zero?: { trigger?: { height?: number | string; width?: number | string } };
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
  line?: { height?: { base?: number | string } };
  link?: {
    active?: { color?: string };
    color?: string;
    decoration?: string;
    hover?: { color?: string; decoration?: string };
  };
  list?: {
    customize?: { card?: { bg?: string } };
    empty?: { text?: { padding?: number | string } };
    footer?: { background?: string };
    header?: { background?: string };
    item?: {
      meta?: {
        avatar?: { margin?: { right?: number | string } };
        margin?: { bottom?: number | string };
        title?: { margin?: { bottom?: number | string } };
      };
      padding?: string;
    };
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
  mentions?: {
    dropdown?: { bg?: string; menu?: { item?: { hover?: { bg?: string } } } };
  };
  menu?: {
    bg?: string;
    collapsed?: { width?: number | string };
    dark?: {
      arrow?: { color?: string };
      bg?: string;
      color?: string;
      highlight?: { color?: string };
      item?: { active?: { bg?: string }; hover?: { bg?: string } };
      selected?: {
        item?: { icon?: { color?: string }; text?: { color?: string } };
      };
      submenu?: { bg?: string };
    };
    highlight?: { color?: string };
    icon?: { size?: number | string; sizeLg?: number | string };
    inline?: { toplevel?: { item?: { height?: number | string } } };
    item?: {
      active?: { bg?: string; border?: { width?: number | string } };
      boundary?: { margin?: number | string };
      color?: string;
      font?: { size?: number | string };
      group?: { title?: { color?: string } };
      height?: number | string;
      vertical?: { margin?: number | string };
    };
    popup?: { bg?: string };
  };
  message?: { notice?: { content?: { bg?: string; padding?: string } } };
  modal?: {
    body?: { padding?: number | string };
    content?: { bg?: string };
    footer?: {
      bg?: string;
      border?: { color?: { split?: string } };
      padding?: { horizontal?: number | string; vertical?: number | string };
    };
    header?: { bg?: string; border?: { color?: { split?: string } } };
    heading?: { color?: string };
    mask?: { bg?: string };
  };
  normal?: { color?: string };
  notification?: { bg?: string };
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
  outline?: {
    blur?: { size?: number | string };
    color?: string;
    fade?: string;
    width?: number | string;
  };
  padding?: {
    lg?: number | string;
    md?: number | string;
    sm?: number | string;
    xs?: number | string;
  };
  page?: {
    header?: {
      back?: { color?: string };
      ghost?: { bg?: string };
      padding?: number | string;
      paddingBreadcrumb?: number | string;
      paddingVertical?: number | string;
    };
  };
  pagination?: {
    font?: { family?: string; weight?: { active?: number | string } };
    item?: {
      bg?: string;
      bgActive?: string;
      disabled?: { bg?: { active?: string }; color?: { active?: string } };
      input?: { bg?: string };
      link?: { bg?: string };
      size?: number | string;
      sizeSm?: number | string;
    };
  };
  picker?: {
    basic?: {
      cell?: {
        active?: { with?: { range?: { color?: string } } };
        disabled?: { bg?: string };
        hover?: { color?: string; with?: { range?: { color?: string } } };
      };
    };
    bg?: string;
    border?: { color?: string };
    date?: {
      hover?: { range?: { border?: { color?: string }; color?: string } };
    };
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
  popover?: {
    arrow?: {
      color?: string;
      outer?: { color?: string };
      width?: number | string;
    };
    background?: string;
    bg?: string;
    color?: string;
    customize?: { border?: { color?: string } };
    distance?: number | string;
    min?: { width?: number | string };
  };
  preset?: { colors?: string };
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
    color?: string;
  };
  process?: { tail?: { color?: string } };
  processing?: { color?: string };
  progress?: {
    default?: { color?: string };
    radius?: number | string;
    remaining?: { color?: string };
    steps?: { item?: { bg?: string } };
    text?: { color?: string };
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
  radio?: {
    button?: {
      active?: { color?: string };
      bg?: string;
      checked?: { bg?: string };
      color?: string;
      hover?: { color?: string };
    };
    disabled?: { button?: { checked?: { bg?: string; color?: string } } };
    dot?: { color?: string; disabled?: { color?: string } };
    size?: number | string;
  };
  radtio?: { solid?: { checked?: { color?: string } } };
  rate?: { star?: { bg?: string; color?: string } };
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
  screen?: {
    lg?: number | string;
    lgMax?: number | string;
    lgMin?: number | string;
    md?: number | string;
    mdMax?: number | string;
    mdMin?: number | string;
    sm?: number | string;
    smMax?: number | string;
    smMin?: number | string;
    xl?: number | string;
    xlMax?: number | string;
    xlMin?: number | string;
    xs?: number | string;
    xsMax?: number | string;
    xsMin?: number | string;
    xxl?: number | string;
    xxlMin?: number | string;
  };
  select?: {
    background?: string;
    border?: { color?: string };
    clear?: { background?: string };
    dropdown?: {
      bg?: string;
      font?: { size?: number | string };
      line?: { height?: number | string };
      vertical?: { padding?: number | string };
    };
    item?: {
      active?: { bg?: string };
      selected?: { bg?: string; font?: { weight?: number | string } };
    };
    selection?: { item?: { bg?: string; border?: { color?: string } } };
  };
  shadow?: {
    '1'?: { down?: string; left?: string; right?: string; up?: string };
    '2'?: string;
    color?: string;
    colorInverse?: string;
  };
  skeleton?: { color?: string; to?: { color?: string } };
  slider?: {
    disabled?: { background?: { color?: string }; color?: string };
    dot?: { border?: { color?: string; colorActive?: string } };
    handle?: {
      background?: { color?: string };
      border?: { width?: number | string };
      color?: string;
      colorFocus?: string;
      colorFocusShadow?: string;
      colorHover?: string;
      colorTooltip?: { open?: string };
      shadow?: number | string;
    };
    margin?: string;
    rail?: { background?: { color?: string; colorHover?: string } };
    track?: { background?: { color?: string; colorHover?: string } };
  };
  spin?: {
    dot?: {
      size?: number | string;
      sizeLg?: number | string;
      sizeSm?: number | string;
    };
  };
  statistic?: {
    content?: { font?: { size?: number | string } };
    font?: { family?: string };
    title?: { font?: { size?: number | string } };
    unit?: { font?: { size?: number | string } };
  };
  steps?: { background?: string; nav?: { arrow?: { color?: string } } };
  success?: { color?: string };
  switch?: {
    bg?: string;
    color?: string;
    disabled?: { opacity?: number | string };
    height?: number | string;
    min?: { width?: number | string };
    shadow?: { color?: string };
    sm?: {
      checked?: { margin?: { left?: number | string } };
      height?: number | string;
      min?: { width?: number | string };
    };
  };
  table?: {
    bg?: string;
    body?: { selected?: { sort?: { bg?: string } }; sort?: { bg?: string } };
    border?: { radius?: { base?: number | string } };
    expand?: { icon?: { bg?: string } };
    expanded?: { row?: { bg?: string } };
    filter?: { btns?: { bg?: string }; dropdown?: { bg?: string } };
    footer?: { bg?: string; color?: string };
    header?: {
      bg?: string;
      bgSm?: string;
      color?: string;
      filter?: { active?: { bg?: string } };
      sort?: { active?: { bg?: string }; bg?: string };
    };
    padding?: { horizontal?: number | string; vertical?: number | string };
    row?: { hover?: { bg?: string } };
    selected?: {
      row?: { bg?: string; color?: string; hover?: { bg?: string } };
    };
  };
  tabs?: {
    active?: { color?: string };
    bar?: { margin?: string };
    card?: {
      active?: { color?: string };
      gutter?: number | string;
      head?: { background?: string };
      height?: number | string;
      tab?: { active?: { border?: { top?: string } } };
    };
    highlight?: { color?: string };
    horizontal?: {
      margin?: string;
      marginRtl?: string;
      padding?: string;
      paddingLg?: string;
      paddingSm?: string;
    };
    hover?: { color?: string };
    ink?: { bar?: { color?: string } };
    scrolling?: { size?: number | string };
    title?: {
      font?: {
        size?: number | string;
        sizeLg?: number | string;
        sizeSm?: number | string;
      };
    };
    vertical?: { margin?: string; padding?: string };
  };
  tag?: {
    default?: { bg?: string; color?: string };
    font?: { size?: number | string };
  };
  text?: {
    color?: string;
    colorDark?: string;
    colorInverse?: string;
    colorSecondary?: string;
    colorSecondaryDark?: string;
    selection?: { bg?: string };
  };
  theme?: string;
  timeline?: {
    color?: string;
    dot?: { bg?: string; border?: { width?: number | string }; color?: string };
    item?: { padding?: { bottom?: number | string } };
    width?: number | string;
  };
  tooltip?: {
    arrow?: { color?: string; width?: number | string };
    bg?: string;
    color?: string;
    distance?: number | string;
    max?: { width?: number | string };
  };
  transfer?: {
    disabled?: { bg?: string };
    header?: { height?: number | string };
    item?: { hover?: { bg?: string } };
    list?: { height?: number | string };
  };
  tree?: {
    bg?: string;
    child?: { padding?: number | string };
    directory?: { selected?: { bg?: string; color?: string } };
    node?: { hover?: { bg?: string }; selected?: { bg?: string } };
    title?: { height?: number | string };
  };
  typography?: {
    title?: {
      font?: { weight?: number | string };
      margin?: { bottom?: string; top?: string };
    };
  };
  upload?: { actions?: { color?: string } };
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
  warning?: { color?: string };
  wave?: { animation?: { width?: number | string } };
  white?: string;
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
  zindex?: {
    affix?: number | string;
    back?: { top?: number | string };
    badge?: string;
    dropdown?: number | string;
    message?: number | string;
    modal?: number | string;
    modalMask?: number | string;
    notification?: number | string;
    picker?: number | string;
    pickerPanel?: number | string;
    popover?: number | string;
    popup?: { close?: number | string };
    table?: { fixed?: string };
    tooltip?: number | string;
  };
}
