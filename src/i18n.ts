import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
    backend: {
      // path where resources get loaded from
      loadPath: '/locales/{{lng}}.json',
    }
  });

export default i18n;
