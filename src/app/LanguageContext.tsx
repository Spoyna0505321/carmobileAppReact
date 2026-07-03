import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../locales/i18n";

type Language = "tr" | "en";

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export const LanguageProvider = ({ children }: any) => {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await SecureStore.getItemAsync("language");

    if (saved === "tr" || saved === "en") {
      setLanguage(saved);
      i18n.changeLanguage(saved);
    }
  };

  const changeLanguage = async (lang: Language) => {
    await SecureStore.setItemAsync("language", lang);

    setLanguage(lang);

    await i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);