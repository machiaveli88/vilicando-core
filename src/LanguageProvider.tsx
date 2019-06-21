import * as React from 'react';
import * as Polyglot from 'node-polyglot';
import LocaleProvider from 'antd/lib/locale-provider';
import deDE from 'antd/lib/locale-provider/de_DE';
import * as moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

// @ts-ignore
const polyglot = new Polyglot({
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

const LanguageCtx = React.createContext<
  (key: string, options?: object) => string
>(() => '');

export function useLanguage() {
  return React.useContext(LanguageCtx);
}

export interface IUtilsLanguageProvider {
  phrases?: object;
  locale?: string;
  children?: React.ReactNode;
}

function UtilsLanguageProvider({
  phrases,
  locale = 'de',
  children
}: IUtilsLanguageProvider) {
  React.useEffect(() => {
    if (locale) polyglot.locale(locale);
  }, [locale]);

  React.useEffect(() => {
    if (phrases) polyglot.replace(phrases);
  }, [phrases]);

  console.log(phrases);

  return (
    <LanguageCtx.Provider value={polyglot.t.bind(polyglot)}>
      <LocaleProvider locale={deDE}>
        {React.Children.only(children)}
      </LocaleProvider>
    </LanguageCtx.Provider>
  );
}

export default UtilsLanguageProvider;
