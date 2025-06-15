"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { locales, defaultLocale } from "@/middleware"
import { setCookie } from "@/lib/cookies"

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isChangingLocale, setIsChangingLocale] = useState(false)

  // Function to switch locale
  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return

    setIsChangingLocale(true)

    // Set cookie for future requests
    setCookie("NEXT_LOCALE", newLocale, 365)

    // Get the path without the locale prefix
    let newPath = pathname

    // Remove current locale from path if it exists
    locales.forEach((locale) => {
      if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
        newPath = pathname.replace(`/${locale}`, "")
      }
    })

    // If path is empty, set it to /
    if (newPath === "") newPath = "/"

    // For default locale, use path without prefix
    // For other locales, add the locale prefix
    const targetPath = newLocale === defaultLocale ? newPath : `/${newLocale}${newPath}`

    // Use window.location for a full page refresh to avoid React state issues
    window.location.href = targetPath
  }

  return (
    <div className="flex gap-1">
      {locales.map((locale) => (
        <Button
          key={locale}
          variant={locale === currentLocale ? "default" : "ghost"}
          size="sm"
          className={locale === currentLocale ? "bg-primary text-primary-foreground" : ""}
          onClick={() => switchLocale(locale)}
          disabled={isPending || isChangingLocale}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
