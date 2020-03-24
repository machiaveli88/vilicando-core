import { useLocale, TLocale } from './LocaleProvider';

export default function languageController<T>(
  defaultLocale: TLocale,
  defaultLocaleData: T
) {
  const _locales: { [k: string]: T } = {};
  _locales[defaultLocale] = defaultLocaleData;

  const controller = {
    defaultLocale,
    defaultLocaleData,
    set: (locale: TLocale, localeData: T) => {
      _locales[locale] = localeData;

      return controller;
    },
    get: (locale?: TLocale) => _locales[locale] || _locales[defaultLocale],
    useLanguage: () => {
      const [locale] = useLocale();

      return controller.get(locale);
    },
  };

  return controller;
}
