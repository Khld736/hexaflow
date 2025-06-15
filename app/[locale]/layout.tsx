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
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  // If it's the default locale, it should be handled by the root layout
  if (locale === defaultLocale) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>{children}</body>
    </html>
  )
}
