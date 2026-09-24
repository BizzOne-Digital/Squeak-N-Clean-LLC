import Link from 'next/link'
import { Logo } from './logo'
import { business, details, mailHref, nav, telHref } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="footer on-dark">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Residential and commercial exterior cleaning in {details.serviceArea}.</p>
        </div>
        <nav aria-label="Footer">
          <p className="footer-label">Explore</p>
          <ul className="footer-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-label">Get in touch</p>
          <ul className="footer-links">
            <li><a href={telHref}>{business.phoneDisplay}</a></li>
            <li><a href={mailHref}>{business.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}</span>
      </div>
    </footer>
  )
}
