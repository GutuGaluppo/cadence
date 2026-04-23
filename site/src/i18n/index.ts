import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ptBR from "./locales/pt-BR.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "pt-BR": { translation: ptBR },
      es: { translation: es },
      it: { translation: it },
      de: { translation: de },
      ja: { translation: ja },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "pt-BR", "es", "it", "de", "ja"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "cadence-lang",
    },
  });

export default i18next;
