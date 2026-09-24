import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { business, images, telHref } from '@/lib/site'

type Props = {
  title?: string
  text?: string
  secondary?: { href: string; label: string }
}

export function CtaBand({
  title = 'Ready for a cleaner property?',
  text = 'Book an available appointment online, or call to talk through your property and get pricing for the work you need.',
  secondary,
}: Props) {
  return (
    <section className="cta-band on-dark">
      <Image src={images.cta.src} alt={images.cta.alt} fill sizes="100vw" className="cta-image" />
      <div className="container cta-grid">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link href="/booking" className="button button-yellow">
            Book an Appointment <ArrowRight size={17} aria-hidden="true" />
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="button button-outline">{secondary.label}</Link>
          ) : (
            <a href={telHref} className="button button-outline">
              <Phone size={17} aria-hidden="true" /> Call {business.phoneDisplay}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
