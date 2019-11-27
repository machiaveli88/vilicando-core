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

    parsedTheme.blueColor = parsedTheme.blue6;
    parsedTheme.purpleColor = parsedTheme.purple6;
    parsedTheme.cyanColor = parsedTheme.cyan6;
    parsedTheme.greenColor = parsedTheme.green6;
    parsedTheme.magentaColor = parsedTheme.magenta6;
    parsedTheme.pinkColor = parsedTheme.pink6;
    parsedTheme.redColor = parsedTheme.red6;
    parsedTheme.orangeColor = parsedTheme.orange6;
    parsedTheme.yellowColor = parsedTheme.yellow6;
    parsedTheme.volcanoColor = parsedTheme.volcano6;
    parsedTheme.geekblueColor = parsedTheme.geekblue6;
    parsedTheme.limeColor = parsedTheme.lime6;
    parsedTheme.goldColor = parsedTheme.gold6;

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
