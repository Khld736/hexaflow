import ThemeLogo from "@/components/theme-logo"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer({ dict, locale = "en" }: { dict: any; locale?: string }) {
  // Determine the correct prefix for links based on locale
  const localePrefix = locale === "en" ? "" : `/${locale}`

  return (
    <footer className="w-full border-t py-8 bg-muted/30">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href={`${localePrefix}/`} className="flex items-center gap-2">
            <ThemeLogo className="h-8 w-8" />
            <span className="font-mono font-bold">HexaFlow_</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.linkedin.com/company/hexa-flow/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">{dict.footer.copyright}</div>
      </div>
    </footer>
  )
}
