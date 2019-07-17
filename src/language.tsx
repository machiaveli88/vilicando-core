import * as moment from 'moment';
import * as React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import LocaleProvider from 'antd/lib/locale-provider';
import 'moment/locale/de';
/* import * as Polyglot from 'node-polyglot';
 */

moment.locale('de');

/* const LanguageCtx = React.createContext<
  (key: string, options?: object) => string
>(() => ''); */

export function useLanguage() {
  return (a: string, options?: any) => a;
  // return React.useContext(LanguageCtx);
}

export interface ILanguageProvider {
  translation: object;
  locale?: string;
  children: React.ReactNode;
}

function LanguageProvider({
  translation,
  locale = 'de',
  children
}: ILanguageProvider) {
  /* const polyglot = new Polyglot({
    locale: 'de',
    phrases: {
      UNDEFINED: 'N/A',
      ADD: 'Hinzufügen',
      EDIT: 'Bearbeiten',
      DUPLICATE: 'Duplizieren',
      DELETE: 'Löschen',
      SAVE: 'Speichern',
      CANCEL: 'Abbrechen'
    }
  });

  Object.keys(translation).forEach(language => {});

  React.useEffect(() => {
    if (locale) polyglot.locale(locale);
  }, [locale]);

  /* React.useEffect(() => {
    console.log(phrases, 'd');
    if (phrases) polyglot.extend(phrases);
  }, [phrases]); */

  return <>{children}</>;

  /* return (
    <LanguageCtx.Provider value={polyglot.t.bind(polyglot)}>
      <LocaleProvider locale={deDE}>
        {React.Children.only(children)}
      </LocaleProvider>
    </LanguageCtx.Provider>
  ); */
}

export default LanguageProvider;
