import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { images } from '@/lib/site'

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Page not found" intro="The page you're looking for doesn't exist or has moved." image={images.notFound}>
      <div className="hero-actions">
        <Link href="/" className="button button-yellow">Back to home</Link>
        <Link href="/booking" className="button button-outline">Book an Appointment</Link>
      </div>
    </PageHero>
  )
}
