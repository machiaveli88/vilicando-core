import * as React from 'react';
/* import * as Polyglot from 'node-polyglot';
import LocaleProvider from 'antd/lib/locale-provider';
import deDE from 'antd/lib/locale-provider/de_DE'; */
import * as moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

/* const LanguageCtx = React.createContext<
  (key: string, options?: object) => string
>(() => ''); */

export function useLanguage() {
  return (a: string) => a;
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

  return <div>{children}</div>;

  /* return (
    <LanguageCtx.Provider value={polyglot.t.bind(polyglot)}>
      <LocaleProvider locale={deDE}>
        {React.Children.only(children)}
      </LocaleProvider>
    </LanguageCtx.Provider>
  ); */
}

export default LanguageProvider;
