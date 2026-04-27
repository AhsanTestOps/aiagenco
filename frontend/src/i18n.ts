import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locals/en/translation.json";
import tr from "../public/locals/tr/translation.json";
import ar from "../public/locals/ar/translation.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      ar: { translation: ar },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;