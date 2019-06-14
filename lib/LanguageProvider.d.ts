import * as React from 'react';
import 'moment/locale/de';
export declare function useLanguage(): (key: string, options?: object) => string;
export interface IUtilsLanguageProvider {
    phrases?: object;
    locale?: string;
    children?: React.ReactNode;
}
declare function UtilsLanguageProvider({ phrases, locale, children }: IUtilsLanguageProvider): JSX.Element;
export default UtilsLanguageProvider;
