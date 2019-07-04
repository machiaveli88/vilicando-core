"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
/* import * as Polyglot from 'node-polyglot';
import LocaleProvider from 'antd/lib/locale-provider';
import deDE from 'antd/lib/locale-provider/de_DE'; */
var moment = __importStar(require("moment"));
require("moment/locale/de");
moment.locale('de');
/* const LanguageCtx = React.createContext<
  (key: string, options?: object) => string
>(() => ''); */
function useLanguage() {
    return function (a, options) { return a; };
    // return React.useContext(LanguageCtx);
}
exports.useLanguage = useLanguage;
function LanguageProvider(_a) {
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
    var translation = _a.translation, _b = _a.locale, locale = _b === void 0 ? 'de' : _b, children = _a.children;
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