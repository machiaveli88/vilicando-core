import React from 'react';
import moment from 'moment';

export type TLocale = 'de-DE' | 'en-US' | 'es-ES';
export interface ILocale {
  locale?: TLocale;
}
type TLocaleContext = [TLocale, (locale: TLocale) => void];
interface ILocaleProvider extends ILocale {
  children: React.ReactNode | Array<React.ReactNode>;
}

const locales: { [key: string]: TLocale } = {
  de: 'de-DE',
  'de-DE': 'de-DE',
  en: 'en-US',
  'en-US': 'en-US',
  es: 'es-ES',
  'es-ES': 'es-ES',
};
export const resolveLocale = (locale: string | Array<string>): TLocale =>
  (!Array.isArray(locale) ? locales[locale] : undefined) || 'en-US';

const _navigator = (typeof window === 'undefined' ? {} : navigator) as any;
const defaultLocale = resolveLocale(
  _navigator.languages && _navigator.languages.length
    ? _navigator.languages[0]
    : _navigator.userLanguage ||
        _navigator.language ||
        _navigator.browserLanguage
);

const defaultSetLocale = () => console.warn('LocaleProvider not found!');
const defaultContext: TLocaleContext = [defaultLocale, defaultSetLocale];
const LocaleContext = React.createContext<TLocaleContext>(defaultContext);

export function useLocale() {
  return React.useContext<TLocaleContext>(LocaleContext);
}

export default function LocaleProvider({
  locale: _locale,
  children,
}: ILocaleProvider) {
  const [locale, setLocale] = React.useState<TLocale>(_locale || defaultLocale);

  React.useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={[_locale || locale, setLocale]}>
      {children}
    </LocaleContext.Provider>
  );
}
