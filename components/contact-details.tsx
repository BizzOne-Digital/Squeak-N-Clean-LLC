import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { business, details, mailHref, telHref } from '@/lib/site'

// Address and hours only render once configured (NEXT_PUBLIC_BUSINESS_ADDRESS / _HOURS).
export function ContactDetails() {
  return (
    <dl className="contact-list">
      <div>
        <dt><Phone size={18} aria-hidden="true" /> Phone</dt>
        <dd><a href={telHref}>{business.phoneDisplay}</a></dd>
      </div>
      <div>
        <dt><Mail size={18} aria-hidden="true" /> Email</dt>
        <dd><a href={mailHref}>{business.email}</a></dd>
      </div>
      {details.address && (
        <div>
          <dt><MapPin size={18} aria-hidden="true" /> Address</dt>
          <dd>{details.address}</dd>
        </div>
      )}
      {details.hours && (
        <div>
          <dt><Clock size={18} aria-hidden="true" /> Hours</dt>
          <dd>{details.hours}</dd>
        </div>
      )}
      <div>
        <dt><MapPin size={18} aria-hidden="true" /> Service area</dt>
        <dd>{details.serviceArea}</dd>
      </div>
    </dl>
  )
}
