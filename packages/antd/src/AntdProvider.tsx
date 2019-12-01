import React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import ConfigProvider from 'antd/lib/config-provider';
import { parseTheme, replaceLessVars } from './utils';
import { ThemeProvider, useLanguage } from 'vilicando-core';
import defaultTheme from './theme.json';

export interface IAntdProvider {
  children: React.ReactNode;
  theme?: object;
}

function AntdProvider({ children, theme }: IAntdProvider) {
  const { locale } = useLanguage();

  // replacing @-vars & functions with values
  const parsedTheme = React.useMemo(() => {
    const parsedTheme = parseTheme(
      replaceLessVars({ ...defaultTheme, ...theme })
    );

    // map to normal theme
    parsedTheme.shadow0 = parsedTheme.shadow1Down;
    parsedTheme.shadow1 = parsedTheme.shadow1Down;
    parsedTheme.shadow3 = parsedTheme.shadow2;

    parsedTheme.spacingXs = parsedTheme.paddingXs;
    parsedTheme.spacingSm = parsedTheme.paddingSm;
    parsedTheme.spacingMd = parsedTheme.paddingMd;
    parsedTheme.spacingLg = parsedTheme.paddingLg;

    parsedTheme.fontSizeMd = parsedTheme.fontSizeBase;
    parsedTheme.heading5Size = `calc(${parsedTheme.fontSizeBase} * 1.312)`;
    parsedTheme.heading6Size = `calc(${parsedTheme.fontSizeBase} * 1.125)`;

    // todo: remove XyColor and use XyBase (added by antd recently)???
    parsedTheme.blueColor = parsedTheme.blueBase;
    parsedTheme.purpleColor = parsedTheme.purpleBase;
    parsedTheme.cyanColor = parsedTheme.cyanBase;
    parsedTheme.greenColor = parsedTheme.greenBase;
    parsedTheme.magentaColor = parsedTheme.magentaBase;
    parsedTheme.pinkColor = parsedTheme.pinkBase;
    parsedTheme.redColor = parsedTheme.redBase;
    parsedTheme.orangeColor = parsedTheme.orangeBase;
    parsedTheme.yellowColor = parsedTheme.yellowBase;
    parsedTheme.volcanoColor = parsedTheme.volcanoBase;
    parsedTheme.geekblueColor = parsedTheme.geekblueBase;
    parsedTheme.limeColor = parsedTheme.limeBase;
    parsedTheme.goldColor = parsedTheme.goldBase;

    return parsedTheme;
  }, [theme]);

  return (
    <ThemeProvider theme={parsedTheme}>
      <ConfigProvider locale={locale === 'de' ? deDE : enUS}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default AntdProvider;
