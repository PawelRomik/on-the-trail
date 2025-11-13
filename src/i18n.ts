import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import localeEN from "./data/locales/en.json";
import localePL from "./data/locales/pl.json";

const resources = {
	en: {
		translation: localeEN
	},
	pl: {
		translation: localePL
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem("userLocale") || "en",
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
