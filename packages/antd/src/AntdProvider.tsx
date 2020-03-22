import React from 'react';
import de_DE from 'antd/lib/locale-provider/de_DE';
import en_US from 'antd/lib/locale-provider/en_US';
import es_ES from 'antd/lib/locale-provider/es_ES';
import ConfigProvider from 'antd/lib/config-provider';
import { useLocale } from 'vilicando-core';
import { Locale } from 'antd/lib/locale-provider';

// todo: TLocale instead of string
const locales: { [k: string]: Locale } = {
  'de-DE': de_DE,
  'en-US': en_US,
  'es-ES': es_ES
};

interface IAntdProvider {
  children: React.ReactNode | Array<React.ReactNode>;
}

function AntdProvider({ children }: IAntdProvider) {
  const [locale] = useLocale();

  return (
    <ConfigProvider locale={locales[locale] || en_US}>
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
