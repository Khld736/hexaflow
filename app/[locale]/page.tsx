import { getDictionary } from "@/lib/i18n"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { locales, defaultLocale } from "@/middleware"
import { notFound } from "next/navigation"

export default async function LocalePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  // If it's the default locale, it should be handled by the root page
  if (locale === defaultLocale) {
    notFound()
  }

  const dict = await getDictionary(locale)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Header dict={dict} locale={locale} />
      <main className="flex min-h-screen flex-col items-center justify-between scroll-smooth">
        <HeroSection dict={dict} />
        <ServicesSection dict={dict} id="services" />
        <AboutSection dict={dict} id="about" />
        <ContactSection dict={dict} id="contact" />
      </main>
      <Footer dict={dict} locale={locale} />
    </ThemeProvider>
  )
}
