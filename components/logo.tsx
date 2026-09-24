import { Droplets } from 'lucide-react'

// Interim brand mark. When the client logo arrives, replace this component's
// contents with <Image src="/logo.svg" … /> and every usage (header, footer, splash) updates.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo-mark" aria-hidden="true">
        <Droplets size={22} fill="currentColor" />
      </span>
      <span className="logo-text">
        <strong>KRYSTAL</strong> <b>CLEAN</b>
        <small>PRESSURE WASHING</small>
      </span>
    </span>
  )
}
