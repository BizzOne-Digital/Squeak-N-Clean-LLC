import type { Metadata } from 'next'

// Confirmed business facts (PRD). Do not add details here unless the client supplies them.
export const business = {
  name: 'Krystal Clean Pressure Washing',
  shortName: 'Krystal Clean',
  phone: '2816915874',
  phoneDisplay: '(281) 691-5874',
  phoneE164: '+12816915874',
  email: 'michaeljwilliams434@gmail.com',
  positioning:
    'Krystal Clean Pressure Washing is a residential and commercial exterior cleaning company committed to delivering high-quality, reliable, and affordable pressure washing services.',
  mission:
    'Our mission is to enhance the appearance and value of our customers’ properties through exceptional workmanship and customer service.',
  vision:
    'Our vision is to become one of the leading pressure washing companies in Texas by building long-term customer relationships, investing in professional equipment, and expanding into multiple service markets.',
  // Company history paragraphs for /about. Leave empty until the client provides them.
  story: [] as string[],
}

const env = (value: string | undefined) => value?.trim() || undefined

function httpsUrl(value: string | undefined) {
  try {
    return value && new URL(value).protocol === 'https:' ? value : undefined
  } catch {
    return undefined
  }
}

// Optional client details. Empty values are simply not rendered.
export const details = {
  address: env(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS),
  hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  // The PRD only confirms "Texas"; a more specific area replaces it once supplied.
  serviceArea: env(process.env.NEXT_PUBLIC_SERVICE_AREA) ?? 'Texas',
  bookingUrl: httpsUrl(env(process.env.NEXT_PUBLIC_BOOKING_URL)),
}

export const siteUrl = (
  env(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
).replace(/\/$/, '')

export const telHref = `tel:${business.phone}`
export const mailHref = `mailto:${business.email}`
export const appointmentMailHref = `${mailHref}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(
  'Name:\nProperty address:\nResidential or commercial:\nService(s) needed:\nPreferred days/times:\n',
)}`

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Booking' },
]

// Page imagery is kept in one registry so each hero can use a distinct local asset.
export const images = {
  hero: { src: '/Gemini_Generated_Image_appy9aappy9aappy.jfif', alt: 'Exterior cleaning service for a residential property' },
  about: { src: '/Gemini_Generated_Image_bwqyubwqyubwqyub.jfif', alt: 'Clean and well-maintained property exterior' },
  services: { src: '/Gemini_Generated_Image_kcyda4kcyda4kcyd.jfif', alt: 'Professional pressure washing service' },
  contact: { src: '/Gemini_Generated_Image_rpou0rrpou0rrpou.jfif', alt: 'Property exterior ready for professional cleaning' },
  booking: { src: '/hero.webp', alt: 'Worker pressure washing a concrete driveway in front of a single-story home' },
  cta: { src: '/Gemini_Generated_Image_sle08nsle08nsle0.jfif', alt: '' }, // decorative background
  notFound: { src: '/og.jpg', alt: 'Krystal Clean Pressure Washing' },
  residential: {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Modern two-story home exterior with a front lawn',
  },
  commercial: {
    src: '/Gemini_Generated_Image_wjtljhwjtljhwjtl.jfif',
    alt: 'Commercial property prepared for professional exterior cleaning',
  },
}

export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: business.name,
      locale: 'en_US',
      url: path,
      title,
      description,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: images.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  }
}

export const businessId = `${siteUrl}/#business`

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: business.name,
    description: business.positioning,
    url: siteUrl,
    telephone: business.phoneE164,
    email: business.email,
    image: `${siteUrl}/og.jpg`,
    ...(details.address && { address: details.address }),
    areaServed: details.serviceArea,
  }
}

// Serialise JSON-LD safely for a <script> tag.
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })
