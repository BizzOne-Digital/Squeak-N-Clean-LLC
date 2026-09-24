import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { ScrollDissolveReveal } from '@/components/ui/scroll-dissolve-reveal'
import { commercialServices, residentialServices, type Service } from '@/lib/services'
import { businessId, details, images, jsonLd, pageMeta, siteUrl } from '@/lib/site'

export const metadata = pageMeta(
  '/services',
  'Pressure Washing Services',
  'Residential and commercial pressure washing services: house washing, driveway and sidewalk cleaning, roof soft washing, storefront, parking lot, fleet, and dumpster pad cleaning. Contact us for pricing.',
)

const groups = [
  { id: 'residential', title: 'Residential services', intro: 'Exterior cleaning solutions for homeowners.', services: residentialServices, image: images.residential },
  { id: 'commercial', title: 'Commercial services', intro: 'Exterior cleaning for larger properties and recurring commercial locations.', services: commercialServices, image: images.commercial },
]

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Krystal Clean Pressure Washing services',
  url: `${siteUrl}/services`,
  itemListElement: groups.flatMap((g) => g.services.map((s) => ({ category: g.title, ...s }))).map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.description,
      category: s.category,
      provider: { '@id': businessId },
      areaServed: details.serviceArea,
    },
  })),
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="service-row">
      <div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <Link href="/booking" className="text-link">
        Book<span className="sr-only"> {service.name}</span> <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </li>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Residential & commercial pressure washing services"
        intro="Every property is different, so we don't publish fixed prices. Book an appointment or contact us to discuss your property and receive pricing."
        image={images.services}
      >
        <nav className="jump-links" aria-label="Service categories">
          <a href="#residential">Residential</a>
          <a href="#commercial">Commercial</a>
        </nav>
      </PageHero>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className={`section catalog catalog-${g.id}`} aria-labelledby={`${g.id}-heading`}>
          <div className="container catalog-grid">
            <div className="catalog-aside">
              <h2 id={`${g.id}-heading`}>{g.title}</h2>
              <p className="lead">{g.intro}</p>
              <div className="catalog-image">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(max-width: 850px) 100vw, 40vw" />
              </div>
              <Link href="/booking" className="button button-blue">Request pricing <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <ul className="service-list">
              {g.services.map((s) => <ServiceRow key={s.name} service={s} />)}
            </ul>
          </div>
        </section>
      ))}

      <section className="section transformation" aria-labelledby="transformation-heading">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Before &amp; after</p>
              <h2 id="transformation-heading">See the difference a <em>professional clean makes.</em></h2>
            </div>
            <p>
              Keep scrolling to watch a stained patio, steps, and brick wall turn clean. Dirt, algae, and buildup like this
              are exactly what pressure washing removes. <span className="small">Illustrative example, not a specific customer project.</span>
            </p>
          </div>
          <ScrollDissolveReveal
            imageFront="/patio-before.webp"
            imageBack="/patio-after.webp"
            label="Before and after pressure washing: a stained, algae-covered patio and steps becomes clean and bright."
          />
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" text="Tell us about your property and we'll help you choose the right service and provide pricing." secondary={{ href: '/contact', label: 'Contact us' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicesJsonLd)} />
    </>
  )
}
