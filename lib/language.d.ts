import * as React from 'react';
import 'moment/locale/de';
export declare function useLanguage(): (a: string, options: any) => string;
export interface ILanguageProvider {
    translation: object;
    locale?: string;
    children: React.ReactNode;
}
declare function LanguageProvider({ translation, locale, children }: ILanguageProvider): JSX.Element;
export default LanguageProvider;
