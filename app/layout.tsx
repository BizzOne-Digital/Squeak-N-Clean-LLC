import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SplashScreen } from '@/components/splash-screen'
import { business, jsonLd, localBusinessJsonLd, siteUrl, telHref } from '@/lib/site'
import './globals.css'

const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const heading = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: business.name, template: `%s | ${business.name}` },
  description: business.positioning,
  applicationName: business.name,
}

export const viewport: Viewport = {
  themeColor: '#0B4F9C',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the splash script sets data-splash on <html> before hydration.
    <html lang="en" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{'.site-header{background-color:rgb(0 0 0 / 0.72)}'}</style>
        </noscript>
        <SplashScreen />
        <a href="#main" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <div className="mobile-cta">
          <a href={telHref}><Phone size={16} aria-hidden="true" /> Call now</a>
          <Link href="/booking">Book an Appointment</Link>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd())} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
