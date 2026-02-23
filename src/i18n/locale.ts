import { Languages } from "../data/languages";

export function getLanguage(locale: string) {
  return Languages.find((lang) => lang.code === locale);
}

export function getFlag(locale: string) {
  return getLanguage(locale)?.flag;
}

export function getLanguageName(locale: string) {
  return getLanguage(locale)?.language;
}
