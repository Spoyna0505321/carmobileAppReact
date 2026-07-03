import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import tr from "./tr.json";

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

i18n
  .use(initReactI18next)
  .init({
    lng: deviceLanguage === "tr" ? "tr" : "en",
    fallbackLng: "en",

    resources: {
      tr: {
        translation: tr,
      },
      en: {
        translation: en,
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;