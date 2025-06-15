"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ThemeLogoProps {
  className?: string
}

export default function ThemeLogo({ className = "h-10 w-10" }: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR
    return <div className={className} />
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const logoSrc = currentTheme === "dark" ? "/logo-hexaflow-dark.svg" : "/logo-hexaflow-light.svg"

  return (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="HexaFlow Logo"
      width={40}
      height={40}
      className={className}
      priority
    />
  )
}
