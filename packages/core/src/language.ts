import { useLocale, TLocale } from './LocaleProvider';

export default function language<T>(
  defaultLocale: TLocale,
  defaultLocaleData: T
) {
  const _locales: { [k: string]: T } = {};
  _locales[defaultLocale] = defaultLocaleData;

  const controller = {
    defaultLocale,
    defaultLocaleData,
    add: (locale: string, localeData?: T) => {
      _locales[locale] = localeData;

      return controller;
    },
    get: (locale?: string) => _locales[locale] || _locales[defaultLocale],
    useLanguage: () => {
      const { locale } = useLocale();

      return controller.get(locale);
    }
  };

  return controller;
}
