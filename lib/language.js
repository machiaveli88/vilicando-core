"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/* import * as Polyglot from 'node-polyglot';
import LocaleProvider from 'antd/lib/locale-provider';
import deDE from 'antd/lib/locale-provider/de_DE'; */
const moment = require("moment");
require("moment/locale/de");
moment.locale('de');
/* const LanguageCtx = React.createContext<
  (key: string, options?: object) => string
>(() => ''); */
function useLanguage() {
    return (a) => a;
    // return React.useContext(LanguageCtx);
}
exports.useLanguage = useLanguage;
function LanguageProvider({ translation, locale = 'de', children }) {
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
    return React.createElement("div", null, children);
    /* return (
      <LanguageCtx.Provider value={polyglot.t.bind(polyglot)}>
        <LocaleProvider locale={deDE}>
          {React.Children.only(children)}
        </LocaleProvider>
      </LanguageCtx.Provider>
    ); */
}
exports.default = LanguageProvider;
//# sourceMappingURL=language.js.map