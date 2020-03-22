import React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import ConfigProvider from 'antd/lib/config-provider';
import { useLocale } from 'vilicando-core';

interface IAntdProvider {
  children: React.ReactNode | Array<React.ReactNode>;
}

function AntdProvider({ children }: IAntdProvider) {
  const { locale } = useLocale();

  return (
    <ConfigProvider locale={locale === 'de' ? deDE : enUS}>
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
