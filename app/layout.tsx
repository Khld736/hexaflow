import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
