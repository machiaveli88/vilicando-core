"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Polyglot = require("node-polyglot");
var locale_provider_1 = require("antd/lib/locale-provider");
var de_DE_1 = require("antd/lib/locale-provider/de_DE");
var moment = require("moment");
require("moment/locale/de");
moment.locale('de');
var polyglot = new Polyglot({
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
var LanguageCtx = React.createContext(function () { return ''; });
function useLanguage() {
    return React.useContext(LanguageCtx);
}
exports.useLanguage = useLanguage;
function UtilsLanguageProvider(_a) {
    var phrases = _a.phrases, _b = _a.locale, locale = _b === void 0 ? 'de' : _b, children = _a.children;
    React.useEffect(function () {
        if (locale)
            polyglot.locale(locale);
    }, [locale]);
    React.useEffect(function () {
        if (phrases)
            polyglot.replace(phrases);
    }, [phrases]);
    console.log(phrases);
    return (React.createElement(LanguageCtx.Provider, { value: polyglot.t.bind(polyglot) },
        React.createElement(locale_provider_1.default, { locale: de_DE_1.default }, React.Children.only(children))));
}
exports.default = UtilsLanguageProvider;
