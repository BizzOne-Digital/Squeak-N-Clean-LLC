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
        <div className="container">
          <div className="booking-frame-wrap" data-reveal="fade-up" data-loading-label="Loading booking form…">
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
              id={`inline-${FORM_ID}`}
              title={`Book an appointment with ${business.name}`}
              className="booking-frame"
              style={{ height: 955 }}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form 1"
              data-height="955"
              data-layout-iframe-id={`inline-${FORM_ID}`}
              data-form-id={FORM_ID}
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
            />
          </div>
          <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          <p className="booking-help">
            Form not loading? Call <a href={telHref} className="text-link">{business.phoneDisplay}</a> or{' '}
            <a href={appointmentMailHref} className="text-link">email an appointment request</a>.
          </p>
        </div>
      </section>
    </>
  )
}
