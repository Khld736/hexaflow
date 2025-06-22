import { getDictionary } from "@/lib/i18n"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import TeamSection from "@/components/team-section" // Import the new section
import ContactSection from "@/components/contact-section"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

// This is the root page that will handle the default locale (en)
export default async function RootPage() {
  // Use the default locale (en)
  const locale = "en"
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
        <TeamSection dict={dict} id="team" /> {/* Add the new section here */}
        <ContactSection dict={dict} id="contact" />
      </main>
      <Footer dict={dict} locale={locale} />
    </ThemeProvider>
  )
}
