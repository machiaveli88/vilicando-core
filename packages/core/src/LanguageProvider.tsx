import React from 'react';
import moment from 'moment';
import 'moment/locale/de';
import Polyglot from 'node-polyglot';
import { defaultLocale } from './utils';

export interface ILanguageContext {
  translate?: (key: string, options?: object) => string;
  locale?: string;
  setLocale?: (str: string) => void;
}

export interface ILanguageProvider {
  translations: object;
  locale: string;
  children: React.ReactNode;
}

const LanguageContext = React.createContext<ILanguageContext>({});

export function useLanguage(): ILanguageContext {
  return React.useContext(LanguageContext);
}

function LanguageProvider({
  translations,
  locale: l = defaultLocale,
  children
}: ILanguageProvider) {
  const [locale, setLocale] = React.useState<string>(l);

  React.useEffect(() => setLocale(l), [l]);

  const phrases = React.useMemo(
    () => (translations ? translations[locale] || {} : {}),
    [translations, locale]
  );
  const polyglot = React.useMemo(
    // todo: use polyglot.locale/extends/replace instead of creating new Instances for each change in locale or phrases
    () => new Polyglot({ locale, phrases, allowMissing: true }),
    [locale, phrases]
  );

  React.useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  /* React.useEffect(() => {
    if (polyglot && locale) {
      polyglot.locale(locale);
    }
  }, [locale]);

  React.useEffect(() => {
    if (polyglot && phrases) {
      polyglot.extend(phrases);
    }
  }, [phrases]); */

  return (
    <LanguageContext.Provider
      value={{
        translate: polyglot.t.bind(polyglot),
        locale,
        setLocale
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
