import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './translations/es.json';
import en from './translations/en.json';

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        supportedLngs: ["en", "es"], // *** added this ***
        ns: ['translations'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                global: en,
            },
            es: {
                global: es,
            }
        }
    });

export default i18n;