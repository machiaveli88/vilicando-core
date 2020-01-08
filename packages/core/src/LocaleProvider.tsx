import React from 'react';
import moment from 'moment';
import { defaultLocale } from './utils';
import 'moment/locale/de';

export type TLocale = 'en' | 'de';

export interface ILocale {
  locale?: TLocale;
}
interface ILocaleContext extends ILocale {
  setLocale?: (locale: TLocale) => void;
}
interface ILocaleProvider extends ILocale {
  children: React.ReactNode | Array<React.ReactNode>;
}

const LocaleContext = React.createContext<ILocaleContext>({});

export function useLocale() {
  return React.useContext<ILocaleContext>(LocaleContext);
}

export default function LocaleProvider({
  locale: l = defaultLocale,
  children
}: ILocaleProvider) {
  const [locale, setLocale] = React.useState<TLocale>(l);

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
