import { Mail, Phone } from 'lucide-react'
import Script from 'next/script'
import { PageHero } from '@/components/page-hero'
import { appointmentMailHref, business, images, pageMeta, telHref } from '@/lib/site'

export const metadata = pageMeta(
  '/booking',
  'Book an Appointment',
  'Schedule residential or commercial pressure washing with Squeak N Clean LLC. Request your appointment online.',
)

const FORM_ID = 'iGpIUu6NZ82cRj2LO74Y'

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book an appointment"
        intro="Appointments are subject to availability. Squeak N Clean may contact you if additional information about your property or service is needed."
        image={images.booking}
      />
      <section className="section booking">
        <div className="container booking-layout">
          <div className="booking-form-card" data-reveal="fade-up">
            <header className="booking-form-head">
              <p className="eyebrow">Online booking</p>
              <h2 className="h3">Request your appointment</h2>
              <p>Tell us about your property and the service you need. It takes about two minutes.</p>
            </header>
          <div className="booking-frame-wrap" data-loading-label="Loading booking form…">
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
              id={`inline-${FORM_ID}`}
              title={`Book an appointment with ${business.name}`}
              className="booking-frame"
              style={{ height: 1106 }}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form 1"
              data-height="1106"
              data-layout-iframe-id={`inline-${FORM_ID}`}
              data-form-id={FORM_ID}
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
            />
          </div>
          </div>
          <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          <aside className="booking-side on-dark" data-reveal="fade-up">
            <p className="eyebrow">What happens next</p>
            <ol className="booking-steps">
              <li><strong>Submit the form</strong><span>Share your address, service and preferred time.</span></li>
              <li><strong>We review your request</strong><span>We check availability and any property details.</span></li>
              <li><strong>Confirm your time</strong><span>We contact you to lock in your appointment.</span></li>
            </ol>
            <div className="booking-contact">
              <p>Prefer to talk to someone?</p>
              <a href={telHref} className="button button-yellow"><Phone size={17} aria-hidden="true" /> Call {business.phoneDisplay}</a>
              <a href={appointmentMailHref} className="text-link"><Mail size={16} aria-hidden="true" /> Email an appointment request</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
