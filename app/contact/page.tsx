import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { ContactDetails } from '@/components/contact-details'
import { PageHero } from '@/components/page-hero'
import { business, images, pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  '/contact',
  'Contact Us',
  `Contact Krystal Clean Pressure Washing by phone at ${business.phoneDisplay} or email for residential and commercial pressure washing pricing, or book an appointment online.`,
)

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Krystal Clean"
        intro="Call or email to ask a question or request pricing. Tell us about your property and the cleaning you need, and we'll help with the right next step."
        image={images.contact}
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 className="h3">Contact details</h2>
            <ContactDetails />
            <p className="muted small">
              When you email, it helps to include the property address, whether it is residential or commercial, and the
              services you&apos;re interested in.
            </p>
          </div>
          <aside className="booking-card">
            <CalendarDays size={28} aria-hidden="true" />
            <h2 className="h3">Prefer to schedule?</h2>
            <p>Choose an available appointment time online. Appointments are subject to availability.</p>
            <Link href="/booking" className="button button-yellow">
              Book an Appointment <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
