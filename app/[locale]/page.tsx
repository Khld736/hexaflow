import { getDictionary } from "@/lib/i18n"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import TeamSection from "@/components/team-section" // Added import
import ContactSection from "@/components/contact-section"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { locales } from "@/middleware"
import { notFound } from "next/navigation"

// This function tells Next.js which locales are available
// and helps it generate the correct routes during the build process.
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header dict={dict} locale={locale} />
      <main className="flex min-h-screen flex-col items-center justify-between scroll-smooth">
        <HeroSection dict={dict} />
        <ServicesSection dict={dict} id="services" />
        <AboutSection dict={dict} id="about" />
        <TeamSection dict={dict} id="team" /> {/* Added TeamSection */}
        <ContactSection dict={dict} id="contact" />
      </main>
      <Footer dict={dict} locale={locale} />
    </ThemeProvider>
  )
}
