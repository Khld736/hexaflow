import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define supported locales
export const locales = ["en", "fr"]
export const defaultLocale = "en"

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // Check for cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Then check accept-language header
  const acceptLanguage = request.headers.get("accept-language")?.split(",")[0].split("-")[0]
  if (acceptLanguage && locales.includes(acceptLanguage)) {
    return acceptLanguage
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for assets, API routes, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // If the pathname already has a locale, no need to redirect
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Get the preferred locale
  const locale = getLocale(request)

  // For default locale, don't add prefix
  if (locale === defaultLocale) {
    return NextResponse.next()
  }

  // For other locales, add the locale prefix
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)

  // Copy all search params
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}
