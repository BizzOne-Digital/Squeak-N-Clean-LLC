import Image from 'next/image'
import { business } from '@/lib/site'

// Client logo (background removed, resized from public/logo/squeaklogo.png).
// Size is set per placement in CSS: header, footer, splash.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <Image src="/logo/squeaklogo.webp" alt={business.name} width={320} height={307} priority />
    </span>
  )
}
