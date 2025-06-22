import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { locales, defaultLocale } from "@/middleware"
import { notFound } from "next/navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const currentLocale = params.locale; // Explicitly read the param

  // The middleware prevents invalid locales, but this is a safeguard.
  // It also ensures the default locale is not handled here, preventing duplicate pages.
  if (!locales.includes(currentLocale) || currentLocale === defaultLocale) {
    notFound()
  }

  return (
    <html
      lang={currentLocale}
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
