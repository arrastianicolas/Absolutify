import { createContext, useContext, useState } from "react";

export const TraductionDictionaryContext = createContext();

export const TraductionDictionaryProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const traduction = {
    es: {},
    en: {},
  };

  const t = (key) => traduction[language][key] || key;

  return (
    <TraductionDictionaryContext.Provider value={{ t, setLanguage }}>
      {children}
    </TraductionDictionaryContext.Provider>
  );
};

export const useTraduction = () => useContext(TraductionDictionaryContext);
