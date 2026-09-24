import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { business, images, pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  '/about',
  'About Us',
  'Squeak N Clean LLC is a residential and commercial exterior cleaning company in Texas committed to high-quality, reliable, and affordable pressure washing.',
)

// The three commitments named in the vision statement itself.
const visionPillars = [
  ['Long-term customer relationships', 'Earning repeat work from homeowners, businesses, and managed properties through dependable service.'],
  ['Professional equipment', 'Continuing to invest in the right tools for residential and commercial surfaces.'],
  ['Multiple service markets', 'Growing the range of residential and commercial exterior cleaning we offer across Texas.'],
]

const approach = [
  ['Quality', 'Thorough, careful work on every surface we clean.'],
  ['Reliability', 'Dependable scheduling and clear communication.'],
  ['Affordability', 'Pricing based on the property and the work it needs.'],
  ['Professional equipment', 'Investing in the right tools for residential and commercial jobs.'],
  ['Customer service', 'Long-term relationships built on doing the job right.'],
]

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Exterior cleaning for homes and businesses" intro={business.positioning} image={images.about} />

      <section className="section intro">
        <div className="container intro-grid">
          <h2 data-reveal="fade-up">Our mission</h2>
          <div data-reveal="stagger">
            <p className="lead">{business.mission}</p>
            <p className="muted">
              We serve both residential and commercial customers — from homeowners to property managers, HOAs, and businesses —
              focusing on improving the appearance and value of properties through dependable exterior cleaning.
            </p>
            <Link href="/services" className="text-link">Explore our services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="vision on-dark" aria-labelledby="vision-heading">
        <div className="container vision-grid">
          <figure className="vision-quote" data-reveal="stagger">
            <h2 id="vision-heading" className="eyebrow">Our vision</h2>
            <blockquote>
              <p>{business.vision}</p>
            </blockquote>
            <figcaption>{business.name}</figcaption>
          </figure>
          <div className="vision-pillars">
            <p className="vision-pillars-label" data-reveal="fade-up">Built on three commitments</p>
            <ol data-reveal="stagger">
              {visionPillars.map(([title, text], i) => (
                <li key={title}>
                  <span className="vision-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {business.story.length > 0 && (
        <section className="section intro">
          <div className="container intro-grid">
            <h2 data-reveal="fade-up">Our story</h2>
            <div data-reveal="stagger">{business.story.map((p) => <p key={p} className="muted">{p}</p>)}</div>
          </div>
        </section>
      )}

      <section className="section values">
        <div className="container values-grid">
          <div data-reveal="stagger">
            <h2>Our approach</h2>
            <p className="lead muted">What every residential and commercial customer can expect from Squeak N Clean.</p>
          </div>
          <ul className="value-list" data-reveal="stagger">
            {approach.map(([title, text]) => (
              <li key={title}>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Let's talk about your property" secondary={{ href: '/contact', label: 'Contact us' }} />
    </>
  )
}
