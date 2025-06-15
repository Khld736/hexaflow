import "server-only"
import { locales, defaultLocale } from "@/middleware"

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  fr: () => import("@/messages/fr.json").then((module) => module.default),
}

export async function getDictionary(locale: string) {
  // Validate locale
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]()
  }

  return dictionaries[locale as keyof typeof dictionaries]()
}
