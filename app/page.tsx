import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { BeforeAfter } from '@/components/before-after'
import { CtaBand } from '@/components/cta-band'
import { audiences, commercialServices, residentialServices } from '@/lib/services'
import { business, comparisons, images, pageMeta, telHref } from '@/lib/site'

const homeTitle = 'Krystal Clean Pressure Washing | Residential & Commercial Pressure Washing in Texas'

// Root page shares the layout segment, so the title template doesn't apply — use an absolute title.
export const metadata = pageMeta(
  '/',
  homeTitle,
  'Krystal Clean Pressure Washing provides residential and commercial exterior cleaning in Texas — house washing, driveway cleaning, roof soft washing, storefront and parking lot cleaning. Book an appointment online.',
)

const values = [
  ['Quality workmanship', 'Careful, thorough exterior cleaning that respects your property.'],
  ['Reliable service', 'Clear communication from first contact to the final rinse.'],
  ['Affordable pricing', 'Pricing based on your property and the work it actually needs.'],
  ['Professional equipment', 'The right tools for residential and commercial surfaces.'],
  ['Customer service', 'A service relationship built around your priorities.'],
]

const steps: { title: string; text: string; actions?: { href: string; label: string }[] }[] = [
  {
    title: 'Choose your service',
    text: 'Find the residential or commercial service that fits your property. Not sure which one? Just ask.',
    actions: [{ href: '/services', label: 'Browse services' }],
  },
  {
    title: 'Pick an available time',
    text: 'Book online through the scheduling calendar, or call and we’ll find a time that works.',
    actions: [
      { href: '/booking', label: 'Book online' },
      { href: telHref, label: `Call ${business.phoneDisplay}` },
    ],
  },
  {
    title: 'We handle the cleaning',
    text: 'Krystal Clean completes the requested exterior cleaning, leaving your property clean and presentable.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="hero on-dark">
        <Image src={images.hero.src} alt={images.hero.alt} fill preload sizes="100vw" className="hero-image" />
        <div className="container hero-content">
          <p className="eyebrow">Residential &amp; commercial pressure washing</p>
          <h1>
            A cleaner property.{' '}
            <em className="hero-reveal">A better first impression.</em>
          </h1>
          <p className="hero-copy">
            {business.shortName} delivers high-quality, reliable, and affordable exterior cleaning for Texas homes and businesses.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="button button-yellow">
              Book an Appointment <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href={telHref} className="button button-outline">
              <Phone size={17} aria-hidden="true" /> Call {business.phoneDisplay}
            </a>
          </div>
          <ul className="hero-trust">
            <li><Check size={15} aria-hidden="true" /> Residential &amp; commercial</li>
            <li><Check size={15} aria-hidden="true" /> Professional equipment</li>
            <li><Check size={15} aria-hidden="true" /> Pricing quoted per property</li>
          </ul>
        </div>
      </section>

      <section className="section intro">
        <div className="container intro-grid">
          <h2 data-reveal="fade-up">More than clean. <em>Clearly cared for.</em></h2>
          <div data-reveal="stagger">
            <p className="lead">{business.positioning}</p>
            <p className="muted">{business.mission}</p>
            <Link href="/about" className="text-link">About Krystal Clean <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section categories" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-heading" data-reveal="stagger">
            <h2 id="services-heading">Services for every kind of property</h2>
            <p>From a single home to multi-site commercial properties. Pricing is quoted per property — no fixed public rates.</p>
          </div>
          <div className="category-grid" data-reveal="stagger">
            {[
              { id: 'residential', label: 'For homeowners', title: 'Residential services', text: 'Exterior cleaning that keeps homes, driveways, and outdoor living areas looking their best.', list: residentialServices, image: images.residential },
              { id: 'commercial', label: 'For businesses & communities', title: 'Commercial services', text: 'Keep buildings, storefronts, parking areas, and shared spaces ready for customers and residents.', list: commercialServices, image: images.commercial },
            ].map((c) => (
              <article className="category-card on-dark" key={c.id}>
                <Image src={c.image.src} alt="" fill sizes="(max-width: 850px) 100vw, 50vw" />
                <div className="category-content">
                  <p className="category-label">{c.label}</p>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <ul>{c.list.map((s) => <li key={s.name}><Check size={15} aria-hidden="true" /> {s.name}</li>)}</ul>
                  <Link href={`/services#${c.id}`} className="button button-yellow">
                    View {c.id} services <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compare-section" aria-labelledby="compare-heading">
        <div className="container compare-grid">
          <div className="compare-intro" data-reveal="stagger">
            <p className="eyebrow">Before &amp; after</p>
            <h2 id="compare-heading">See the <em>difference.</em></h2>
            <p className="lead muted">
              Dirt, algae, and staining build up slowly on driveways, patios, and exterior walls. Professional
              cleaning lifts them away and brings residential and commercial properties back to their best.
            </p>
            <p className="small muted">Illustrative examples, not specific customer projects.</p>
            <Link href="/booking" className="text-link">Book an appointment <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          {/* Section-level reveal only; the slider's own interaction is untouched. */}
          <div data-reveal="fade-scale">
            <BeforeAfter pairs={comparisons} />
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container values-grid">
          <div data-reveal="stagger">
            <p className="eyebrow">Why Krystal Clean</p>
            <h2>Professional work. <em>Personal care.</em></h2>
            <p className="lead muted">The same standards apply whether it&apos;s a single driveway or a multi-building commercial property.</p>
          </div>
          <ul className="value-list" data-reveal="stagger">
            {values.map(([title, text]) => (
              <li key={title}>
                <Check size={20} aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section serve">
        <div className="container serve-grid">
          <div data-reveal="stagger">
            <h2>Who we serve</h2>
            <p className="lead">We support the people responsible for keeping properties clean, welcoming, and well maintained.</p>
          </div>
          <ul className="serve-list" data-reveal="stagger">{audiences.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      </section>

      <section className="section process on-dark" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-heading" data-reveal="stagger">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="process-heading">Simple from start to <em>finish.</em></h2>
            </div>
            <p>Three steps from your first look to a cleaner property, with pricing based on your property and the work it needs.</p>
          </div>
          <ol className="process-grid" data-reveal="stagger">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="process-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.actions && (
                  <div className="process-actions">
                    {step.actions.map((a) =>
                      a.href.startsWith('tel:') ? (
                        <a key={a.href} href={a.href} className="text-link"><Phone size={15} aria-hidden="true" /> {a.label}</a>
                      ) : (
                        <Link key={a.href} href={a.href} className="text-link">{a.label} <ArrowRight size={15} aria-hidden="true" /></Link>
                      ),
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
