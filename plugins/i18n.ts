import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import uz from "../locales/uz.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem("locale") || "en",
    messages: {
      en,
      ru,
      uz,
    },
  });
  vueApp.use(i18n);
});
