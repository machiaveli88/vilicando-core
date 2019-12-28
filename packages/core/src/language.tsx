import React from 'react';
import moment from 'moment';
import { defaultLocale } from './utils';
import 'moment/locale/de';

export type ILocales = 'en' | 'de';
interface ILocaleContext {
  locale?: ILocales;
  setLocale?: (locale: ILocales) => void;
}
interface ILocaleProvider {
  locale?: ILocales;
  children: React.ReactNode;
}

const LocaleContext = React.createContext<ILocaleContext>({});

export function useLocale() {
  return React.useContext<ILocaleContext>(LocaleContext);
}

export default function LocaleProvider({
  locale: l = defaultLocale,
  children
}: ILocaleProvider) {
  const [locale, setLocale] = React.useState<ILocales>(l);

  React.useEffect(() => setLocale(l), [l]);

  React.useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function initLanguage<T>(defaultLocale: ILocales, defaultLocaleData: T) {
  const _locales: { [k: string]: T } = {};
  _locales[defaultLocale] = defaultLocaleData;

  const controller = {
    defaultLocale,
    defaultLocaleData,
    add: (locale: string, localeData?: T) => {
      _locales[locale] = localeData;

      return controller;
    },
    get: (locale?: string) => _locales[locale] || _locales[defaultLocale],
    useLanguage: () => {
      const { locale } = useLocale();

      return controller.get(locale);
    }
  };

  return controller;
}
