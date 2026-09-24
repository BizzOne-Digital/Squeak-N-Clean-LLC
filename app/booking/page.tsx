import { ExternalLink, Mail, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { appointmentMailHref, business, details, images, pageMeta, telHref } from '@/lib/site'

export const metadata = pageMeta(
  '/booking',
  'Book an Appointment',
  'Schedule residential or commercial pressure washing with Squeak N Clean LLC. Choose an available appointment time online.',
)

export default function BookingPage() {
  const url = details.bookingUrl
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book an appointment"
        intro="Appointments are subject to availability. Squeak N Clean may contact you if additional information about your property or service is needed."
        image={images.booking}
      />
      <section className="section booking">
        <div className="container">
          {url ? (
            <>
              {/* The external provider (set via NEXT_PUBLIC_BOOKING_URL) owns availability and scheduling. */}
              <div className="booking-frame-wrap" data-reveal="fade-up" data-loading-label="Loading available times…">
                <iframe
                  src={url}
                  title={`Schedule an appointment with ${business.name}`}
                  className="booking-frame"
                  allow="payment"
                />
              </div>
              <p className="booking-help">
                Calendar not loading?{' '}
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-link">
                  Open the scheduler in a new tab <ExternalLink size={15} aria-hidden="true" />
                </a>{' '}
                or call <a href={telHref} className="text-link">{business.phoneDisplay}</a>.
              </p>
            </>
          ) : (
            <div className="booking-card booking-fallback" data-reveal="fade-up">
              <h2 className="h3">Online scheduling is being set up</h2>
              <p>
                Our online booking calendar will be available here soon. In the meantime, call or email to request an
                appointment and we&apos;ll confirm an available time with you.
              </p>
              <div className="cta-actions">
                <a href={telHref} className="button button-yellow"><Phone size={17} aria-hidden="true" /> Call {business.phoneDisplay}</a>
                <a href={appointmentMailHref} className="button button-blue"><Mail size={17} aria-hidden="true" /> Email an appointment request</a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
